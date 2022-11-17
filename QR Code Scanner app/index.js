const d = document,
  $input_file = d.querySelector("input[type='file']"),
  $container_zone_cloud = d.querySelector(".container-cloudupload"),
  $qr_container_image = d.querySelector(".image"),
  $container_qr_content = d.querySelector(".container-content-qr"),
  $buttons = d.querySelectorAll("button"),
  $msg_content_QR = d.querySelector(".content-qr p"),
  $msg_error = d.querySelector(".container-cloudupload div p");

d.addEventListener("click", (e) => {
  if (
    e.target.matches(".div-upload-image") ||
    e.target.matches(".div-upload-image *") ||
    e.target.matches(".image") ||
    e.target.matches(".image *")
  ) {
    $input_file.click();
  }
  if (e.target === $buttons[0]) {
    $container_zone_cloud.classList.remove("disabled");
    $container_qr_content.classList.remove("active");
    $qr_container_image.removeChild($qr_container_image.firstElementChild);
  }
  if (e.target === $buttons[1]) {
    navigator.clipboard.writeText($msg_content_QR.textContent);
  }
});

const showPanelQR = (data) => {
  let image_qr = d.createElement("img"),
    url = URL.createObjectURL(data.get("file"));

  $msg_content_QR.textContent = data.get("contentQR");
  image_qr.src = url;
  image_qr.alt = "image qr";

  $qr_container_image.appendChild(image_qr);
  $container_zone_cloud.classList.add("disabled");
  $container_qr_content.classList.add("active");
};

const fetchRequest = (data) => {
  let apiURL = "http://api.qrserver.com/v1/read-qr-code/";
  $msg_error.textContent = "Reading Qr ...";

  fetch(apiURL, {
    method: "POST",
    body: data,
  })
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({ status: res.status, statusText: res.statusText })
    )
    .then((contentQR) => {
      /* contentQR[0].symbol[0]; */
      if (!contentQR[0].symbol[0].error) {
        data.append("contentQR", contentQR[0].symbol[0].data);
        $msg_error.textContent = "Upload QR code to scan";
        showPanelQR(data);
      } else {
        $msg_error.style.color = "red";
        $msg_error.textContent =
          "Error reading the qr. Please, upload a correct QR!";
        setTimeout(() => {
          $msg_error.style.color = "black";
          $msg_error.textContent = "Upload QR code to scan";
        }, 2000);
      }
    })
    .catch((err) => console.log(err));
};

d.addEventListener("input", (e) => {
  if (e.target === $input_file) {
    if (!$input_file.files[0]) return;
    let file = $input_file.files[0],
      formData = new FormData();

    formData.append("file", file);

    fetchRequest(formData);
  }
});
