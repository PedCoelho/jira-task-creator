let form = document.forms["main-form"];
let file_input = form.file.addEventListener("change", readFile, false);

function readFile() {
  let reader = new FileReader();
}
