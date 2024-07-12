(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.text == "ON") {
      fillForm();
    } else if (request.text == "CHECKFORM") {
      const form = document.querySelector("form");
      if (form == null) {
        sendResponse({ form: false });
      } else {
        sendResponse({ form: true });
      }
    } else if (request.text == "NEWFORM") {
      generateForm(request, sendResponse);
    } else if (request.text == "SELECTFORM") {
      selectForm(request);
    } else if (request.text == "EDITFORM") {
      sendResponse({ url: sender.id });
    } else {
      clearForm();
    }
  });
})();

function generateForm(request, sendResponse) {
  let results = [];
  const formElements = document.querySelectorAll("form input, form textarea");
  if (formElements) {
    formElements.forEach((element) => {
      if (element.type === "submit" || element.type === "file") {
        return;
      }

      let newdata = {
        name: element.name,
        type: element.type,
        value: element.value,
        src: element.src,
        checked: element.checked,
      };

      results.push(newdata);
    });
  }

  let storageKey = `${request.name}:${request.tabId}`;

  chrome.storage.local.set({
    [storageKey]: results,
  });

  sendResponse({ key: storageKey });
}

async function selectForm(request) {
  const data = await chrome.storage.local.get(request.key);
  const formElements = document.querySelectorAll("input");
  formElements.forEach((element) => {
    data[request.key].forEach((el) => {
      if (el.name === element.name) {
        el.checked
          ? (element.checked = el.checked)
          : (element.value = el.value);
      }
    });
  });
}

async function fillForm() {
  const form = document.querySelector("form");
  if (form) {
    const formElements = document.querySelectorAll("form input, form textarea");
    const formSelect = document.querySelectorAll("form select");
    const formDatalist = document.querySelectorAll("form datalist");

    if (formElements) {
      formElements.forEach(async (element) => {
        const response = await chrome.runtime.sendMessage({
          text: "AUTOFILL",
          type: element.type,
          min: element.min,
          max: element.max,
          step: element.max,
          width: element.width,
          height: element.height,
          name: element.name,
          src: element.src,
          pattern: element.pattern,
        });
        const data = response?.data;
        if (element.type === "radio" || element.type === "checkbox") {
          element.checked = data;
        } else if (element.type === "image") {
          element.src = data;
        } else if (element.type === "file" || element.list) {
          return;
        } else if (element.type === "password") {
          element.value = data;
          setTimeout(() => {
            createNotification(data);
          }, 300);
        } else {
          element.value = data;
        }
      });
    }

    if (formSelect) {
      formSelect.forEach(async (element) => {
        const option = generateRandomVariable(element);
        option.selected = true;
      });
    }

    if (formDatalist) {
      formDatalist.forEach((element) => {
        const option = generateRandomVariable(element.children);
        element.previousSibling.previousSibling.value = option.value;
      });
    }
  }
}

function clearForm() {
  const form = document.querySelector("form");
  clearNotification();
  if (form) {
    const formElements = document.querySelectorAll("form input, form textarea");
    const formSelect = document.querySelectorAll("form select");

    formElements.forEach((element) => {
      if (element.type === "image") {
        element.src = "";
      } else if (element.type === "checkbox" || element.type === "radio") {
        element.checked = false;
      } else if (element.type === "color") {
        element.value = "#000000";
      } else {
        element.value = null;
      }
    });

    formSelect.forEach((element) => {
      element.selected = false;
    });
  }
}

function clearNotification() {
  const bodyElement = document.querySelector("body");
  const ifNotificationExist = document.querySelector("#notification");
  if (ifNotificationExist) {
    bodyElement.removeChild(ifNotificationExist);
  }
}

function generateRandomVariable(data) {
  const random = Math.floor(Math.random() * data.length);
  const value = data[random];
  return value;
}

function createNotification(value) {
  const bodyElement = document.querySelector("body");
  const containerElement = document.createElement("div");
  const divElement = document.createElement("div");
  const notifyElement = document.createElement("span");
  const headerElement = document.createElement("span");
  const passwordElement = document.createElement("span");
  const copyElement = document.createElement("button");

  containerElement.id = "notification";
  let containerStyles = `position:relative;max-width:356px;background-color:white;margin: 4px auto;padding:8px;border-radius:8px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);`;
  const animateTop = [
    { top: "-300px", opacity: 0 },
    { top: 0, opacity: 1 },
  ];
  const animateOption = { duration: 400 };
  containerElement.animate(animateTop, animateOption);

  containerElement.style = containerStyles;
  let divStyles = `display:flex;justify-content: space-between;align-items:center;padding:5px;background-color:#f8f8f8;`;
  divElement.style = divStyles;
  let notifyStyles = `display:none;padding:5px;color:green;text-align:center;font-size:12px;`;
  notifyElement.id = "hide-notify";
  notifyElement.style = notifyStyles;

  headerElement.textContent = "Password:";
  passwordElement.id = "copy-text";
  passwordElement.textContent = value;
  copyElement.innerHTML = "&#128203;";
  copyElement.onclick = async function () {
    const copyText = document.getElementById("copy-text");
    const notifyText = document.getElementById("hide-notify");

    try {
      await navigator.clipboard.writeText(copyText.innerText);
    } catch (error) {
      console.error(error.message);
    }
    let notify = `password "${copyText.innerText}" copied to the clipboard!`;

    notifyText.textContent = notify;
    notifyText.style.display = "block";

    setTimeout(() => {
      clearNotification();
    }, 5000);
  };

  divElement.appendChild(passwordElement);
  divElement.appendChild(copyElement);

  containerElement.appendChild(notifyElement);
  containerElement.appendChild(headerElement);
  containerElement.appendChild(divElement);

  bodyElement.insertAdjacentElement("afterbegin", containerElement);
}
