const d = document,
  $btn_evaluate = d.querySelector("button"),
  $Input_text = d.querySelector("input"),
  $container_msg = d.querySelector(".message-palindrome");

let isPalindrome = false;

const evaluate_word = (word) => {
  let re = /[\u0300-\u036f]/gi,
    re2 = /[\W]/g,
    modificated_word = word
      .toLowerCase()
      .normalize("NFD")
      .replace(re, "")
      .replace(re2, ""),
    reverse_word = modificated_word.split("").reverse().join("");

  if (modificated_word === reverse_word) {
    let html_tag = `<p>Yes, <span></span> is a palindrome</p>`;
    $container_msg.innerHTML = html_tag;
    setTimeout(() => {
      let $span_message = d.querySelector(".message-palindrome span");
      $span_message.textContent = word;
      $span_message.classList.add("message-palindrome-yes");
      $container_msg.classList.add("active");
      setTimeout(() => {
        $container_msg.classList.remove("active");
        $span_message.classList.remove("message-palindrome-yes");
      }, 3000);
    }, 100);
  } else {
    let html_tag = `<p>No, <span></span> isn't a palindrome</p>`;
    $container_msg.innerHTML = html_tag;
    setTimeout(() => {
      let $span_message = d.querySelector(".message-palindrome span");
      $span_message.textContent = word;
      $span_message.classList.add("message-palindrome-not");
      $container_msg.classList.add("active");
      setTimeout(() => {
        $container_msg.classList.remove("active");
        $span_message.classList.remove("message-palindrome-not");
      }, 3000);
    }, 100);
  }
  $Input_text.value = "";
};

d.addEventListener("click", (e) => {
  if (e.target === $btn_evaluate) {
    let palindrome = $Input_text.value;
    evaluate_word(palindrome);
  }
});
