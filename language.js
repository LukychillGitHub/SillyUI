const wheel = document.getElementById("wheel");
const backBtn = document.getElementById("backBtn");

const langs = [
  { name: "English", angle: 0, code: "en" },
  { name: "Español", angle: 72, code: "es" },
  { name: "Français", angle: 144, code: "fr" },
  { name: "Deutsch", angle: 216, code: "de" },
  { name: "Italiano", angle: 288, code: "it" }
];

let currentRotation = 0;

function spinWheel() {
  const extraSpins = 360 * 5;
  const randomIndex = Math.floor(Math.random() * langs.length);
  const selected = langs[randomIndex];
  const targetRotation = extraSpins + (360 - selected.angle);
  currentRotation += targetRotation;

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    applyLanguage(selected.code);
  }, 4000);
}

function applyLanguage(langCode) {
  const translations = {
    en: {
      title: "Silly UI",
      back: "🏠 Back",
      selected: "You selected: English",
      history: "April Fools' Day is believed to have originated in the 16th century when France switched from the Julian to the Gregorian calendar. Those who didn’t get the news and continued celebrating New Year’s on April 1st became the butt of jokes and hoaxes. Over time, this evolved into a tradition of playing harmless pranks on this day in many countries."
    },
    es: {
      title: "Interfaz Tonta",
      back: "🏠 Volver",
      selected: "Has seleccionado: Español",
      history: "El Día de los Inocentes se cree que se originó en el siglo XVI, cuando Francia cambió del calendario juliano al gregoriano. Aquellos que no se enteraron y siguieron celebrando el Año Nuevo el 1 de abril se convirtieron en el blanco de bromas. Con el tiempo, esta costumbre se convirtió en una tradición de hacer bromas inofensivas en varios países."
    },
    fr: {
      title: "Interface Idiote",
      back: "🏠 Retour",
      selected: "Vous avez sélectionné : Français",
      history: "Le poisson d’avril remonte au XVIe siècle lorsque la France est passée du calendrier julien au calendrier grégorien. Ceux qui n’étaient pas au courant et continuaient de célébrer le Nouvel An le 1er avril devenaient la cible de plaisanteries. Cette tradition s’est répandue et est devenue une journée de farces dans de nombreux pays."
    },
    de: {
      title: "Dumme UI",
      back: "🏠 Zurück",
      selected: "Du hast gewählt: Deutsch",
      history: "Der 1. April stammt vermutlich aus dem 16. Jahrhundert, als Frankreich vom julianischen zum gregorianischen Kalender wechselte. Wer davon nichts wusste und Neujahr am 1. April feierte, wurde Ziel von Scherzen. Diese Tradition verbreitete sich und wurde zum Tag der harmlosen Streiche."
    },
    it: {
      title: "Interfaccia Sciocca",
      back: "🏠 Indietro",
      selected: "Hai selezionato: Italiano",
      history: "Il Pesce d'aprile si pensa abbia avuto origine nel XVI secolo, quando la Francia passò dal calendario giuliano a quello gregoriano. Chi non ne era a conoscenza e continuava a festeggiare il Capodanno il 1° aprile diventava bersaglio di scherzi. Questa tradizione si è diffusa come giorno di burle innocue."
    }
  };

  const t = translations[langCode];
  document.getElementById("title").textContent = t.title;
  backBtn.textContent = t.back;

  const resultDiv = document.getElementById("result");
  const historyDiv = document.getElementById("history");

  resultDiv.textContent = t.selected;
  historyDiv.textContent = t.history;

  // Animaciones suaves de aparición
  resultDiv.classList.add("visible");
  historyDiv.classList.add("visible");
}

// Botón back
backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Spin automático al cargar
window.addEventListener("load", spinWheel);


const darkBtn = document.getElementById("darkModeBtn");
const lightBtn = document.getElementById("lightModeBtn");
const lamp = document.getElementById("lamp");
const string = document.getElementById("string");
const stone = document.getElementById("stone");
const blackout = document.getElementById("blackout");
const body = document.body;
const breakSound = document.getElementById("breakSound"); // sonido del vidrio

let isLampBroken = false;

// Mostrar escena
darkBtn.addEventListener("click", () => {
  isLampBroken = false;

  lamp.style.top = "-150px";
  string.style.top = "-100px";

  stone.style.left = "auto";
  stone.style.top = "auto";
  stone.style.right = "30px";
  stone.style.bottom = "30px";

  lamp.style.display = "block";
  string.style.display = "block";
  stone.style.display = "block";
  blackout.style.display = "none";
  lightBtn.style.display = "none";
  body.classList.add("lamp-visible");

  setTimeout(() => {
    lamp.style.top = "50px";
    string.style.top = "0px";
  }, 100);
});

// Drag de la piedra
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

stone.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - stone.getBoundingClientRect().left;
  offsetY = e.clientY - stone.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    stone.style.left = `${x}px`;
    stone.style.top = `${y}px`;
    stone.style.right = "auto";
    stone.style.bottom = "auto";

    const stoneRect = stone.getBoundingClientRect();
    const lampRect = lamp.getBoundingClientRect();

    if (
      !isLampBroken &&
      stoneRect.right > lampRect.left &&
      stoneRect.left < lampRect.right &&
      stoneRect.bottom > lampRect.top &&
      stoneRect.top < lampRect.bottom
    ) {
      breakLamp();
    }
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Romper la lámpara
function breakLamp() {
  isLampBroken = true;

  breakSound.currentTime = 0.8;
  breakSound.play();

  lamp.style.display = "none";
  string.style.display = "none";
  stone.style.display = "none";
  blackout.style.display = "block";
  lightBtn.style.display = "block";
  body.classList.remove("lamp-visible");
}

// Restaurar luz
lightBtn.addEventListener("click", () => {
  blackout.style.display = "none";
  lightBtn.style.display = "none";
  lamp.style.display = "none";
  string.style.display = "none";
  stone.style.display = "none";
});

const mainContent = document.getElementById('mainContent');
const loginBtn = document.getElementById('loginBtn');
const langBtn = document.getElementById('langBtn');
const reviewBtn = document.getElementById('reviewBtn');

loginBtn.addEventListener('click', () => {
  window.location.href = "login.html";
});

langBtn.addEventListener('click', () => {
  window.location.href = "language.html";
});

reviewBtn.addEventListener('click', () => {
  window.location.href = "review.html";
});
