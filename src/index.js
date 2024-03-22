import "./reset.css";
import "./style.css";

// country selector function
const countrySelector = document.getElementById("country");
countrySelector.addEventListener("change", (event) => {
  updateZIPField(countrySelector.value);
});
let zipFieldErrorBoxText =
  "Switzerland must have exactly 4 digits. You entered";
function updateZIPField(selectorValue) {
  const constraints = {
    ch: [
      "\\d\\d\\d\\d",
      4,
      "Switzerland must have exactly 4 digits. You entered",
    ],
    fr: [
      "\\d\\d\\d\\d\\d",
      5,
      "France ZIPs have exactly 5 digits. You entered",
    ],
    de: [
      "\\d\\d\\d\\d\\d\\d",
      6,
      "Germany ZIPs have exactly 6 digits. You entered",
    ],
    nl: [
      "\\d\\d\\d\\d\\d\\d\\d",
      7,
      "Netherland ZIPs have exactly 7 digits. You entered",
    ],
  };
  const zipField = document.getElementById("zip");
  const zipFieldErrorBox = document.querySelector("label[for=zip] > .error");
  zipField.pattern = constraints[selectorValue][0];
  [zipField.minLength, zipField.maxLength] = [0, 0];
  zipField.maxLength = constraints[selectorValue][1];
  zipField.minLength = constraints[selectorValue][1];
  zipFieldErrorBoxText = constraints[selectorValue][2];
  zipFieldErrorBox.textContent = zipFieldErrorBoxText;

  if (!zipField.validity.valid) {
    showError(zipField, zipFieldErrorBox);
  }
}

const inputs = document.querySelectorAll("input");
inputs.forEach((input, i) => {
  const errorBox = document.querySelectorAll(".error")[i];
  input.addEventListener("input", (event) => {
    // throw invalid if the confirm password field doesn't match the password field
    if (i === 2) {
      const errorBox3 = document.querySelectorAll(".error")[3];
      inputs[3].setCustomValidity(
        inputs[3].value !== inputs[2].value ? "Passwords don't match" : ""
      );
      if (inputs[3].validity.valid) {
        errorBox3.className = "error";
        //   errorBox.textContent = "";
      } else {
        showError(inputs[3], errorBox3);
      }
    } else if (i === 3) {
      input.setCustomValidity(
        input.value !== inputs[2].value ? "Passwords don't match" : ""
      );
    }
    if (input.validity.valid) {
      errorBox.className = "error";
      //   errorBox.textContent = "";
    } else {
      showError(input, errorBox);
    }
  });
});

function showError(input, errorBox) {
  console.log({ input });
  if (input.validity.typeMismatch) {
    errorBox.textContent = "Email must be of form this@that.com";
  } else if (input.validity.tooShort) {
    if (input.id === "zip") {
      errorBox.textContent =
        zipFieldErrorBoxText +
        ` ${input.value.length} digit${input.value.length > 1 ? "s" : ""}`;
    } else if (input.id === "password" || input.id === "password-check") {
      errorBox.textContent = "Password must be at least 8 characters long";
    } else if (input.id === "email") {
      errorBox.textContent = "Emails must be at least 8 characters long";
    } else {
      errorBox.textContent = "tooShort working";
    }
  } else if (input.validity.tooLong) {
    if (input.id === "zip") {
      console.log(input.value.length);
      errorBox.textContent =
        zipFieldErrorBoxText +
        ` ${input.value.length} digit${input.value.length > 1 ? "s" : ""}`;
    } else {
      errorBox.textContent = "tooLong working";
    }
  } else if (input.validity.patternMismatch) {
    if (input.id === "zip") {
      errorBox.textContent = "ZIP code is digits only";
    } else if (input.id === "password" || input.id === "password-check") {
      errorBox.textContent =
        "Passwords require one uppercase, one special, and one number";
    } else {
      errorBox.textContent = "patternMismatch working";
    }
  } else if (input.validity.customError) {
    errorBox.textContent = "Passwords don't match";
  }
  errorBox.className = "error active";
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = document.querySelector("button");
  if (!Array.from(inputs).every((input) => input.validity.valid)) {
    submitButton.classList.add("shake");
    submitButton.addEventListener(
      "animationend",
      function () {
        submitButton.classList.remove("shake");
      },
      { once: true }
    );
    console.log("Some input invalid");
  } else {
    submitButton.classList.add("happy");
    submitButton.addEventListener(
      "animationend",
      function () {
        submitButton.classList.remove("happy");
      },
      { once: true }
    );
    console.log("All inputs valid");
  }
});
