# Browserless Runtime

`browserless` is an experimental, lightweight headless browser runtime written entirely in Go.

Unlike heavy Chromium-based alternatives (Playwright/Puppeteer), `browserless` executes JavaScript and manipulates a virtual DOM tree natively using the [Goja](https://github.com/dop251/goja) ECMAScript engine. This provides an extremely fast, zero-dependency, and memory-safe environment for server-side JavaScript evaluation and DOM extraction.

## Features
- **Headless ECMAScript Runtime**: Executes modern JavaScript (ES6+).
- **Virtual DOM Bridge**: Mocks browser DOM APIs (`document.getElementById`, `querySelector`, etc.) which map directly to high-performance native Go structures.
- **Asynchronous Event Loop**: Fully supports `setTimeout`, `Promises`, `fetch`, and Web `Worker` threads.

## CLI Usage

You can use the built-in CLI to test and audit scripts.

```bash
# Build the CLI
go build -o browserless ./cmd/browserless

# Audit a URL by fetching it and executing its initial scripts
./browserless audit https://example.com

# Run an external script against a URL
./browserless -file my_script.js -html https://example.com
```

### Logging
The CLI supports robust structured logging. To enable JSON output for production environments, use `-log-format=json`:
```bash
./browserless audit -log-format=json -debug https://example.com
```

## Go SDK Usage

You can embed `browserless` directly into your own Go applications to perform blazing-fast, concurrent DOM extraction without the overhead of Playwright or Puppeteer.

```go
import "github.com/browserless/runtime"

func main() {
    // Spin up an isolated VM
    bl := browserless.New(context.Background())
    defer bl.Close()

    // Fetch and parse URL
    bl.LoadURL("https://example.com")

    // Run custom JS extraction scripts
    bl.Evaluate(`
        const title = document.querySelector('title').innerText;
        console.log("Found title:", title);
    `)
}
```

Check out the `examples/` directory for more advanced patterns, including concurrent scraping!

## Architecture

For an in-depth dive into the internal design (DOM bindings, event loop, and network interceptors), see [ARCHITECTURE.md](./docs/ARCHITECTURE.md).
