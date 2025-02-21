const popupBTN = document.getElementById("new-item-btn");
const items = new Map();
let usrInput = "";


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
	if (e.target.classList.contains("item-button-right") && items.get(parentHTML) < 4) {
		items.set(parentHTML, items.get(parentHTML) + 1);
		drawItems();
	}
	if (e.target.classList.contains("item-button-left") && items.get(parentHTML) > 0) {
		items.set(parentHTML, items.get(parentHTML) - 1);
		drawItems();
	}
});

function createItem() {
	const itemContainer = document.createElement("div");
	const item = document.createElement("p");
	const itemForwardBTN = document.createElement("input");
	const itemBackBTN = document.createElement("input");

	itemContainer.className = "item-container";
	item.className = "item";
	itemForwardBTN.className = "item-button-right";
	itemForwardBTN.type = "image";
	itemForwardBTN.src = "./res/right-arrow.svg";
	itemBackBTN.className = "item-button-left";
	itemBackBTN.type = "image";
	itemBackBTN.src = "./res/left-arrow.svg";

	item.innerHTML = usrInput + "<br/>" + new Date().toDateString();

	itemContainer.append(item, itemBackBTN, itemForwardBTN);
	items.set(itemContainer.innerHTML, 0);
	console.log(itemContainer.innerHTML);

}

function drawItems() {
	for (i = 1; i <= 5; i++) {
		document.getElementById(i).replaceChildren(document.getElementById(i).firstElementChild);
	}
	for (const key of items.keys()) {
		const itemContainer = document.createElement("div");
		itemContainer.innerHTML = key;
		itemContainer.className = "item-container";
		document.getElementById("container").children[items.get(key)].append(itemContainer);
	}
}

