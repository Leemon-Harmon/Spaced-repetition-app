const popupBTN = document.getElementById("new-item-btn");
const storedItems = window.localStorage;
let usrInput = "";
let items;

if (window.localStorage.length === 0) {
	items = new Map();
} else {
	items = new Map(JSON.parse(localStorage.items));
}

drawItems();

popupBTN.addEventListener("click", function() {
	const inputBox = document.createElement("div");
	inputBox.contentEditable = true;
	inputBox.className = "input-box";
	document.body.prepend(inputBox);
	inputBox.focus();

	inputBox.addEventListener("keyup", function(event) {
		if (event.key === "Escape") {
			inputBox.remove();
		}
		if (event.key === "Enter") {
			usrInput = inputBox.textContent;
			createItem();
			drawItems();
			inputBox.remove();
		}
	});
});

document.getElementById("container").addEventListener("click", function(e) {
	const parentHTML = e.target.parentElement.innerHTML;
	const grandparentHTML = e.target.parentElement.parentElement.innerHTML;
	if (e.target.classList.contains("item-close-button")) {
		items.delete(parentHTML);
		drawItems();
	}
	if (e.target.classList.contains("item-button-right") && items.get(grandparentHTML) < 4) {
		items.set(grandparentHTML, items.get(grandparentHTML) + 1);
		drawItems();
	}
	if (e.target.classList.contains("item-button-left") && items.get(grandparentHTML) > 0) {
		items.set(grandparentHTML, items.get(grandparentHTML) - 1);
		drawItems();
	}
});

function createItem() {
	const itemContainer = document.createElement("div");
	const buttonContainer = document.createElement("div");
	const item = document.createElement("p");
	const closeBTN = document.createElement("input");
	const itemForwardBTN = document.createElement("input");
	const itemBackBTN = document.createElement("input");

	itemContainer.className = "item-container";
	buttonContainer.className = "button-container";
	item.className = "item";
	closeBTN.className = "item-close-button";
	closeBTN.type = "image";
	closeBTN.src = "./res/x.svg";
	itemForwardBTN.className = "item-button-right";
	itemForwardBTN.type = "image";
	itemForwardBTN.src = "./res/right-arrow.svg";
	itemBackBTN.className = "item-button-left";
	itemBackBTN.type = "image";
	itemBackBTN.src = "./res/left-arrow.svg";

	item.innerHTML = usrInput + "<br/>" + new Date().toDateString();

	buttonContainer.append(itemBackBTN, itemForwardBTN);
	itemContainer.append(closeBTN, item, buttonContainer);
	items.set(itemContainer.innerHTML, 0);
}

function drawItems() {
	for (i = 1; i <= 5; i++) {
		document.getElementById(i).replaceChildren(document.getElementById(i).firstElementChild);
	}

	localStorage.items = JSON.stringify(Array.from(items.entries()));

	for (const key of items.keys()) {
		const itemContainer = document.createElement("div");
		itemContainer.innerHTML = key;
		itemContainer.className = "item-container";
		document.getElementById("container").children[items.get(key)].append(itemContainer);
	}
}

