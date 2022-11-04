const d = document,
  $file_input = d.querySelector("input[type='file']"),
  $current_image = d.querySelector("img"),
  $filter_options = d.querySelectorAll(".filters button"),
  $filter_name = d.querySelector(".name"),
  $filter_intensity = d.getElementById("intensity"),
  $filter_porcentage = d.querySelector(".porcentage"),
  $rotate_buttons = d.querySelectorAll(".extra-tools button");

let filters = {
  brightness: 1,
  saturation: 1,
  inversion: 0,
  grayscale: 0,
  rotate: 0,
  flipHorizontal: 1,
  flipVertical: 1,
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".choose")) {
    $file_input.click();
  }
});

const applyFilters = () => {
  $current_image.style.transform = `rotate(${filters.rotate}deg) scale(${filters.flipHorizontal}, ${filters.flipVertical})`;
  $current_image.style.filter = `brightness(${filters.brightness}) grayscale(${filters.grayscale}) invert(${filters.inversion}) saturate(${filters.saturation})`;
};

const saveImage = () => {
  d.querySelector(".save").textContent = "Saving image...";
  const canvas = d.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.height = $current_image.naturalHeight;
  canvas.width = $current_image.naturalWidth;

  context.filter = `brightness(${filters.brightness}) grayscale(${filters.grayscale}) invert(${filters.inversion}) saturate(${filters.saturation})`;
  context.translate(canvas.width / 2, canvas.height / 2);
  if (filters.rotate !== 0) {
    context.rotate((filters.rotate * Math.PI) / 180);
  }
  context.scale(filters.flipHorizontal, filters.flipVertical);
  context.drawImage(
    $current_image,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  /* Just for testing */
  /* d.body.appendChild(canvas); */
  const link = d.createElement("a");
  link.download = "image/jpg";
  link.href = canvas.toDataURL();
  link.click();
  d.querySelector(".save").textContent = "Save";
};

d.addEventListener("input", (e) => {
  if (e.target === $file_input) {
    let file = $file_input.files[0];
    $current_image.src = URL.createObjectURL(file);
    d.querySelector(".container").classList.remove("disable");
  }
  if (e.target === $filter_intensity) {
    $filter_porcentage.textContent = `${$filter_intensity.value}%`;
    let currentFilter = d
      .querySelector(".btn.active")
      .textContent.toLowerCase();
    filters = {
      ...filters,
      [currentFilter]: parseInt($filter_intensity.value),
    };
    applyFilters();
  }
});

$filter_options.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (el.textContent === "Grayscale" || el.textContent === "Inversion") {
      $filter_intensity.max = "100";
      $filter_intensity.value = filters[el.textContent.toLowerCase()];
      $filter_porcentage.textContent = `${
        filters[el.textContent.toLowerCase()]
      }%`;
      d.querySelector(".btn.active").classList.remove("active");
      el.classList.add("active");
      $filter_name.textContent = el.textContent;
    } else {
      $filter_intensity.value = filters[el.textContent.toLowerCase()];
      $filter_porcentage.textContent = `${
        filters[el.textContent.toLowerCase()]
      }%`;
      d.querySelector(".btn.active").classList.remove("active");
      el.classList.add("active");
      $filter_name.textContent = el.textContent;
    }
  });
});

$rotate_buttons.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (el.dataset.right === "right") {
      let r = filters.rotate + 90;
      r > 360 ? (r = 90) : r;
      filters = {
        ...filters,
        rotate: r,
      };
    } else if (el.dataset.left === "left") {
      let r = filters.rotate - 90;
      r < -360 ? (r = -90) : r;
      filters = {
        ...filters,
        rotate: r,
      };
    } else if (el.dataset.vertical === "vertical") {
      filters = {
        ...filters,
        flipVertical: filters.flipVertical === 1 ? -1 : 1,
      };
    } else if (el.dataset.horizontal === "horizontal") {
      filters = {
        ...filters,
        flipHorizontal: filters.flipHorizontal === 1 ? -1 : 1,
      };
    }
    applyFilters();
  });
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".reset")) {
    filters = {
      brightness: 1,
      saturation: 1,
      inversion: 0,
      grayscale: 0,
      rotate: 0,
      flipHorizontal: 1,
      flipVertical: 1,
    };
    applyFilters();
    $filter_options[0].click();
  }
  if (e.target.matches(".save")) {
    saveImage();
  }
});
