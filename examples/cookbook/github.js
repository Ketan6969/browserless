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
