const params = new URLSearchParams(document.location.search);
const key = params.get("key");

let storeData = [];
const exits = document.querySelectorAll(".close");
const tbody = document.getElementById("tbody");
const template = document.getElementById("table_template");
const fieldModal = document.getElementById("fieldModal");
const saveProfile = document.querySelector("button#save");
const addNewField = document.querySelector("button.add");
const saveField = document.getElementById("save-field");
const addType = document.getElementById("add-type");
const addName = document.getElementById("add-name");
const addValue = document.getElementById("add-value");
const closeTab = document.querySelector("button#cancel");

const datas = await chrome.storage.local.get(key);
storeData = datas[key];

function fetchAllData() {
  const elements = new Set();
  let i = 1;
  for (const data of storeData) {
    const element = generateTable(i, data);
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

if (closeTab) {
  closeTab.addEventListener("click", async () => {
    window.close();
  });
}

if (addNewField) {
  addNewField.addEventListener("click", () => {
    onClose();
  });
}

if (addType) {
  addType.addEventListener("click", (e) => {
    const onSelected = e.target.value;
    if (onSelected != "") {
      addValue.type = onSelected;
    }
  });
}

if (saveField) {
  saveField.addEventListener("click", async () => {
    const type = addType.value;
    const name = addName.value;
    const value = addValue.value;
    if (type == "") {
      addType.classList.add("error");
    } else {
      addType.classList.remove("error");
    }
    if (name == "") {
      addName.classList.add("error");
    } else {
      addName.classList.remove("error");
    }
    if (value == "") {
      addValue.classList.add("error");
    } else {
      addValue.classList.remove("error");
    }

    let otherType = type != "checkbox" && type != "radio" && type != "image";
    let isChecked = type === "checkbox" || type === "radio";
    let image = type === "image";
    let data = {
      name: name,
      type: type,
      value: otherType ? value : "",
      src: image ? addValue.src : "",
      checked: isChecked ? addValue.checked : "",
    };
    storeData.push(data);
    const id = storeData.length - 1;
    await chrome.storage.local.set({ [key]: storeData });
    const tableRow = generateTable(id, data);
    tbody.appendChild(tableRow);
    onClose();
  });
}

if (exits) {
  exits.forEach((exit) => {
    exit.addEventListener("click", () => {
      onClose();
    });
  });
}

function onClose() {
  if (fieldModal.className.indexOf("show") == -1) {
    fieldModal.className += " show";
  } else {
    fieldModal.className = fieldModal.className.replace(" show", "");
  }
}

window.onclick = function (event) {
  if (event.target == fieldModal) {
    fieldModal.style.display = "none";
  }
};

function generateTable(id, data) {
  const element = template.content.firstElementChild.cloneNode(true);

  element.id = id;
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
  return element;
}
