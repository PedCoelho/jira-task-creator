export function colorize(stored_colors, mode = "", ...highlights) {
  const MODES = { LABELS_MODE: "LABELS_MODE" };

  let issues = [...document.querySelectorAll("[class*=issue-content]")];

  const buildLabels = (el, color, text) => {
    let div = document.createElement("div");
    let textEl = document.createElement("span");
    textEl.innerText = text.toUpperCase();
    div.appendChild(textEl);
    colorize_bg(textEl, color);
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

  const testWords = (el, words) => {
    return words.some((word) => textIncludes(el, word));
  };

  const handleMatch = (el, color, category) => {
    if (mode == MODES.LABELS_MODE) buildLabels(el, color, category);
    else colorize_bg(el, color);

    let projeto =
      el.closest(".ghx-swimlane")?.firstChild?.textContent || undefined;
    let issue = el.querySelector(".ghx-key")?.innerText;
    let deadline = el.querySelector('[data-tooltip^="Data Ac"')?.textContent;
    let description = el.querySelector(".ghx-summary")?.innerText;

    return { [category]: { projeto, issue, deadline, description } };
  };

  console.log(issues, stored_colors);

  return issues.reduce((acc, x) => {
    let words = ["front", "back"];

    words.forEach((word) => {
      let data = textIncludes(x, word)
        ? handleMatch(x, stored_colors[word + "_div"], word)
        : null;

      if (data) {
        let key = Object.keys(data)[0];
        acc[key] ? acc[key].push(data[key]) : (acc[key] = [data[key]]);
      }
    });

    if (!testWords(x, words)) {
      data = handleMatch(x, stored_colors.other_div, "outros");
      let key = Object.keys(data)[0];
      acc[key] ? acc[key].push(data[key]) : (acc[key] = [data[key]]);
    }

    return acc;
  }, {});
}
