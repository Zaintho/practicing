const d = document;

const updateTextRange = (range, text_range) => {
  text_range.textContent = range.value;
};
const generatePassword = () => {};

((d) => {
  const $range = d.getElementById("length_rng");
  const $range_text = d.querySelector(".details > span");
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
  const $btn = d.querySelector(".generate-btn");
  const $options = d.querySelectorAll(".option input");
  const $copy = d.querySelector(".copy-icon");
  const $msg = d.querySelector(".msg-copied");

  d.addEventListener("click", (e) => {
    if (e.target === $btn) {
      $options.forEach((option) => {
        if (option.checked) {
          console.log(option);
        }
      });
    }
    if (e.target === $copy) {
      $msg.classList.add("active");
      setTimeout(() => {
        $msg.classList.remove("active");
      }, 2000);
    }
  });
})(d);
