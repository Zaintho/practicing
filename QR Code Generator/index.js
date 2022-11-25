const d = document,
  $btn_create_qr = d.querySelector("button"),
  $input_text = d.querySelector("input"),
  API_URL = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=",
  $img = d.querySelector("img"),
  $container_a = d.querySelector(".a-container");

const createQR = async (text) => {
  try {
    $input_text.value = "";
    $btn_create_qr.textContent = "Creating. . .";
    let res = await fetch(`${API_URL}${text}`);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    $img.src = res.url;
    $container_a.classList.add("active");
  } catch (err) {
    console.log(err);
  } finally {
    $btn_create_qr.textContent = "Generate QR Code";
  }
};

const dowloadImage = (url) => {
  try {
    $btn_create_qr.textContent = "Downloading";
    let $canvas = d.createElement("canvas"),
      context = $canvas.getContext("2d"),
      $link = d.createElement("a"),
      $image = d.querySelector("img");
    let { naturalWidth, naturalHeight } = $image;
    $canvas.width = naturalWidth;
    $canvas.height = naturalHeight;
    context.drawImage($image, 0, 0, $canvas.width, $canvas.height);
    $link.download = new Date().getTime();
    $link.href = $canvas.toDataURL("image/jpeg", 1);
    $link.click();
  } catch (error) {
  } finally {
    $container_a.classList.remove("active");
    $btn_create_qr.textContent = "Generate QR Code";
  }
};

d.addEventListener("click", (e) => {
  if (e.target === $btn_create_qr) {
    if (!$input_text.value) return;
    createQR($input_text.value);
  }
  if (e.target === $img) {
    let url = $img.src;
    dowloadImage(url);
  }
});
