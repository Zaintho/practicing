const d = document,
  $input_file = d.querySelector("input[type='file']"),
  $panel_upload_image = d.querySelector(".wrapper"),
  $panel_imagen_editor = d.querySelector(".editing-image-wrapper"),
  $image_for_edit = d.querySelector(".editing-image-wrapper > img"),
  $inputs_text = d.querySelectorAll("input[type='number']"),
  $save_image_btn = d.querySelector("button");

let ogImageRatio,
  aspectRatio = false,
  reduceQuality = 1;

const download_image = () => {
  $save_image_btn.textContent = "Saving image ...";
  const canvas = d.createElement("canvas");
  const context = canvas.getContext("2d");
  let widthImage, heightImage;
  $inputs_text.forEach((button) =>
    button.id === "width-image"
      ? (widthImage = button.value)
      : (heightImage = button.value)
  );
  canvas.width = widthImage;
  canvas.height = heightImage;
  context.drawImage($image_for_edit, 0, 0, canvas.width, canvas.height);
  const link = d.createElement("a");
  link.href = canvas.toDataURL("image/jpeg", reduceQuality);
  link.download = new Date().getTime();
  link.click();
  $save_image_btn.textContent = "Download Image";
};

d.addEventListener("click", (e) => {
  if (
    e.target.matches(".upload-image-space") ||
    e.target.matches(".upload-image-space *")
  ) {
    $input_file.click();
  }
  if (e.target.matches(".btn-save-image")) {
    download_image();
  }
  if (e.target.matches("img")) {
    $input_file.click();
  }
});

const show_hide_panels = (url) => {
  $image_for_edit.src = url;
  $panel_upload_image.classList.add("hide");
  $panel_imagen_editor.classList.remove("hide");
  setTimeout(() => {
    $panel_imagen_editor.classList.add("active");
  }, 200);
  let { naturalWidth, naturalHeight } = $image_for_edit;
  ogImageRatio = naturalWidth / naturalHeight;
  $inputs_text.forEach((button) =>
    button.id === "width-image"
      ? (button.value = naturalWidth)
      : (button.value = naturalHeight)
  );
};

d.addEventListener("input", (e) => {
  if (e.target === $input_file) {
    let file = e.target.files[0];
    if (!file) return;
    const $url_image = URL.createObjectURL(file);
    show_hide_panels($url_image);
  }
  if (e.target.id === "aspect-ratio") {
    e.target.checked ? (aspectRatio = true) : (aspectRatio = false);
  }
  if (e.target.id === "reduce-quality") {
    e.target.checked ? (reduceQuality = 1) : (reduceQuality = 0.7);
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  let confirm = window.confirm("¿Do you want to change image?");
  if (!confirm) return;
  $panel_imagen_editor.classList.add("hide");
  $panel_imagen_editor.classList.remove("active");
  $panel_upload_image.classList.remove("hide");
});

d.addEventListener("keyup", (e) => {
  if (!aspectRatio) return;
  if (e.target.id === "width-image") {
    $inputs_text[1].value = Math.round($inputs_text[0].value / ogImageRatio);
    return;
  } else if (e.target.id === "height-image") {
    $inputs_text[0].value = Math.round($inputs_text[1].value * ogImageRatio);
    return;
  }
});
