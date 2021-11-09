import { setUser } from "./js/userHelpers.js";
import { checkUrl } from "./js/urlHelpers.js";
import { selectEl } from "./js/utils.js";
import { colorize } from "./js/colorize.js";

let userEl = selectEl("#username");
let disclaimer = selectEl("#bad-page");
let mainForm = selectEl("#main-form");
let triggerBtn = selectEl("button.important");

triggerBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.get("colors", (data) => {
    let colors = data.colors;
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: colorize,
        args: [colors],
      },
      (res) => {
        console.log("success", res);
      }
    );
  });
});

function hideDisclaimer() {
  disclaimer.classList.toggle("hidden");
  mainForm.classList.toggle("hidden");
}

function showForm() {
  setUser(userEl);
  hideDisclaimer();
}

/* -------------------------------------------------------------------------- */
/*                      stop execution if this step fails                     */
/* -------------------------------------------------------------------------- */
let url_check = checkUrl();
if (!url_check) {
  throw new Error("Wrong page address, or address couldn`t be verified");
}
/* -------------------------------------------------------------------------- */
/*                   else, get/set user and show file input                   */
/* -------------------------------------------------------------------------- */

showForm();
