const d = document,
  $main_video = d.querySelector("video"),
  $play_btn = d.querySelector(".play-pause-video .play"),
  $pause_btn = d.querySelector(".play-pause-video .pause"),
  $progress_bar = d.querySelector(".progress-bar"),
  $volume_icons = d.querySelectorAll(".left svg"),
  $progress_time = d.querySelector(".progress-area span"),
  $volume_video = d.querySelector("input"),
  $speed_options = d.querySelectorAll(".speed-options li"),
  $video_time = d.querySelector(".video-timer"),
  $videoTimeLine = d.querySelector(".video-timeline");

let currentVolume = $volume_video.value,
  mousedown = false,
  timerControls;

const hideControls = () => {
  if ($main_video.paused) return;
  timerControls = setTimeout(() => {
    d.querySelector(".container").classList.remove("show-controls");
  }, 3000);
};

hideControls();

const currentTimeVideo = (current, duration) => {
  let seconds,
    minutes = null;
  if (Math.trunc(current / 60) < 1) {
    minutes = "00";
    seconds =
      current % 60 < 10
        ? `0${Math.trunc(current % 60)}`
        : `${Math.trunc(current % 60)}`;
  } else {
    minutes =
      current / 60 < 10
        ? `0${Math.trunc(current / 60)}`
        : `${Math.trunc(current / 60)}`;
    seconds =
      current % 60 < 10
        ? `0${Math.trunc(current % 60)}`
        : `${Math.trunc(current % 60)}`;
  }
  return minutes + ":" + seconds;
};
window.addEventListener("load", () => {
  setTimeout(() => {
    let duration, mins, secs;
    duration = $main_video.duration;
    secs =
      duration % 60 < 10
        ? `0${Math.trunc(duration % 60)}`
        : `${Math.trunc(duration % 60)}`;
    mins =
      duration / 60 < 10
        ? `0${Math.trunc(duration / 60)}`
        : `${Math.trunc(duration / 60)}`;

    $video_time.querySelector(
      ".video-duration"
    ).textContent = `${mins}:${secs}`;
  }, 100);
});

/* $main_video.addEventListener("loadeddata", (e) => {
  let { currentTime, duration } = e.target;
  let durationVideo = currentTimeVideo(currentTime, duration);
  console.log(durationVideo);
}); */
d.addEventListener("click", (e) => {
  if (
    e.target.matches(".play-pause-video") ||
    e.target.matches(".play-pause-video *")
  ) {
    if ($main_video.paused) {
      $main_video.play();
      $play_btn.classList.add("no-active");
      $pause_btn.classList.remove("no-active");
    } else {
      $main_video.pause();
      $pause_btn.classList.add("no-active");
      $play_btn.classList.remove("no-active");
    }
  }
  if (
    e.target.matches(".backward-video") ||
    e.target.matches(".backward-video *")
  ) {
    $main_video.currentTime -= 5;
  }
  if (
    e.target.matches(".forward-video") ||
    e.target.matches(".forward-video *")
  ) {
    $main_video.currentTime += 5;
  }
  if (
    e.target.matches(".volumen-up-down") ||
    e.target.matches(".volumen-up-down *")
  ) {
    $volume_icons.forEach((el) => el.classList.toggle("no-active"));
    if ($volume_icons[0].classList.contains("no-active")) {
      $volume_video.value = 0;
      $main_video.volume = $volume_video.value / 100;
    } else {
      $volume_video.value = currentVolume;
      $main_video.volume = $volume_video.value / 100;
    }
  }
  if (
    e.target.matches(".playback-speed") ||
    e.target.matches(".playback-speed *")
  ) {
    d.querySelector(".speed-options").classList.toggle("show");
  } else if (!e.target.matches(".speed-options li")) {
    d.querySelector(".speed-options").classList.remove("show");
  }
  $speed_options.forEach((el) => {
    if (e.target === el) {
      $speed_options.forEach((el) =>
        el.classList.contains("active") ? el.classList.remove("active") : ""
      );
      el.classList.add("active");
      $main_video.playbackRate = el.dataset.speed;
    }
  });
  if (e.target.matches(".mini-video") || e.target.matches(".mini-video *")) {
    /* d.querySelector(".minimize").classList.toggle("no-active");
    d.querySelector(".restore").classList.toggle("no-active");
    d.querySelector(".container").classList.toggle("active"); */
    $main_video.requestPictureInPicture();
  }
  if (
    e.target.matches(".fullScreen-video") ||
    e.target.matches(".fullScreen-video *")
  ) {
    /* $main_video.requestFullscreen(); */
    d.querySelector(".container").classList.toggle("active");
    if (d.fullscreenElement) {
      d.querySelector(".full-screen").classList.toggle("no-active");
      d.querySelector(".restore-size").classList.toggle("no-active");
      return d.exitFullscreen();
    }
    d.querySelector(".full-screen").classList.toggle("no-active");
    d.querySelector(".restore-size").classList.toggle("no-active");
    d.querySelector(".container").requestFullscreen();
  }
  if (e.target === $videoTimeLine) {
    let timeLineWidth = $videoTimeLine.clientWidth;
    $main_video.currentTime =
      (e.offsetX / timeLineWidth) * $main_video.duration;
  }
});
$main_video.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;
  let porcentage = Math.trunc((currentTime * 100) / duration);
  let actualTimeVideo = currentTimeVideo(currentTime, duration);
  $progress_bar.style.width = `${porcentage}%`;
  $progress_time.textContent = actualTimeVideo;
  $progress_time.style.left = `${2 + porcentage}%`;
  $video_time.querySelector(".current-time").textContent = actualTimeVideo;
});
d.addEventListener("input", (e) => {
  if (e.target === $volume_video) {
    currentVolume = $volume_video.value;
    $main_video.volume = $volume_video.value / 100;
    if ($volume_video.value < 1) {
      $volume_icons[0].classList.add("no-active");
      $volume_icons[1].classList.remove("no-active");
    } else {
      $volume_icons[0].classList.remove("no-active");
      $volume_icons[1].classList.add("no-active");
    }
  }
});
const draggableProgressBar = (e) => {
  if (mousedown) {
    let timeLineWidth = $videoTimeLine.clientWidth;
    $progress_bar.style.width = `${e.offsetX}px`;
    $main_video.currentTime =
      (e.offsetX / timeLineWidth) * $main_video.duration;
    let actualTimeVideo = currentTimeVideo(
      $main_video.currentTime,
      $main_video.duration
    );
    $video_time.querySelector(".current-time").textContent = actualTimeVideo;
  }
  return;
};
d.addEventListener("mousedown", (e) => {
  mousedown = true;
  if (e.target === $videoTimeLine) {
    $videoTimeLine.addEventListener("mousemove", draggableProgressBar);
  }
});
d.addEventListener("mouseup", (e) => (mousedown = false));
d.addEventListener("mousemove", (e) => {
  if (e.target.matches(".video-timeline")) {
    let offsetx = e.offsetX;
    $progress_time.style.left = `${offsetx}px`;
    let timeLineWidth = $videoTimeLine.clientWidth;
    let porcentaje = (e.offsetX / timeLineWidth) * $main_video.duration;
    $progress_time.textContent = currentTimeVideo(
      porcentaje,
      $main_video.duration
    );
  }
  if (e.target.matches("video")) {
    clearInterval(timerControls);
    d.querySelector(".container").classList.add("show-controls");
    hideControls();
  }
});
