const names = ["john", "joe", "cater", "snow"];
const emails = [
  "john@example.com",
  "joe@example.com",
  "cater@example.com",
  "snow@example.com",
];
const cities = ["new york", "london", "madrid", "lagos"];
const states = ["new york", "london", "madrid", "lagos"];
const countryList = [
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
            const variable = generateRandomVariable(countryList);
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
        } else if (element.type === "time") {
          const variable = generateRandomDate(element.min, element.max);
          element.value = variable.slice(11, -8);
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
          if (element.pattern) {
            return;
          }
          const variable = generateRandomPhone();
          element.value = variable;
        } else if (element.type === "radio") {
          element.checked = true;
        } else if (element.type === "checkbox") {
          element.checked = true;
        } else if (element.type === "url") {
          const variable = generateRandomUrl();
          element.value = variable;
        } else if (element.type === "image") {
          const variable = generateRandomImage(
            element.width,
            element.height,
            element.name
          );
          element.src = variable;
        } else if (element.type === "password") {
          const variable = generateRandomPassword();
          element.value = variable;
          alert(`your password is "${variable}" copy and store.`);
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

function randomValue(value) {
  return Math.floor(Math.random() * value.length);
}

function generateRandomVariable(data) {
  const random = randomValue(data);
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
  let color = "#";
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

  for (let i = 0; i < 6; i++) {
    color += haxArray[randomValue(haxArray)];
  }
  return color;
}

function generateRandomPhone() {
  let newNumber = "";
  const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const countryCode = [
    "213",
    "376",
    "244",
    "1264",
    "1268",
    "54",
    "374",
    "297",
    "61",
    "43",
    "994",
    "1242",
    "973",
    "880",
    "1246",
    "375",
    "32",
    "501",
    "229",
    "1441",
    "975",
    "591",
    "387",
    "267",
    "55",
    "673",
    "359",
    "226",
    "257",
    "855",
    "237",
    "1",
    "238",
    "1345",
    "236",
    "56",
    "86",
    "57",
    "269",
    "242",
    "682",
    "506",
    "385",
    "53",
    "90392",
    "357",
    "42",
    "45",
    "253",
    "1809",
    "1809",
    "593",
    "20",
    "503",
    "240",
    "291",
    "372",
    "251",
    "500",
    "298",
    "679",
    "358",
    "33",
    "594",
    "689",
    "241",
    "220",
    "7880",
    "49",
    "233",
    "350",
    "30",
    "299",
    "1473",
    "590",
    "671",
    "502",
    "224",
    "245",
    "592",
    "509",
    "504",
    "852",
    "36",
    "354",
    "91",
    "62",
    "98",
    "964",
    "353",
    "972",
    "39",
    "1876",
    "81",
    "962",
    "7",
    "254",
    "686",
    "850",
    "82",
    "965",
    "996",
    "856",
    "371",
    "961",
    "266",
    "231",
    "218",
    "417",
    "370",
    "352",
    "853",
    "389",
    "261",
    "265",
    "60",
    "960",
    "223",
    "356",
    "692",
    "596",
    "222",
    "269",
    "52",
    "691",
    "373",
    "377",
    "976",
    "1664",
    "212",
    "258",
    "95",
    "264",
    "674",
    "977",
    "31",
    "687",
    "64",
    "505",
    "227",
    "234",
    "683",
    "672",
    "670",
    "47",
    "968",
    "680",
    "507",
    "675",
    "595",
    "51",
    "63",
    "48",
    "351",
    "1787",
    "974",
    "262",
    "40",
    "7",
    "250",
    "378",
    "239",
    "966",
    "221",
    "381",
    "248",
    "232",
    "65",
    "421",
    "386",
    "677",
    "252",
    "27",
    "34",
    "94",
    "290",
    "1869",
    "1758",
    "249",
    "597",
    "268",
    "46",
    "41",
    "963",
    "886",
    "7",
    "66",
    "228",
    "676",
    "1868",
    "216",
    "90",
    "7",
    "993",
    "1649",
    "688",
    "256",
    "44",
    "380",
    "971",
    "598",
    "1",
    "7",
    "678",
    "379",
    "58",
    "84",
    "84",
    "84",
    "681",
    "969",
    "967",
    "260",
    "263",
  ];

  for (let i = 0; i < 10; i++) {
    if (newNumber.length == 3) {
      newNumber += " ";
    } else if (newNumber.length == 7) {
      newNumber += " ";
    }
    newNumber += numberArray[randomValue(numberArray)];
  }

  const formatNumber = `+${countryCode[randomValue(countryCode)]} ${newNumber}`;

  return formatNumber;
}

function generateLoremText() {
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

function generateRandomUrl() {
  const url = [
    "google",
    "amazon",
    "apple",
    "netflix",
    "yahoo",
    "facebook",
    "instagram",
  ];
  const randomUrl = url[randomValue(url)];

  return "https://" + randomUrl + ".com";
}

function generateRandomImage(w, h, n) {
  const width = w ? w : 100;
  const height = h ? h : 100;
  const name = n ? n : "";

  return `https://source.unsplash.com/random/${width}x${height}/?${name}`;
}

function generateRandomPassword() {
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).toUpperCase().slice(2)
  );
}
