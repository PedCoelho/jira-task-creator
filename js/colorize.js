export function colorize(stored_colors, mode = "colorize", ...highlights) {
  let issues = [...document.querySelectorAll("[class*=issue-content]")];
  let test = document.querySelector("body");

  const buildLabels = (el, color, text) => {
    let div = document.createElement("div");
    let textEl = document.createElement("span");
    textEl.innerText = text.toUpperCase();
    div.appendChild(textEl);
    colorize(textEl, color);
    div.style.borderRadius = "4px";
    div.style.width = "max-content";
    div.style.padding = ".2rem .4rem";
    div.style.margin = ".2rem";
    div.style.marginLeft = "unset";
    el.prepend(div);
  };

  const colorize_bg = (el, color) => (el.parentNode.style.background = color);

  const textIncludes = (el, word) =>
    el.innerText.toUpperCase().includes(word.toUpperCase());

  const handleMatch = (el, color, category) => {
    if (mode == "labels") buildLabels(el, color, category);
    else colorize_bg(el, color);

    let projeto =
      el.closest(".ghx-swimlane").firstChild.textContent || undefined;
    let issue = el.querySelector(".ghx-key").innerText;
    let deadline = el.querySelector('[data-tooltip^="Data Ac"').textContent;
    let description = el.querySelector(".ghx-summary").innerText;

    return { [category]: { projeto, issue, deadline, description } };
  };

  console.log(issues, test, stored_colors);

  return issues.reduce((acc, x) => {
    console.log(acc);
    let data;

    if (textIncludes(x, "front"))
      data = handleMatch(x, stored_colors.front_div, "front");
    else if (textIncludes(x, "back"))
      data = handleMatch(x, stored_colors.back_div, "back");
    else data = handleMatch(x, stored_colors.other_div, "outros");

    let key = Object.keys(data)[0];

    acc[key] ? acc[key].push(data[key]) : (acc[key] = [data[key]]);

    return acc;
  }, {});
}
