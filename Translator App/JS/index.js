import countries from "./countries.js";

const d = document,
  API = "https://api.mymemory.translated.net/get?q=",
  $children = d.querySelector(".select-language-container").children,
  $swap = d.querySelector(".swap-languages"),
  $selects = d.querySelectorAll("select"),
  $text_areas = d.querySelectorAll("textarea"),
  $button_translate = d.querySelector("button"),
  $copy_buttons = d.querySelectorAll(".copy"),
  $sound_buttons = d.querySelectorAll(".sound");

let isSwap = false;

const giving_an_order = () => {
  for (let i = 0; i < $children.length; i++) {
    $children[i].style.order = i;
  }
};

const filling_options = () => {
  const $fragment = d.createDocumentFragment();
  let cont = 0;
  $selects.forEach((select) => {
    for (const key in countries) {
      const option = d.createElement("option");
      option.value = key;
      if (cont === 0 && key === "es-ES") {
        option.selected = true;
        cont++;
      } else if (cont === 1 && key === "en-US") {
        option.selected = true;
      }
      option.textContent = countries[key];
      $fragment.appendChild(option);
    }
    select.appendChild($fragment);
  });
};

const swap_order = () => {
  let aux = null,
    aux_text = null;
  aux = $selects[0].style.order;
  $selects[0].style.order = $selects[1].style.order;
  $selects[1].style.order = aux;
  $text_areas.forEach((textarea) => {
    if (textarea.classList.contains("disabled")) {
      textarea.classList.remove("disabled");
      textarea.placeholder = "Enter Text";
      textarea.readOnly = false;
    } else {
      textarea.classList.add("disabled");
      textarea.placeholder = "Translation";
      textarea.readOnly = true;
    }
    aux_text = $text_areas[1].value;
    $text_areas[1].value = $text_areas[0].value;
    $text_areas[0].value = aux_text;
  });
};

const speechMessage = (text, lang) => {
  let voices = window.speechSynthesis.getVoices();
  let msg = new SpeechSynthesisUtterance();
  console.log(lang);
  if (window.speechSynthesis.speaking) return;
  voices.forEach((voz) => (voz.lang === lang ? (msg.voice = voz) : ""));
  msg.text = text;
  speechSynthesis.speak(msg);
};

const translate = () => {
  if (!isSwap) {
    if (!$selects[0].value || !$selects[1].value || !$text_areas[0].value)
      return;
    $text_areas[1].placeholder = "Translating...";
    $button_translate.disabled = true;
    let translateFrom = $selects[0].value,
      translateTo = $selects[1].value,
      textToTranslate = $text_areas[0].value;
    fetch(`${API}${textToTranslate}&langpair=${translateFrom}|${translateTo}`)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({ status: res.status, statusText: res.statusText })
      )
      .then(
        (translated) =>
          ($text_areas[1].value = translated.responseData.translatedText)
      );
    $button_translate.disabled = false;
    $text_areas[1].placeholder = "Translation";
  } else {
    if (!$selects[0].value || !$selects[1].value || !$text_areas[1].value)
      return;
    $button_translate.disabled = true;
    $text_areas[0].placeholder = "Translating...";
    let translateFrom = $selects[1].value,
      translateTo = $selects[0].value,
      textToTranslate = $text_areas[1].value;
    fetch(`${API}${textToTranslate}&langpair=${translateFrom}|${translateTo}`)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({ status: res.status, statusText: res.statusText })
      )
      .then(
        (translated) =>
          ($text_areas[0].value = translated.responseData.translatedText)
      );
    $text_areas[0].placeholder = "Translation";
    $button_translate.disabled = false;
  }
};

d.addEventListener("DOMContentLoaded", (e) => {
  giving_an_order();
  filling_options();
});

d.addEventListener("click", (e) => {
  if (e.target === $swap) {
    isSwap ? (isSwap = false) : (isSwap = true);
    swap_order();
  }
  if (e.target === $button_translate) {
    translate();
  }
  if (e.target === $copy_buttons[0] && !isSwap) {
    navigator.clipboard.writeText($text_areas[0].value);
  } else {
    navigator.clipboard.writeText($text_areas[1].value);
  }
  if (e.target === $copy_buttons[1] && !isSwap) {
    navigator.clipboard.writeText($text_areas[1].value);
  } else {
    navigator.clipboard.writeText($text_areas[0].value);
  }
  if (e.target === $sound_buttons[0] && !isSwap) {
    let lang = $selects[0].value;
    speechMessage($text_areas[0].value, lang);
  } else if (e.target === $sound_buttons[0] && isSwap) {
    let lang = $selects[1].value;
    speechMessage($text_areas[1].value, lang);
  }
  if (e.target === $sound_buttons[1] && !isSwap) {
    let lang = $selects[1].value;
    speechMessage($text_areas[1].value, lang);
  } else if (e.target === $sound_buttons[1] && isSwap) {
    let lang = $selects[0].value;
    speechMessage($text_areas[0].value, lang);
  }
});

window.addEventListener("paste", (e) => {
  e.preventDefault();
  navigator.clipboard.readText().then((text) => ($text_areas[0].value = text));
});
