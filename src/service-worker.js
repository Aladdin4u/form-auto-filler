import {
  emails,
} from "./utils/data.js";
import {
  generateFormText,
  generateRandomUrl,
  generateLoremText,
  generateRandomDate,
  generateRandomColor,
  generateRandomRange,
  generateRandomImage,
  generateRandomPhone,
  generateRandomVariable,
  generateRandomPassword,
} from "./utils/generator.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const localhost = "http://localhost/*";
const local = "http://*:*/*";
const file = "file:///";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == "Autofill") {
    let response, variable;
    switch (request.inputType) {
      case "text":
        response = generateFormText(request.name);
        break;
      case "email":
        response = generateRandomVariable(emails);
        break;
      case "color":
        response = generateRandomColor();
        break;
      case "number":
        response = generateRandomRange(request.min, request.max, request.step);
        break;
      case "range":
        response = generateRandomRange(request.min, request.max, request.step);
        break;
      case "time":
        variable = generateRandomDate(request.min, request.max);
        response = variable.slice(11, -8);
        break;
      case "date":
        variable = generateRandomDate(request.min, request.max);
        response = variable.slice(0, 10);
        break;
      case "datetime-local":
        variable = generateRandomDate(request.min, request.max);
        response = variable.slice(0, 16);
        break;
      case "month":
        variable = generateRandomDate(request.min, request.max);
        response = variable.slice(0, 7);
        break;
      case "tel":
        variable = generateRandomPhone(request.pattern);
        response = variable;
        break;
      case "checkbox":
        response = generateRandomVariable([true, false]);
        break;
      case "radio":
        response = generateRandomVariable([true, false]);
        break;
      case "url":
        response = generateRandomUrl();
        break;
      case "image":
        response = generateRandomImage(
          request.width,
          request.height,
          request.name
        );
        break;
      case "password":
        response = generateRandomPassword();
        break;
      case "textarea":
        response = generateLoremText();
        break;
    }
    variable = null;
    sendResponse({ status: "success", data: response });
  }
});
