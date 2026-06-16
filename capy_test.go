package capy

import (
	"context"
	"strings"
	"testing"
)

func TestCapy_LoadHTML(t *testing.T) {
	bl := New(context.Background())
	defer bl.Close()

	html := `<!DOCTYPE html><html><head><title>Test Title</title></head><body><div id="content">Hello World</div></body></html>`
	if err := bl.LoadHTML(html); err != nil {
		t.Fatalf("LoadHTML failed: %v", err)
	}

	err := bl.Evaluate(`
		if (document.querySelector('title').innerText !== "Test Title") {
			throw new Error("Invalid title");
		}
		if (document.getElementById("content").innerText !== "Hello World") {
			throw new Error("Invalid content");
		}
	`)
	if err != nil {
		t.Fatalf("Evaluate failed: %v", err)
	}
}

func TestCapy_EvaluateError(t *testing.T) {
	bl := New(context.Background())
	defer bl.Close()

	err := bl.Evaluate(`throw new Error("Intentional error");`)
	if err == nil {
		t.Fatal("Expected error, got nil")
	}
	if !strings.Contains(err.Error(), "Intentional error") {
		t.Fatalf("Expected error to contain 'Intentional error', got: %v", err)
	}
}

func TestCapy_ContextCancellation(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	bl := New(ctx)
	defer bl.Close()

	// Cancel the context before event loop finishes
	cancel()
	err := bl.Evaluate(`setTimeout(() => {}, 10000);`)
	if err == nil {
		t.Fatal("Expected context cancellation error, got nil")
	}
	if !strings.Contains(err.Error(), "context canceled") {
		t.Fatalf("Expected context canceled error, got: %v", err)
	}
}
