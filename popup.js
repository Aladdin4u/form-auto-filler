async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
const tab = await getCurrentTab();
// Retrieve the action badge to check if the extension is 'ON' or 'OFF'
const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

const isChecked = prevState === "ON" ? true : false;

const checkboxInput = document.querySelector("input, checkbox");
checkboxInput.checked = isChecked;

checkboxInput.addEventListener("click", async () => {

  const tab = await getCurrentTab();
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === "ON" ? "OFF" : "ON";
  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  chrome.tabs.sendMessage(tab.id, {
    text: nextState,
  });

  if (checkboxInput.checked) {
    checkboxInput.checked = true;
  } else {
    console.log("unchecked");
    checkboxInput.checked = false;
  }
});
