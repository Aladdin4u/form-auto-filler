import {
  names,
  cities,
  emails,
  states,
  addresses,
  countryList,
} from "./utils/data.js";
import {
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
        response = generateFormText(
          request.name,
          names,
          cities,
          addresses,
          states,
          countryList
        );
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
        variable = generateRandomPhone();
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

function generateFormText(type, names, cities, addresses, states, countryList) {
  let variable;
  const formName = type.toLowerCase();
  const cityPattern = /cit\w*/g;
  const statePattern = /state\w*/g;
  const countryPattern = /countr\w*/g;
  const addressPattern = /address\w*/g;
  const namePattern = /\w*(-|\s)?name\w*/g;
  const name = namePattern.test(formName);
  const city = cityPattern.test(formName);
  const state = statePattern.test(formName);
  const country = countryPattern.test(formName);
  const address = addressPattern.test(formName);

  if (name) {
    variable = generateRandomVariable(names);
  } else if (city) {
    variable = generateRandomVariable(cities);
  } else if (address) {
    variable = generateRandomVariable(addresses);
  } else if (state) {
    variable = generateRandomVariable(states);
  } else if (country) {
    variable = generateRandomVariable(countryList);
  } else {
    return;
  }

  return variable;
}
