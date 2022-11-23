const d = document,
  $btn_created = d.querySelector(".btn-create button"),
  $template_note = d.querySelector(".example-note-to-create").content,
  $btn_create_note = d.querySelector(".container-modal button"),
  $new_title_note = d.querySelector(".container-modal input"),
  $new_description_note = d.querySelector(".container-modal textarea"),
  array_months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Dicember",
  ],
  $wrapper_notes = d.querySelector(".wrapper-notes");

let isANewNote = true,
  id_to_edit = null;

/* console.log($new_description_note, $new_title_note); */
const createANewNote = () => {
  let date = new Date(),
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    id = date.getTime();

  $template_note.querySelector(".title").textContent = $new_title_note.value;
  $template_note.querySelector(".description").textContent =
    $new_description_note.value;
  $template_note.querySelector(
    ".date"
  ).textContent = `${array_months[month]} ${day}, ${year}`;
  $template_note.querySelector(".note-created").id = id;
  $template_note.querySelector(".menu").dataset.id = id;
  let $clone = d.importNode($template_note, true);

  $wrapper_notes.appendChild($clone);
  $new_description_note.value = "";
  $new_title_note.value = "";
  location.hash = "#close";
};
const editANote = () => {
  d.getElementById(`${id_to_edit}`).querySelector(".title").textContent =
    $new_title_note.value;
  d.getElementById(`${id_to_edit}`).querySelector(".description").textContent =
    $new_description_note.value;
  $new_description_note.value = "";
  $new_title_note.value = "";
  location.hash = "#close";
};
d.addEventListener("click", (e) => {
  if (e.target === $btn_created || e.target.matches(".btn-create button *")) {
    isANewNote = true;
    d.querySelector(".container-modal h2").textContent = "Create a new note";
  }
  if (e.target === $btn_create_note) {
    if (!$new_description_note.value || !$new_title_note.value) return;
    isANewNote ? createANewNote() : editANote();
  }
  if (e.target.matches(".menu")) {
    d
      .getElementById(`${e.target.dataset.id}`)
      .querySelector(".edit-delete-menu")
      .classList.contains("active")
      ? d
          .getElementById(`${e.target.dataset.id}`)
          .querySelector(".edit-delete-menu")
          .classList.remove("active")
      : d
          .getElementById(`${e.target.dataset.id}`)
          .querySelector(".edit-delete-menu")
          .classList.add("active");
    id_to_edit = e.target.dataset.id;
    isANewNote = false;
  }
  if (e.target.matches(".btn-edit-note")) {
    d.querySelector(".container-modal h2").textContent = "Edit the note";
  }
  if (e.target.matches(".delete-btn")) {
    let isConfirm = window.confirm("¿Desea eliminar la nota?");
    if (isConfirm) {
      let $nodeToRemove = d.getElementById(`${id_to_edit}`);
      $wrapper_notes.removeChild($nodeToRemove);
    }
  }
  console.log(e.target);
});
