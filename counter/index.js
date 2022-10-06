const CONT = 0;

((d, cont) => {
  const $counter = d.querySelector(".counter");
  const [$minus, $reset, $plus] = d.querySelectorAll("button");

  $reset.setAttribute("disabled", true);
  $counter.innerText = cont;

  d.addEventListener("click", (e) => {
    if (e.target === $minus) {
      cont--;
    } else if (e.target === $plus) {
      cont++;
    } else if (e.target === $reset) {
      cont = CONT;
    }

    $counter.innerText = cont;
    cont === 0
      ? $reset.setAttribute("disabled", true)
      : $reset.removeAttribute("disabled");
  });
})(document, CONT);
