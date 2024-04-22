const params = new URLSearchParams(document.location.search);
const key = params.get("key");

let storeData = [];
const tbody = document.getElementById("tbody");
const template = document.getElementById("table_template");
const saveProfile = document.querySelector("button, .save");
const addNewField = document.querySelector("button, .add");
const closeTab = document.querySelector("button, .cancel");

const datas = await chrome.storage.local.get(key);
storeData = datas[key];

function fetchAllData() {
  const elements = new Set();
  let i = 1;
  for (const data of storeData) {
    const element = template.content.firstElementChild.cloneNode(true);

    element.id = i;
    element.querySelector(".input-type").textContent = data.type;
    element.querySelector(".input-name").value = data.name;
    element.querySelector(".input-value").type = data.type;

    if (data.type === "checkbox" || data.type === "radio") {
      element.querySelector(".input-value").checked = data.checked;
    } else if (data.type === "image") {
      element.querySelector(".input-value").src = data.src;
    } else {
      element.querySelector(".input-value").value = data.value;
    }

    elements.add(element);
    i++;
  }

  tbody.append(...elements);
}

fetchAllData();

const inputName = document.querySelectorAll(".input-name");
const inputValue = document.querySelectorAll(".input-value");
const deleteInputField = document.querySelectorAll(".delete");

if (inputName) {
  inputName.forEach((element) => {
    element.addEventListener("click", () => {
      const parent = element.closest("tr");
      element.addEventListener("input", (e) => {
        console.log(e.target.value);
        let currValue = storeData.find((data, index) => index + 1 == parent.id);
        currValue.name = e.target.value;
      });
    });
  });
}

if (inputValue) {
  inputValue.forEach((element) => {
    element.addEventListener("click", () => {
      const parent = element.closest("tr");
      element.addEventListener("input", (e) => {
        let currValue = storeData.find((data, index) => index + 1 == parent.id);
        if (element.type === "checkbox" || element.type === "radio") {
          currValue.checked = e.target.checked;
        } else {
          currValue.value = e.target.value;
        }
      });

      if (element.type === "image") {
        let imageSrc = prompt("Edit image url: ", element.src);
        let currValue = storeData.find((data, index) => index + 1 == parent.id);
        currValue.src = imageSrc;
        storeData[parent.id - 1] = currValue;
      }
    });
  });
}

if (deleteInputField) {
  deleteInputField.forEach((element) => {
    element.addEventListener("click", () => {
      const parent = element.closest("tr");
      storeData = storeData.filter((data, index) => index + 1 != parent.id);
      tbody.removeChild(parent);
    });
  });
}

if (saveProfile) {
  saveProfile.addEventListener("click", async () => {
    await chrome.storage.local.set({ [key]: storeData });
    alert("Profile successfully saved!");
  });
}
