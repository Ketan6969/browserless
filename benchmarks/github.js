JSON.stringify({
    title: document.title,
    links: document.querySelectorAll("a").length,
    buttons: document.querySelectorAll("button").length
}, null, 2);
