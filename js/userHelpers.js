export const setUser = (userEl) => {
  getUser().then((arr) => {
    console.log(arr);
    let user = arr[0].result;
    if (user) {
      userEl.children[0].innerText = user;
    } else
      userEl.innerHTML =
        "JIRA User not found.<br>The extension might not work as expected.";
  });
};

const getJiraUser = () => {
  let user = document.querySelector(`meta[name*=fullname`)?.content;
  if (user.length) return user;
};

const getUser = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  let user = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getJiraUser,
  });

  return user;
};
