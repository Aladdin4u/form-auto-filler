const names = ["john", "joe", "cater", "snow"];
const emails = [
  "john@example.com",
  "joe@example.com",
  "cater@example.com",
  "snow@example.com",
];
const phones = ["09012345678", "08012345678", "07012345678", "09112345678"];
const cities = ["new york", "london", "madrid", "lagos"];
const states = ["new york", "london", "madrid", "lagos"];
const country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const addresses = ["1600 Pennsylvanna Avenue", "24 Avenue"];

(() => {
  const form = document.querySelector("form");

  if (form) {
    const formInput = document.querySelectorAll("input");
    const formTextArea = document.querySelectorAll("form textarea");
    const formSelect = document.querySelectorAll("form select");
    const formDatalist = document.querySelectorAll("form datalist");

    if (formInput) {
      formInput.forEach((element) => {
        if (element.type === "text") {
          const formName = element.name.toLowerCase();
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
            const variable = generateRandomVariable(names);
            element.value = variable;
          } else if (city) {
            const variable = generateRandomVariable(cities);
            element.value = variable;
          } else if (address) {
            const variable = generateRandomVariable(addresses);
            element.value = variable;
          } else if (state) {
            const variable = generateRandomVariable(states);
            element.value = variable;
          } else if (country) {
            const variable = generateRandomVariable(country_list);
            element.value = variable;
          } else {
            return;
          }
        } else if (element.type === "email") {
          const variable = generateRandomVariable(emails);
          element.value = variable;
        } else if (element.type === "color") {
          const variable = generateRandomColor();
          element.value = variable;
        } else if (element.type === "number") {
          const variable = generateRandomNumber(
            element.min,
            element.max,
            element.step
          );
          element.value = variable;
        } else if (element.type === "range") {
          const variable = generateRandomNumber(
            element.min,
            element.max,
            element.step
          );
          element.value = variable;
        } else if (element.type === "date") {
          const variable = generateRandomDate(element.min, element.max);
          element.value = variable.slice(0, 10);
        } else if (element.type === "datetime-local") {
          const variable = generateRandomDate(element.min, element.max);
          element.value = variable.slice(0, 16);
        } else if (element.type === "month") {
          const variable = generateRandomDate(element.min, element.max);
          element.value = variable.slice(0, 7);
        } else if (element.type === "tel") {
          const variable = generateRandomPhone(element.pattern);
          element.value = variable;
        } else if (element.type === "radio") {
          element.checked = true;
        }
      });
    }

    if (formTextArea) {
      formTextArea.forEach((element) => {
        const variable = generateLoremText();
        element.value = variable;
      });
    }

    if (formSelect) {
      formSelect.forEach((element) => {
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
})();

function generateRandomVariable(data) {
  const random = Math.floor(Math.random() * data.length);
  const value = data[random];
  return value;
}

function generateRandomNumber(min, max, step) {
  const start = min ? Number(min) : 0;
  const end = max ? Number(max) : 100;
  const interval = step ? step : 1;

  const newNumber =
    Math.floor(Math.random() * (end - start) + start) * interval;

  return newNumber;
}

function generateRandomDate(min, max) {
  const start = min ? new Date(min) : new Date(0);
  const end = max ? new Date(max) : new Date();

  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  const newDate = new Date(date).toISOString();

  return newDate;
}

function generateRandomColor() {
  const haxArray = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += haxArray[Math.floor(Math.random() * haxArray.length)];
  }
  return color;
}

function generateRandomPhone(pattern) {
  const regex = /`${pattern}`/;
  let newNumber = "";
  const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < 11; i++) {
    newNumber += numberArray[Math.floor(Math.random() * numberArray.length)];
  }

  return newNumber;
}

function generateLoremText() {
  const paragraphs = [1, 2, 3, 4, 5];
  const words = [10, 20, 30, 40, 50];
  const paragraphLength =
    paragraphs[Math.floor(Math.random() * paragraphs.length)];
  const wordLength = words[Math.floor(Math.random() * words.length)];
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
      var randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
      paragraph += randomWord + " ";
    }
    loremText += paragraph.trim() + ". \n";
  }
  return loremText;
}
