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
