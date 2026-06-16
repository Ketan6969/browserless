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
