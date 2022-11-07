const d = document,
  $buttons = d.querySelectorAll(".btn"),
  $firstImage = d.querySelectorAll("img")[0],
  $carrousel = d.querySelector(".image-slider");

let move = 0,
  isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  firstImageWidth,
  scrollWidth,
  positionDiff;

/* const passImage = (e) => {
  if (e.target.classList.contains("left")) {
    move += 100;
    $buttons.forEach((button) => button.classList.remove("disp-hid"));
    $images.forEach(
      (image) => (image.style.transform = `translate(-${move}%)`)
    );
    if (move >= 800) {
      $buttons.forEach((button) => {
        if (button.classList.contains("left")) button.classList.add("disp-hid");
      });
    }
  } else {
    if (move <= 800) {
      $buttons.forEach((button) => {
        if (button.classList.contains("left"))
          button.classList.remove("disp-hid");
      });
    }
    move -= 100;
    $images.forEach(
      (image) => (image.style.transform = `translate(-${move}%)`)
    );
  }
  if (move <= 0) {
    $buttons.forEach((button) => {
      if (button.classList.contains("right")) button.classList.add("disp-hid");
    });
  }
}; */

/* $buttons.forEach((button) => {
  button.addEventListener("click", passImage);
}); */

const autoSlide = () => {
  if ($carrousel.scrollLeft === $carrousel.scrollWidth - $carrousel.clientWidth)
    return;
  positionDiff = Math.abs(positionDiff);
  let valDifference = firstImageWidth - positionDiff;

  if ($carrousel.scrollLeft > prevScrollLeft) {
    return ($carrousel.scrollLeft +=
      positionDiff > firstImageWidth / 3 ? valDifference : -positionDiff);
  }
  $carrousel.scrollLeft -=
    positionDiff > firstImageWidth / 3 ? valDifference : -positionDiff;
};

const dragStop = (e) => {
  isDragStart = false;
  $carrousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = $carrousel.scrollLeft;
  $carrousel.classList.add("dragging");
};

const showHideButtons = () => {
  $carrousel.scrollLeft === 0
    ? $buttons[0].classList.add("disp-hid")
    : $buttons[0].classList.remove("disp-hid");

  $carrousel.scrollLeft === scrollWidth
    ? $buttons[1].classList.add("disp-hid")
    : $buttons[1].classList.remove("disp-hid");
};

const scrollLeft = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  $carrousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideButtons();
};

$buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    $carrousel.scrollLeft +=
      button.id === "left" ? -firstImageWidth : firstImageWidth;
    setTimeout(() => {
      showHideButtons();
    }, 60);
  });
});
d.addEventListener("mousedown", dragStart);
d.addEventListener("touchmove", dragStart);

d.addEventListener("mousemove", scrollLeft);
d.addEventListener("touchstart", scrollLeft);

d.addEventListener("mouseup", dragStop);
d.addEventListener("touchcancel", dragStop);

window.addEventListener("load", (e) => {
  firstImageWidth = $firstImage.clientWidth + 3;
  scrollWidth = $carrousel.scrollWidth - $carrousel.clientWidth;
});
window.addEventListener("resize", (e) => {
  firstImageWidth = $firstImage.clientWidth + 3;
  scrollWidth = $carrousel.scrollWidth - $carrousel.clientWidth;
});
d.addEventListener("mouseleave", dragStop);
