import { getCurrentTab } from "../utils/index.js";

function templateElement(key) {
  const template = document.getElementById("li_template");
  const element = template.content.firstElementChild.cloneNode(true);
  let profileName = ("" + key).split(":")[0];
  element.querySelector(".title").textContent = profileName;
  element.querySelector(".title").id = key;
  element.querySelector(".edit").id = key;
  element.querySelector(".delete").id = key;
  return element;
}

function toggleElement(tab, prevState) {
  const isChecked = prevState === "ON" ? true : false;
  const checkboxInput = document.querySelector("input, checkbox");

  checkboxInput.checked = isChecked;

  checkboxInput.addEventListener("click", async () => {
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
}

function generateForm(tab, ulElement) {
  const generateFormButton = document.getElementById("generate-form");

  generateFormButton.addEventListener("click", async () => {
    const name = prompt("enter profile name:");
    if (name == null) {
      return;
    }

    const data = await chrome.tabs.sendMessage(tab.id, {
      tabId: tab.id,
      text: "NEWFORM",
      name: name,
    });
    const element = templateElement(data.key);
    ulElement.appendChild(element);
    refetch(tab, ulElement);
  });
}

function getAllForms(storeData, ulElement) {
  const elements = new Set();
  for (const key in storeData) {
    const element = templateElement(key);
    elements.add(element);
  }
  ulElement.append(...elements);
}

function refetch(tab, ulElement) {
  let profileForm = document.querySelectorAll(".title");
  let editForm = document.querySelectorAll(".edit");
  let deleteForm = document.querySelectorAll(".delete");

  profileForm.forEach((element) => {
    element.addEventListener("click", async () => {
      chrome.tabs.sendMessage(tab.id, {
        text: "SELECTFORM",
        key: element.id,
      });
    });
  });

  editForm.forEach((element) => {
    element.addEventListener("click", async () => {
      const data = await chrome.tabs.sendMessage(tab.id, {
        text: "EDITFORM",
      });

      // redirect to option.html to edit profile
      const newUrl = `chrome-extension://${data.url}/src/option.html?key=${element.id}`;
      chrome.tabs.create({ url: newUrl });
    });
  });

  deleteForm.forEach((element) => {
    element.addEventListener("click", async () => {
      const parentElement = element.closest("li");
      await chrome.storage.local.remove(element.id);
      ulElement.removeChild(parentElement);
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const tab = await getCurrentTab();

  const checkForm = await chrome.tabs.sendMessage(tab.id, {
    text: "CHECKFORM",
  });

  if (checkForm.form) {
    const ulElement = document.querySelector("ul");
    const storeData = await chrome.storage.local.get();
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

    toggleElement(tab, prevState);
    generateForm(tab, ulElement);
    getAllForms(storeData, ulElement);
    refetch(tab, ulElement);
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title">This is page does not contain form element.</div>';
  }
});
