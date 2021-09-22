import { selectEl } from "./utils.js";
import { sendTask } from "./taskSender.js";
import { getProjId } from "./userHelpers.js";

let taskList = [];

let proj_id = await getProjId();
console.log(proj_id);

let mainForm = selectEl("#main-form");
let tasksCtn = selectEl("#main-form .tasks-ctn");
let selCounter = selectEl("#selCounter");

let addBtn = selectEl("#addTask");
addBtn.addEventListener("click", addTask);

let sendBtn = selectEl("#sendTasks");
sendBtn.addEventListener("click", sendTasks);

export function addTask() {
  let task = generateTask();

  taskList.push(task);
  tasksCtn.appendChild(task);
  console.log("task created", task);
}

function generateTask() {
  let el = document.createElement("template");

  let htmlString = `<fieldset class="task">
  <legend>
  Task
  </legend>
  <div>
  <button type="button">Delete</button>
  <label>
  Enviar?
  <input name="sendTask" type="checkbox">
  </label>
  </div>
  <div>
  
  <label>
      titulo
      <input required name="title" type="text">
  </label>
  <label>
      definition of done
      <textarea required name="dod"></textarea>
  </label>
  </div>
                    </fieldset>`;

  el.innerHTML = htmlString.trim();

  console.log(el.content);

  let task = el.content.firstChild;

  task
    .querySelector("button")
    .addEventListener("click", removeTask.bind(null, task));

  task
    .querySelector("input[type=checkbox]")
    .addEventListener("change", triggerCount);

  return task;
}

function triggerCount() {
  let selected = taskList.filter((x) => x.elements.sendTask.checked);

  //   console.log(selected);
  renderSel(selected.length);

  return selected;
}

function removeTask(task) {
  console.log("task removed", task);
  taskList.splice(taskList.indexOf(task), 1);
  tasksCtn.removeChild(task);
  triggerCount();
}

function renderSel(sel_length) {
  selCounter.innerHTML = `${sel_length}`;
}

function sendTasks() {
  let selected = triggerCount();

  if (selected.length) {
    selected.forEach(async (task_fieldset) => {
      let task = {
        title: task_fieldset.elements.title.value,
        description: task_fieldset.elements.dod.value,
      };

      console.log(task);
      //fix tratar melhor (notificar o usuário)
      //review Sem task Title, não disparar o request
      if (!task?.title) return;

      //todo tratar melhor (Promise.all())
      return await callRequest(task);
    });
  }
}

const callRequest = async (task) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  console.log(sendTask, this);

  let response = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: sendTask,
    args: [task, proj_id],
  });

  return response[0].result;
};
