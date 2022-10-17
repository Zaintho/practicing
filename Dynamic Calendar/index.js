const d = document,
  date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth(),
  $month_year = d.querySelector(".month-year h2"),
  $days_number = d.querySelector(".dates-number");

const render_calendar = (m = null, y = null) => {
  m === null ? (m = month) : m;
  const monthNames = [
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
      "December",
    ],
    $ul = d.createElement("ul"),
    firstDayOfmont = new Date(y, m, 1).getDay(),
    lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
    /* lastDayOfmonth = new Date(y, m, lastDateOfMonth).getDay(), */
    lastDateOfLastMonth = new Date(y, m, 0).getDate();
  let cont = firstDayOfmont + lastDateOfMonth;

  while (cont % 7 !== 0) {
    cont++;
  }
  cont = cont - (firstDayOfmont + lastDateOfMonth);

  $days_number.innerHTML = "";
  for (let i = firstDayOfmont; i > 0; i--) {
    const $li = d.createElement("li");
    $li.innerText = `${lastDateOfLastMonth + 1 - i}`;
    $li.classList.add("inactive");
    $ul.appendChild($li);
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    let today =
      i === date.getDate() && month === m && year === y ? "active" : "";
    const $li = d.createElement("li");
    $li.innerText = `${i}`;
    today ? $li.classList.add(today) : "";
    $ul.appendChild($li);
  }

  for (let i = 1; i <= cont; i++) {
    const $li = d.createElement("li");
    $li.innerText = `${i}`;
    $li.classList.add("inactive");
    $ul.appendChild($li);
  }
  /* for (let i = lastDayOfmonth; i < 6; i++) {
    const $li = d.createElement("li");
    $li.innerText = `${i - lastDayOfmonth + 1}`;
    $li.classList.add("inactive");
    $ul.appendChild($li);
  } */
  $days_number.append($ul);

  $month_year.textContent = `${monthNames[m]} ${y}`;
};
((d) => {
  const $icons = d.querySelectorAll("svg");
  let m = month,
    y = year;

  $icons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      if (e.target.matches("svg.prev")) {
        m--;
        if (m < 0) {
          y--;
          m = 11;
        }
        render_calendar(m, y);
      } else {
        m++;
        if (m > 11) {
          y++;
          m = 0;
        }
        render_calendar(m, y);
      }
    });
  });
})(d);

d.addEventListener("DOMContentLoaded", (e) => {
  render_calendar(month, year);
});
