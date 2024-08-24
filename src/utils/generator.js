import {
  url,
  names,
  cities,
  states,
  streets,
  haxArray,
  countryCode,
  countryList,
  loremTextArray,
} from "./data.js";
import { faker } from "@faker-js/faker";

function randomValue(value) {
  return Math.floor(Math.random() * value.length);
}

export function generateRandomVariable(data) {
  const random = randomValue(data);
  const value = data[random];
  return value;
}

export function generateFormText(name) {
  name = name.toLowerCase();

  // Define regex patterns for each character class
  const patterns = {
    name: names,
    city: cities,
    state: states,
    street: streets,
    country: countryList,
    address: generateRandomAddress(),
    bio: faker.person.bio(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    middleName: faker.person.middleName(),
    fullName: faker.person.fullName(),
    sex: faker.person.gender(),
    jobArea: faker.person.jobArea(),
    jobDescriptor: faker.person.jobDescriptor(),
    jobTitle: faker.person.jobTitle(),
    // Add more patterns as needed
  };

  // Check if the name exists in the patterns
  if (patterns.hasOwnProperty(name)) {
    if (name === "address") {
      return patterns[name];
    }
    if (Array.isArray(patterns[name])) {
      const values = patterns[name];
      // Randomly select a value from the pattern
      return values[Math.floor(Math.random() * values.length)];
    } else {
      return patterns[name];
    }
  } else {
    // Default value if name doesn't match any pattern
    return names[Math.floor(Math.random() * names.length)];
  }
}

function generateRandomAddress() {
  // List of possible street names, cities, and states
  const street = streets;
  const city = cities;
  const state = states;

  // Randomly select street, city, and state
  const randomStreet = streets[randomValue(streets)];
  const randomCity = cities[randomValue(cities)];
  const randomState = states[randomValue(states)];

  // Generate a random house number (between 1 and 1000)
  const randomNumber = Math.floor(Math.random() * 1000) + 1;

  // Construct the address string
  const address =
    randomNumber + " " + randomStreet + ", " + randomCity + ", " + randomState;

  return address;
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

export function generateRandomPhone(pattern) {
  if (pattern) {
    return generatePhoneNumberPattern(pattern);
  }
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
  var wordArray = loremTextArray;

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

export function generatePhoneNumberPattern(pattern) {
  // Define regex patterns for each character class
  const patterns = {
    d: "0123456789",
    w: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",
    s: " !@#$%^&*()[]{}-=_+;:,.<>?/\\|",
  };

  let variable = "";
  let repeatCount = 1; // Default repeat count

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === "{") {
      // If curly brace is encountered, extract the repeat count
      const endIndex = pattern.indexOf("}", i);
      const range = pattern.substring(i + 1, endIndex);
      const parts = range.split(",");
      const min = parseInt(parts[0]);
      const max = parseInt(parts[1]);
      repeatCount = Math.floor(Math.random() * (max - min + 1)) + min;
      i = endIndex; // Move the index to the end of the curly brace notation
    } else if (char === "\\") {
      continue;
    } else if (char === "[") {
      // If bracket is encountered, extract the repeat count
      const endIndex = pattern.indexOf("]", i);
      const range = pattern.substring(i + 1, endIndex);
      console.log("range", range);
      const parts = range.split("-");
      const min = parseInt(parts[0]);
      const max = parseInt(parts[1]);

      const openBraceIndex = endIndex + 1;
      const closeBraceIndex = pattern.indexOf("}", openBraceIndex);
      const curlyBraceCount = pattern.substring(
        openBraceIndex + 1,
        closeBraceIndex
      );

      if (pattern[openBraceIndex] === "{") {
        const chars = patterns["d"];
        variable += loopPatterns(chars, curlyBraceCount);
      }
      i = closeBraceIndex; // Move the index to the end of the curly brace notation
    } else if (patterns[char]) {
      // If character class is defined, randomly select characters from it
      const endIndex = pattern.indexOf("}", i);
      const range = pattern.substring(i + 2, endIndex);
      if (pattern[i + 1] === "{") {
        const chars = patterns[char];
        variable += loopPatterns(chars, range);
      }
      repeatCount = 1; // Reset repeat count after processing
    } else {
      // Otherwise, use the character as is
      variable += char;
      repeatCount = 1; // Reset repeat count after processing
    }
  }
  return variable;
}

function loopPatterns(chars, repeatCount) {
  let result = "";
  for (let j = 0; j < repeatCount; j++) {
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    result += randomChar;
  }
  return result;
}
