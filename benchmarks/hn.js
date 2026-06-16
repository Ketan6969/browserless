const stories = [];

for (const row of document.querySelectorAll(".athing")) {
    const link = row.querySelector(".titleline a");

    stories.push({
        title: link?.innerText,
        href: link?.href
    });
}

JSON.stringify(stories.slice(0, 10), null, 2);
