const d = document,
  $letters_container = d.querySelector(".container-letters"),
  $remaining = d.querySelector(".remaining"),
  $wrong_letters = d.querySelector(".wrong"),
  $button_reset = d.querySelector("button"),
  URL = "https://random-words-api.vercel.app/word",
  $hint = d.querySelector(".hint");

let word_letters,
  tries = 8,
  wrongs = 0,
  remain = false,
  win = false;

const insertWord = (word, definition) => {
  let $fragment = d.createDocumentFragment();
  word.split("").forEach((el) => {
    let $input = d.createElement("input");
    $input.type = "text";
    $input.disabled = "true";
    $input.dataset.letter = `${el}`;
    $fragment.appendChild($input);
  });
  $letters_container.appendChild($fragment);
  $remaining.insertAdjacentText("beforeend", ` ${tries}`);
  $wrong_letters.insertAdjacentText("beforeend", ` ${wrongs}`);
  $hint.insertAdjacentText("beforeend", definition);
  word_letters = d.querySelectorAll("input");
};

const consulting_word = async () => {
  try {
    let res = await fetch(URL);
    let json = await res.json();
    if (!res.ok) throw { statusText: res.statusText, status: res.status };
    let { word, definition } = json[0];
    console.log(word);
    insertWord(word.toLowerCase(), definition);
  } catch (err) {
    console.log(err);
  }
};

const isLosing = () => {
  if (wrongs === 4) return $wrong_letters.classList.add("medium");
  if (wrongs > 7) {
    $wrong_letters.classList.replace("medium", "lose");
    $button_reset.textContent = "You lose ... Reset ";
  }
};

const findLetter = (e) => {
  let cont = 0,
    cant = word_letters.length;

  if (!win) {
    word_letters.forEach((el) => (el.value ? cont++ : ""));
    cont === cant ? (win = true) : "";
  } else if (win) {
    $button_reset.textContent = "You win!, Try again?";
    return $wrong_letters.classList.add("win");
  }

  if (!tries) return;

  let key_pressed = e.key;

  word_letters.forEach((el) => {
    if (key_pressed === el.dataset.letter) {
      el.value = key_pressed.toUpperCase();
      remain = true;
    }
  });

  if (!remain) {
    tries--;
    wrongs++;
  }

  remain = false;

  $remaining.lastChild.remove();
  $remaining.insertAdjacentText("beforeend", ` ${tries}`);
  $wrong_letters.lastChild.remove();
  $wrong_letters.insertAdjacentText("beforeend", ` ${wrongs}`);
  isLosing();
};

const resetGame = () => {
  tries = 8;
  wrongs = 0;
  $hint.lastChild.remove($hint.lastChild);
  $wrong_letters.classList.remove("lose");
  $wrong_letters.classList.remove("win");
  $button_reset.textContent = "Reset Game";
  $letters_container
    .querySelectorAll("input")
    .forEach((el) => $letters_container.removeChild(el));
  $remaining.removeChild($remaining.lastChild);
  $wrong_letters.removeChild($wrong_letters.lastChild);
  consulting_word();
};

d.addEventListener("DOMContentLoaded", consulting_word);

d.addEventListener("keyup", findLetter);

d.addEventListener("click", (e) => {
  if (e.target === $button_reset) {
    resetGame();
  }
});
