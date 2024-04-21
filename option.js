const params = new URLSearchParams(document.location.search);
const key = params.get("key");

const tbody = document.getElementById("tbody");
const template = document.getElementById("table_template");

const datas = await chrome.storage.local.get(key);

const elements = new Set();
for (const data of datas[key]) {
  const element = template.content.firstElementChild.cloneNode(true);

  let isChecked = "";
  if (data.type === "checkbox" || data.type === "radio") {
    if (data.checked) {
      isChecked = 1;
    } else {
      isChecked = 0;
    }
  } else if (data.src) {
    isChecked = data.src;
  } else {
    isChecked = data.value;
  }

  element.querySelector(".type").textContent = data.type;
  element.querySelector("#name").value = data.name;
  element.querySelector("#value").value = isChecked;
  elements.add(element);
}

tbody.append(...elements);
