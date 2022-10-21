const d = document,
  $colorSelector = d.getElementById("color-selection"),
  $inputColor = d.querySelector(".fill-svg svg"),
  $inputs_checked = d.querySelectorAll(".colors input[type ='radio']"),
  $canvas = d.querySelector("canvas"),
  context = $canvas.getContext("2d"),
  $range_stroke = d.querySelector("input[type='range']"),
  $figure_inputs = d.querySelectorAll(".figures input[type='radio']"),
  $fill_color = d.querySelector(".figures input[type='checkbox']");

let isDrawing = false,
  selectedTool = "brush",
  selectedColor = "black",
  prevMouseX,
  prevMouseY,
  snapShot;

const setCanvasBackground = () => {
  context.fillStyle = "#fff";
  context.fillRect(0, 0, $canvas.width, $canvas.height);
  context.fillStyle = selectedColor;
};

const changeColor = () => {
  $inputs_checked.forEach((input) =>
    input.checked ? (input.checked = false) : input.checked
  );
  $colorSelector.classList.add("active");
  $inputColor.style.fill = `${$colorSelector.value}`;
  selectedColor = $colorSelector.value;
};
const clickRadio = (e) => {
  selectedColor = e.target.id;
  $colorSelector.classList.contains("active")
    ? $colorSelector.classList.remove("active")
    : "";
  $inputColor.style.fill = `transparent`;
};
const drawSqueare = (e) => {
  if (!$fill_color.checked) {
    return context.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  context.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};
const drawCircle = (e) => {
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  context.beginPath();
  context.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  $fill_color.checked ? context.fill() : context.stroke();
};
const drawTriangle = (e) => {
  context.beginPath();
  context.moveTo(prevMouseX, prevMouseY);
  context.lineTo(e.offsetX, e.offsetY);
  context.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  context.closePath();
  $fill_color.checked ? context.fill() : context.stroke();
};
const draw = (e) => {
  if (!isDrawing) return;
  context.putImageData(snapShot, 0, 0);
  if (selectedTool === "brush" || selectedTool === "eraser") {
    context.strokeStyle =
      selectedTool === "eraser"
        ? (context.strokeStyle = "#fff")
        : selectedColor;
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
  } else if (selectedTool === "square") {
    drawSqueare(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else {
    drawTriangle(e);
  }
};
const startDrawing = (stroke = $range_stroke.value, e) => {
  isDrawing = true;
  context.beginPath();
  context.lineWidth = stroke;
  context.strokeStyle = selectedColor;
  context.fillStyle = selectedColor;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  snapShot = context.getImageData(0, 0, $canvas.width, $canvas.height);
};

$colorSelector.addEventListener("change", changeColor);
$inputs_checked.forEach((input) => input.addEventListener("click", clickRadio));
$canvas.addEventListener("mousemove", draw);
$canvas.addEventListener("mousedown", (e) => {
  startDrawing($range_stroke.value, e);
});
$canvas.addEventListener("mouseup", () => (isDrawing = false));

window.addEventListener("DOMContentLoaded", (e) => {
  $canvas.width = $canvas.offsetWidth;
  $canvas.height = $canvas.offsetHeight;
  window.addEventListener("resize", (e) => {
    $canvas.width = $canvas.offsetWidth;
    $canvas.height = $canvas.offsetHeight;
  });
  setCanvasBackground();
});

$figure_inputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    console.log(input.id);
    selectedTool = input.id;
  });
});
d.addEventListener("click", (e) => {
  if (e.target.matches(".clear") || e.target.matches(".clear *")) {
    context.clearRect(0, 0, $canvas.width, $canvas.height);
    setCanvasBackground();
  }
  if (e.target.matches(".save") || e.target.matches(".save *")) {
    const link = d.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = $canvas.toDataURL();
    link.click();
  }
});
