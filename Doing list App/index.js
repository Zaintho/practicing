const d = document,
  $input_text = d.querySelector("input"),
  $tasks_container = d.querySelector(".container-task-to-complete"),
  $template_task = d.querySelector("template").content,
  $li_buttons = d.querySelectorAll(".list-buttons li");

let idx = null,
  isEditing = false,
  showTask = {
    all: true,
    pending: false,
    completed: false,
  },
  $input_tasks = null;

let array_task = [];

const add_event_inputs = () =>
  $input_tasks.forEach((el, pos) =>
    el.addEventListener("click", (e) => {
      if (array_task[pos].pending === true) {
        array_task[pos].pending = false;
        array_task[pos].completed = true;
      } else {
        array_task[pos].pending = true;
        array_task[pos].completed = false;
      }
      localStorage.setItem("tasks", JSON.stringify(array_task));
    })
  );

const fill_mesage = () => {
  let span_text = d.createElement("span");
  span_text.classList.add("task-container");
  span_text.textContent = "You don't have any tasks here";
  $tasks_container.appendChild(span_text);
};

const fill_taks = () => {
  $tasks_container
    .querySelectorAll(".task-container")
    .forEach((element) => $tasks_container.removeChild(element));
  if (array_task.length === 0) {
    fill_mesage();
    return;
  } else {
    if (showTask.all) {
      array_task.forEach((task, id) => {
        $template_task.querySelector(".tasks label").textContent = task.task;
        $template_task.querySelector(".tasks label").htmlFor = id;
        $template_task.querySelector(".tasks input").id = id;
        task.completed === true
          ? ($template_task.querySelector("input").checked = true)
          : ($template_task.querySelector("input").checked = false);
        const $clone = d.importNode($template_task, true);
        $tasks_container.appendChild($clone);
      });
    } else if (showTask.pending) {
      array_task.forEach((task, id) => {
        if (!task.pending) return;
        $template_task.querySelector(".tasks label").textContent = task.task;
        $template_task.querySelector(".tasks label").htmlFor = id;
        $template_task.querySelector(".tasks input").id = id;
        task.completed === true
          ? ($template_task.querySelector("input").checked = true)
          : ($template_task.querySelector("input").checked = false);
        const $clone = d.importNode($template_task, true);
        $tasks_container.appendChild($clone);
      });
    } else if (showTask.completed) {
      array_task.forEach((task, id) => {
        if (!task.completed) return;
        $template_task.querySelector(".tasks label").textContent = task.task;
        $template_task.querySelector(".tasks label").htmlFor = id;
        $template_task.querySelector(".tasks input").id = id;
        task.completed === true
          ? ($template_task.querySelector("input").checked = true)
          : ($template_task.querySelector("input").checked = false);
        const $clone = d.importNode($template_task, true);
        $tasks_container.appendChild($clone);
      });
    }
  }
  if ($tasks_container.children.length === 1) fill_mesage();
  $input_tasks = d.querySelectorAll("input[type='checkbox']");
  add_event_inputs();
};

const tasking_add = (task) => {
  /* location.reload(); */
  array_task.push(task);
  localStorage.setItem("tasks", JSON.stringify(array_task));
  fill_taks();
};

const show_menu = (condition) => {
  const menus = d.querySelectorAll(".container-menu");
  menus.forEach((el) => {
    el === menus[idx] && condition
      ? el.classList.add("active")
      : el.classList.remove("active");
  });
};

const editTask = () => {
  array_task[idx].task = $input_text.value;
  $input_text.value = "";
  localStorage.setItem("tasks", JSON.stringify(array_task));
  isEditing = false;
  idx = null;
  fill_taks();
};

const deleteTask = () => {
  let conf = window.confirm("Do you really want to delete this task?");
  if (!conf) return;
  array_task.splice(idx, 1);
  localStorage.setItem("tasks", JSON.stringify(array_task));
  fill_taks();
};

d.addEventListener("keyup", (e) => {
  if (e.target === $input_text && e.key === "Enter" && !isEditing) {
    tasking_add({ task: $input_text.value, pending: true, completed: false });
    $input_text.value = "";
    fill_taks();
  } else if (isEditing && e.key === "Enter") {
    editTask();
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    localStorage.removeItem("tasks");
    array_task.splice(0, array_task.length);
    fill_taks();
  }
  if (e.target.matches(".btn-menu-content")) {
    let btn_menus = d.querySelectorAll(".btn-menu-content");
    btn_menus.forEach((el, index) => {
      if (e.target === el) {
        idx = index;
        show_menu(true);
      }
    });
  } else {
    show_menu(false);
  }
  if (
    e.target.matches(".container-menu") ||
    e.target.matches(".container-menu *")
  ) {
    if (e.target.textContent === "Edit") {
      isEditing = true;
      $input_text.value = d
        .querySelectorAll(".task-container")
        [idx].querySelector("label").textContent;
    } else {
      isEditing = false;
      deleteTask();
    }
  }
});

$li_buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (!e.target.matches(".active")) {
      $li_buttons.forEach((buttons) =>
        buttons === e.target
          ? buttons.classList.add("active")
          : buttons.classList.remove("active")
      );
    }
    if (e.target.textContent === "All") {
      for (const key in showTask) {
        key === "all" ? (showTask[key] = true) : (showTask[key] = false);
      }
    } else if (e.target.textContent === "Pending") {
      for (const key in showTask) {
        key === "pending" ? (showTask[key] = true) : (showTask[key] = false);
      }
    } else if (e.target.textContent === "Completed") {
      for (const key in showTask) {
        key === "completed" ? (showTask[key] = true) : (showTask[key] = false);
      }
    }
    fill_taks();
  });
});

d.addEventListener("DOMContentLoaded", (e) => {
  let arr = JSON.parse(localStorage.getItem("tasks")) || [];
  arr.length !== 0 ? (array_task = [...arr]) : "";
  fill_taks();
});
