const url_random_word = "https://random-word-api.herokuapp.com/word",
  url_definition_word = "https://api.dictionaryapi.dev/api/v2/entries/en/",
  d = document,
  $word = d.querySelector(".word"),
  $definition = d.querySelector(".clue"),
  $timer = d.querySelector(".time"),
  [$refresh, $check] = d.querySelectorAll("button"),
  $npt_text = d.querySelector("input");

let interval = null;

const randomLetters = (word) => {
  let length = word[0].split("").length;
  let index = [];
  let random = [];
  for (let i = 0; i < length; i++) {
    let ndx = Math.floor(Math.random() * length);
    index.includes(ndx) ? i-- : index.push(ndx);
  }
  index.forEach((number) => random.push(word[0][number]));
  return random.join("");
};
const chargingWord = () => {
  $refresh.firstChild.textContent = "Refresh Word";
  $check.disabled = false;
  fetch(url_random_word)
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({ status: res.status, statusText: res.statusText })
    )
    .then((word) => {
      fetch(`${url_definition_word}${word}`)
        .then((res) =>
          res.ok
            ? res.json()
            : Promise.reject({ status: res.status, statusText: res.statusText })
        )
        .then((definition) => {
          let meaning = definition[0].meanings[0].definitions[0].definition;
          $npt_text.dataset.word = word[0];
          $word.textContent = randomLetters(word);

          $definition.innerHTML = `<b>Hind</b>: ${meaning}`;
        })
        .catch((err) => (err.status === 404 ? chargingWord() : err));
    })
    .catch((err) => {
      console.log(err.status);
    })
    .finally(() => {
      clearInterval(interval);
      let cont = 30;
      interval = setInterval(() => {
        $timer.textContent = `Time left: ${cont}s`;
        if (cont <= 0) {
          clearInterval(interval);
          window.alert(
            `No lograste adivinar la palabra era "${$npt_text.dataset.word}"`
          );
          $check.disabled = true;
        } else {
          cont--;
        }
      }, 1000);
    });
};

d.addEventListener("DOMContentLoaded", (e) => {
  chargingWord();
});
d.addEventListener("click", (e) => {
  console.log($refresh.firstChild);
  if (e.target === $refresh) {
    chargingWord();
  }
  if (e.target === $check) {
    if ($npt_text.value === $npt_text.dataset.word) {
      clearInterval(interval);
      window.confirm("Adivinaste la palabra !");
      $refresh.firstChild.textContent = "Try again ?";
      $check.classList.remove("invalid");
    } else {
      $check.classList.add("invalid");
    }
  }
});
