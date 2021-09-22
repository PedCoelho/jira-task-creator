import { setUser } from "./js/userHelpers.js";
import { checkUrl, getProjKey } from "./js/urlHelpers.js";
import { selectEl } from "./js/utils.js";

let userEl = selectEl("#username");
let disclaimer = selectEl("#bad-page");
let mainForm = selectEl("#main-form");

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

//todo move to form builder???
let projectKey = getProjKey();
selectEl("input[name=projectKey]").value = projectKey;
console.log(projectKey);
