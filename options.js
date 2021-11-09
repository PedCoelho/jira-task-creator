let page_selectors = ["front_div", "back_div", "other_div"];
let selectedClassName = "current";
const presetButtonColors = ["pink", "lightblue", "lightgreen", "palegoldenrod"];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  let sel = event.target.dataset.sel;

  let currentColors;

  chrome.storage.sync.get("colors", (data) => {
    currentColors = data.colors;

    currentColors[sel] = color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({ colors: currentColors });
  });
}

// Add a button to the page for each supplied color
function constructOptions(sel, buttonColors) {
  let page = document.getElementById(sel);
  chrome.storage.sync.get("colors", (data) => {
    console.log(data.colors);
    let currentColor = data.colors[sel];
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.dataset.sel = sel;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}

// Initialize the page by constructing the color options

page_selectors.forEach((sel) => constructOptions(sel, presetButtonColors));
