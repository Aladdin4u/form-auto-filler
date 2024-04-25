import { countryCode, haxArray, url } from "./data.js";

function randomValue(value) {
  return Math.floor(Math.random() * value.length);
}

export function generateRandomVariable(data) {
  const random = randomValue(data);
  const value = data[random];
  return value;
}

export function generateRandomRange(min, max, step) {
  const start = min ? Number(min) : 0;
  const end = max ? Number(max) : 100;
  const interval = step ? step : 1;

  const newNumber =
    Math.floor(Math.random() * (end - start) + start) * interval;

  return newNumber;
}

export function generateRandomDate(min, max) {
  const start = min ? new Date(min) : new Date(0);
  const end = max ? new Date(max) : new Date();

  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  const newDate = new Date(date).toISOString();

  return newDate;
}

export function generateRandomColor() {
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += haxArray[randomValue(haxArray)];
  }
  return color;
}

export function generateRandomNumber(length) {
  let arrayLength = length ? length : 10;
  let newNumber = "";
  const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < arrayLength; i++) {
    if (newNumber.length == 3) {
      newNumber += " ";
    } else if (newNumber.length == 7) {
      newNumber += " ";
    }
    newNumber += numberArray[randomValue(numberArray)];
  }

  return newNumber;
}

export function generateRandomPhone() {
  const newNumber = generateRandomNumber();

  const formatNumber = `+${countryCode[randomValue(countryCode)]} ${newNumber}`;

  return formatNumber;
}

export function generateLoremText() {
  const paragraphs = [1, 2, 3, 4, 5];
  const words = [10, 20, 30, 40, 50];
  const paragraphLength = paragraphs[randomValue(paragraphs)];
  const wordLength = words[randomValue(words)];
  var loremText = "";
  var wordArray = [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "Ut",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "ut",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "Duis",
    "aute",
    "irure",
    "dolor",
    "in",
    "reprehenderit",
    "in",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "dolore",
    "eu",
    "fugiat",
    "nulla",
    "pariatur",
    "Excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "in",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
  ];

  for (let i = 0; i < paragraphLength; i++) {
    var paragraph = "";
    for (let j = 0; j < wordLength; j++) {
      var randomWord = wordArray[randomValue(wordArray)];
      paragraph += randomWord + " ";
    }
    loremText += paragraph.trim() + ". \n";
  }
  return loremText;
}

export function generateRandomUrl() {
  const randomUrl = url[randomValue(url)];

  return "https://" + randomUrl + ".com";
}

export function generateRandomImage(w, h, n) {
  const width = w ? w : 100;
  const height = h ? h : 100;
  const name = n ? n : "";

  return `https://source.unsplash.com/random/${width}x${height}/?${name}`;
}

export function generateRandomPassword() {
  let password = "";
  const passwordLength = Math.floor(Math.random() * (32 - 8) + 8);
  const string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$_-+=()^*%!~|?/<>,.";

  for (let i = 0; i < passwordLength; i++) {
    let character = randomValue(string);
    password += string.charAt(character);
  }

  return password;
}
