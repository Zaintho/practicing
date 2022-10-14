const n = navigator;
const d = document;
const $passwordField = d.querySelector(".input-box input");
const $range = d.getElementById("length_rng");
const $range_text = d.querySelector(".details > span");
const $btn = d.querySelector(".generate-btn");
const $options = d.querySelectorAll(".option input");
const $copy = d.querySelector(".copy-icon");
const $msg = d.querySelector(".msg-copied");
const characters = {
  lowercase: "abcdefghijklmnopqrstuvxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[]{}():;.,*+-#@<>~",
};
const $passIndicator = d.querySelector(".pass-indicator");
let duplicate = false;

const updateTextRange = (range, text_range) => {
  range.value <= 8
    ? ($passIndicator.id = "weak")
    : range.value <= 16
    ? ($passIndicator.id = "medium")
    : ($passIndicator.id = "strong");

  text_range.textContent = range.value;
};
const generatePassword = (password) => {
  let randomPassword = "";
  let randomChar = "";
  for (let i = 0; i < $range.value; i++) {
    randomChar = password[Math.floor(Math.random() * password.length)];
    if (duplicate) {
      !randomPassword.includes(randomChar) || randomChar === " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  $passwordField.value = randomPassword;
};

((d) => {
  /* d.addEventListener("change", (e) => {
    if (e.target === $range) {
      $range_text.textContent = $range.value;
    }
  }); */
  updateTextRange($range, $range_text);

  $range.addEventListener("input", (e) => {
    updateTextRange($range, $range_text);
  });
})(d);
((d) => {
  d.addEventListener("click", (e) => {
    if (e.target === $btn) {
      let staticPassword = "";
      $options.forEach((option) => {
        if (option.checked) {
          if (option.name !== "duplicate" && option.name !== "spaces") {
            staticPassword += characters[option.name];
          } else if (option.name === "spaces") {
            staticPassword = `   ${staticPassword}   `;
          } else {
            duplicate = true;
          }
        }
      });
      generatePassword(staticPassword);
    }
    if (e.target === $copy) {
      if (!$passwordField.value === "") return;
      n.clipboard.writeText($passwordField.value);
      $msg.classList.add("active");
      setTimeout(() => {
        $msg.classList.remove("active");
      }, 2000);
    }
  });
})(d);
