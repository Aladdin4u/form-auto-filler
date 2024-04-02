(() => {
  const form = document.querySelectorAll("form input");
  if (form) {
    form.forEach((element) => {
      if (element.type === "text") {
        const variable = typeText();
        element.value = variable;
      } else if (element.type === "number") {
        const variable = typeNumber();
        element.value = variable;
      }
    });
  }
})();

function typeText() {
  const arrayElement = ["john", "joe", "cater", "snow"];
  const random = Math.floor(Math.random() * arrayElement.length);
  const value = arrayElement[random];
  return value;
}

function typeNumber() {
  const arrayElement = [
    "09012345678",
    "08012345678",
    "07012345678",
    "09112345678",
  ];
  const random = Math.floor(Math.random() * arrayElement.length);
  const value = arrayElement[random];
  return value;
}
