const div = document.createElement("div");
document.body.appendChild(div);
const rect = div.getBoundingClientRect();
console.log("Rect:", JSON.stringify(rect));
div.style.display = "none";
const rect2 = div.getBoundingClientRect();
console.log("Rect2:", JSON.stringify(rect2));
