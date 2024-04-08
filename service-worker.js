chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const localhost = "http://localhost/*";
const local = "http://*:*/*";
const file = "file:///";
chrome.action.onClicked.addListener(async (tab) => {
  console.log(tab.url);
  if (tab.url.match(localhost) || tab.url.match(local) || tab.url.match(file)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // Set the action badge to the next state
    const data = await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    chrome.tabs.sendMessage(tab.id, {
      text: nextState,
    });
  }
});
