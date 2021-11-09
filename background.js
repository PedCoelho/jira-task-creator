let colors = {
  front_div: "pink",
  back_div: "lightblue",
  other_div: "lightgreen",
};
let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);

  chrome.storage.sync.set({ colors });
  console.log("Default colors set for front,back and others");
});
