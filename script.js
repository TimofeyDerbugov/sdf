

// 👉 ВСТАВЬ СВОЮ ССЫЛКУ
const SHEET_URL = "https://opensheet.elk.sh/1OWSVDYSyMHoU1-b3Sfq2LuuOPiaz4oHPnnmpmsoTN3c/Лист1";

let tasks = [
    // {
    //     class: "5А",
    //     title: "Дроб"
    // },
    // {
    //     class: "5A",
    //     title: "Дроби"
    // }
];
let currentClass = "5А";

// Загрузка
fetch(SHEET_URL)
  .then(r => r.json())
  .then(data => {
    tasks = data;
    render();
  })
  .catch(() => alert("Ошибка загрузки таблицы"));

// Меню
function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

function selectClass(cls) {
  currentClass = cls;
  render();
  document.getElementById("menu").classList.remove("active");
}

// Рендер
function render() {
  const active = document.getElementById("activeTasks");
  const past = document.getElementById("pastTasks");

  active.innerHTML = "";
  past.innerHTML = "";

  const today = new Date();
  today.setHours(0,0,0,0);

  const filtered = tasks
    .filter(t => t.class === currentClass)
    .sort((a,b) => new Date(a.date) - new Date(b.date));

  filtered.forEach(task => {
    const d = new Date(task.date);
    d.setHours(0,0,0,0);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${task.image}">
      <div class="card-content">
        <div class="card-title">${task.title}</div>
        <div>${task.description}</div>
        <div>${task.date}</div>
      </div>
    `;

    card.onclick = () => openImage(task.image, task.title);

    d >= today ? active.appendChild(card) : past.appendChild(card);
  });
}

// Картинка
function openImage(src, title) {
  document.getElementById("modalImg").src = src;
  document.getElementById("modal").style.display = "flex";

  const a = document.createElement("a");
  a.href = src;
  a.download = title + ".jpg";
  a.click();
}

function closeModal(e) {
  if (e.target.id === "modal" || e.target.id === "close") {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modalImg").src = "";
  }
}
