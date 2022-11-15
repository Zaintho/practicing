const d = document,
  $hours = d.querySelector(".day-time-hours"),
  $minutes = d.querySelector(".day-time-minutes"),
  $seconds = d.querySelector(".day-time-seconds"),
  $meridian = d.querySelector(".day-time-meridian"),
  $set_hours = d.querySelector("#set-alarm-hours"),
  $set_minutes = d.querySelector("#set-alarm-minutes"),
  $set_meridian = d.querySelector("#set-alarm-meridian"),
  $button = d.querySelector("button"),
  $audio_alarm = d.querySelector("audio");

let alarm = {},
  isAlarm = false,
  on = false,
  $sound_alarm;

const compairHours = (h, m, s, me) => {
  if (
    Math.abs(h - 12) === alarm.h &&
    m === alarm.m &&
    me === alarm.me &&
    s === 0
  ) {
    $audio_alarm.play();
  }
};

const formatHour = (h, m, s) => {
  $hours.textContent =
    h < 10
      ? `0${h}:`
      : h < 12
      ? `${h}:`
      : h < 22
      ? `0${h - 12}:`
      : `${h - 12}:`;
  $minutes.textContent = m < 10 ? `0${m}:` : `${m}:`;
  $seconds.textContent = s < 10 ? `0${s}:` : `${s}`;
  $meridian.textContent = h < 12 ? "A.M." : "P.M.";
  if (isAlarm) {
    compairHours(h, m, s, $meridian.textContent);
  }
};

const updateClock = () => {
  setInterval(() => {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();
    formatHour(hour, minute, seconds);
  }, 1000);
};

const fill_options = () => {
  const fill_hour = () => {
    for (let i = 0; i < 13; i++) {
      let option = d.createElement("option");
      option.value = i;
      if (i < 10) {
        option.textContent = `0${i}`;
      } else {
        option.textContent = i;
      }
      $set_hours.appendChild(option);
    }
  };
  const fill_minute = () => {
    for (let i = 0; i < 60; i++) {
      let option = d.createElement("option");
      option.value = i;
      if (i < 10) {
        option.textContent = `0${i}`;
      } else {
        option.textContent = i;
      }
      $set_minutes.appendChild(option);
    }
  };
  const fill_meridian = () => {
    let am = "<option value=A.M.>AM</option>",
      pm = "<option value=P.M.>PM</option>";
    $set_meridian.insertAdjacentHTML("beforeend", am);
    $set_meridian.insertAdjacentHTML("beforeend", pm);
  };
  fill_hour();
  fill_minute();
  fill_meridian();
};

d.addEventListener("DOMContentLoaded", (e) => {
  updateClock();
  fill_options();
});

d.addEventListener("click", (e) => {
  if (e.target === $button) {
    if (!isAlarm) {
      if (!$set_hours.value || !$set_minutes.value || !$set_meridian)
        return window.alert("Some data is empty");
      isAlarm = true;
      alarm.h = parseInt($set_hours.value);
      alarm.m = parseInt($set_minutes.value);
      alarm.me = $set_meridian.value;
      $button.classList.add("disabled");
      $button.textContent = "Alarm Programed";
    } else {
      isAlarm = false;
      alarm.h = $set_hours.value;
      alarm.m = $set_minutes.value;
      alarm.me = $set_meridian.value;
      $button.classList.remove("disabled");
      $button.textContent = "Set Alarm";
      $audio_alarm.pause();
    }
  }
});

d.addEventListener("mouseover", (e) => {
  if (e.target === $button) {
    if (!isAlarm) return;
    $button.textContent = "Do you want to set off alarm?";
  }
});
$button.addEventListener("mouseleave", (e) => {
  if (!isAlarm) return;
  $button.textContent = "Alarm Programmed";
});
