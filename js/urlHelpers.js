async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const currentTab = await getCurrentTab();

let match = (url) => Boolean(url.match(/secure\/RapidBoard\.jspa/, "g"));

export const getProjKey = () =>
  new URL(currentTab.url).searchParams.get("projectKey");

export const checkUrl = () => {
  return match(currentTab.url);
};
