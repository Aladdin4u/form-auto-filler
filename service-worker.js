chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const localhost = "http://localhost/*";
const local = "http://*:*/*";
const file = "file:///";
