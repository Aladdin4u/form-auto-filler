async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const ulElement = document.querySelector("ul");
const template = document.getElementById("li_template");

const tab = await getCurrentTab();
const getLocalStorage = await chrome.storage.local.get();

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
    checkboxInput.checked = false;
  }
});

const generateRuleButton = document.getElementById("generate-rule");
generateRuleButton.addEventListener("click", () => {
  const name = prompt("enter profile name:");
  const newProfile = chrome.tabs.sendMessage(tab.id, {
    tabId: tab.id,
    text: "New Rule",
    name: name,
  });
  newProfile.then((data) => {
    const element = templateElement(data.key);
    ulElement.appendChild(element);
  });
});

function getAllRules() {
  const elements = new Set();
  for (const key in getLocalStorage) {
    const element = templateElement(key);
    elements.add(element);
  }
  ulElement.append(...elements);
}

function templateElement(key) {
  const element = template.content.firstElementChild.cloneNode(true);
  element.querySelector(".title").textContent = key;
  element.querySelector(".edit").id = key;
  element.querySelector(".delete").id = key;
  return element;
}

getAllRules();

const title = document.querySelectorAll(".title");
const editRule = document.querySelectorAll(".edit");
const deleteRule = document.querySelectorAll(".delete");

deleteRule.forEach((element) => {
  element.addEventListener("click", async () => {
    const parentElement = element.closest("li");
    await chrome.storage.local.remove(element.id);
    ulElement.removeChild(parentElement);
  });
});
