<p align="center">
  <img src="../capy-logo.png" alt="Capy Logo" width="300" />
</p>

# Capy Cookbook: Real-World Examples

This guide contains practical, real-world examples of using `capy` (both the CLI and the Go SDK) to extract data from popular websites.

---

## 1. Hacker News: Extracting Top Stories
Extract the top 5 articles from Hacker News, including their titles, links, and point scores.

### Using the CLI
Save the following as `hn.js`:
```javascript
const articles = document.querySelectorAll('.athing');
const results = [];

for (let i = 0; i < Math.min(articles.length, 5); i++) {
    const el = articles[i];
    
    // Get title and link
    const titleNode = el.querySelector('.titleline a');
    const title = titleNode ? titleNode.innerText : "No Title";
    const link = titleNode ? titleNode.getAttribute('href') : "";
    
    // Get score from the sibling row
    const subtextRow = el.nextElementSibling;
    const scoreNode = subtextRow ? subtextRow.querySelector('.score') : null;
    const score = scoreNode ? scoreNode.innerText : "0 points";

    results.push({ title, link, score });
}

console.log(JSON.stringify(results, null, 2));
```

Run it:
```bash
./capy -bootstrap-page-scripts=false -html https://news.ycombinator.com -file hn.js
```

### Using the Go SDK
```go
package main

import (
    "context"
    "fmt"
    "log"
    "github.com/Ketan6969/capy"
)

func main() {
    bl := capy.New(context.Background())
    defer bl.Close()

    if err := bl.LoadURL("https://news.ycombinator.com"); err != nil {
        log.Fatal(err)
    }

    doc := bl.Document()
    articles := doc.QuerySelectorAll(".athing")
    
    for i := 0; i < len(articles) && i < 5; i++ {
        el := articles[i]
        
        titleNode := el.QuerySelector(".titleline a")
        title := "No Title"
        if titleNode != nil {
            title = titleNode.GetInnerText()
        }
        
        fmt.Printf("- %s\n", title)
    }
}
```

---

## 2. Wikipedia: Extracting the Intro Paragraph
Wikipedia pages have a predictable structure. We can extract the first actual paragraph of the Go programming language article.

### Using the CLI (Inline Evaluation)
Since this is a simple extraction, we don't even need a `.js` file. We can pass the JS inline!

```bash
./capy -bootstrap-page-scripts=false -html "https://en.wikipedia.org/wiki/Go_(programming_language)" -eval "console.log(Array.from(document.querySelectorAll('#mw-content-text p')).find(p => p.innerText.trim().length > 0).innerText)"
```

### Using the Go SDK
```go
package main

import (
    "context"
    "fmt"
    "github.com/Ketan6969/capy"
)

func main() {
    bl := capy.New(context.Background())
    defer bl.Close()

    bl.LoadURL("https://en.wikipedia.org/wiki/Go_(programming_language)")
    
    bl.Evaluate(`
        const firstParagraph = Array.from(document.querySelectorAll('#mw-content-text p')).find(p => p.innerText.trim().length > 0);
        if (firstParagraph) {
            console.log("Intro:", firstParagraph.innerText);
        } else {
            console.error("Could not find intro paragraph.");
        }
    `)
}
```

---

## 3. GitHub: Extracting Repository Details
Extract the "About" description and the list of topics from a GitHub repository.

### Using the CLI
Save the following as `github.js`:
```javascript
const result = {};

// 1. Get the repository description
const aboutNode = document.querySelector('p[dir="auto"]');
result.description = aboutNode ? aboutNode.innerText.trim() : "No description found";

// 2. Get repository topics/tags
const topicTags = document.querySelectorAll('a.topic-tag');
result.topics = [];
for (let i = 0; i < topicTags.length; i++) {
    result.topics.push(topicTags[i].innerText.trim());
}

console.log(JSON.stringify(result, null, 2));
```

Run it:
```bash
./capy -bootstrap-page-scripts=false -html https://github.com/dop251/goja -file github.js
```

---

## 4. E-Commerce (Books to Scrape): Extracting Product Prices
*Books to Scrape* is a sandbox environment for testing scraping tools. We can extract the titles and prices of the books on the front page.

### Using the CLI
Save the following as `books.js`:
```javascript
const books = document.querySelectorAll('.product_pod');
const results = [];

for (let i = 0; i < books.length; i++) {
    const book = books[i];
    
    const titleNode = book.querySelector('h3 a');
    const title = titleNode ? titleNode.getAttribute('title') : "Unknown Book";
    
    const priceNode = book.querySelector('.price_color');
    const price = priceNode ? priceNode.innerText : "Unknown Price";
    
    results.push({ title, price });
}

console.log(JSON.stringify(results, null, 2));
```

Run it:
```bash
./capy -bootstrap-page-scripts=false -html https://books.toscrape.com/ -file books.js
```
