document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 🚫 Evita que recargue la página automáticamente

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("⚠️ Por favor completá todos los campos.");
      return;
    }

    // 🔥 Acá simularías el envío del login
    console.log("Login enviado:");
    console.log("Usuario:", username);
    console.log("Contraseña:", password);

    // 🔥 Podrías mostrar un spinner, redirigir, etc.
    alert(`¡Welcome, ${username}, you're a patience master!
Hope you had a good time trying this bad UI
      
From: LukyDev
To: You ^^`);
    
    // Ejemplo de redireccionamiento falso (lo descomentás si querés):
    // window.location.href = "dashboard.html";
  });
});


// LIGHT MODE
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
