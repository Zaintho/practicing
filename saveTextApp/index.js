const d = document,
  $saveOptions = d.getElementById("selectionType"),
  $textArea = d.querySelector("textarea"),
  fragment = d.createDocumentFragment(),
  $saveButton = d.querySelector(".save"),
  $fileName = d.getElementById("name"),
  options = [
    {
      value: ".txt",
      type: "text/plain",
      text: "Text File",
    },
    {
      value: ".js",
      type: "application/javascript",
      text: "JS File",
    },

    {
      value: ".html",
      type: "text/html",
      text: "HTML File",
    },
    {
      value: ".svg",
      type: "image/svg+xml",
      text: "SVG File",
    },
    {
      value: ".doc",
      type: "	application/msword",
      text: "Doc File",
    },
    {
      value: ".ppt",
      type: "application/vnd.ms-powerpoint",
      text: "PPT File",
    },
  ];

const fillOptions = () => {
  options.map((el) => {
    let { value, text } = el;
    const $option = d.createElement("option");
    $option.value = value;
    $option.innerText = `${text} (${value})`;
    fragment.appendChild($option);
  });
  $saveOptions.appendChild(fragment);
};
const changeTextButton = (e) => {
  options.map((el) => {
    if (el.value === e.target.value) {
      $saveButton.querySelector("p").innerText = `Save as ${el.text}`;
    }
  });
};

d.addEventListener("DOMContentLoaded", (e) => {
  fillOptions();
});
d.addEventListener("change", (e) => {
  if (e.target === $saveOptions) {
    changeTextButton(e);
  }
});
d.addEventListener("click", (e) => {
  if (e.target.matches(".save") || e.target.matches(".save *")) {
    options.map((el) => {
      if (el.value === $saveOptions.value) {
        const blob = new Blob([$textArea.value], { type: el.type });
        const fileURL = URL.createObjectURL(blob);
        const link = d.createElement("a");
        link.download = $fileName.value;
        link.href = fileURL;
        link.click();
        console.log($saveOptions.options[$saveOptions.selectedIndex].text);
      }
    });
  }
});
