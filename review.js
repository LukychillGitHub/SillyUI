const reviewBox = document.getElementById("reviewBox");
const backBtn = document.getElementById("backBtn");
const reviewInput = document.getElementById("reviewInput");
const sendBtn = document.getElementById("sendBtn");

const systemMessages = [
  "This UI is so silly, I think I fell in love.",
  "I didn’t know I needed this... until now.",
  "I gave it 5 stars, but it deserved a banana.",
  "Thought it was a joke. Turns out it’s a lifestyle.",
  "I want to live inside this interface.",
  "Who designed this? I want to give them a hug.",
  "Loading reviews... please wait while we summon ducks.",
  "Analyzing silliness levels... result: off the charts.",
  "This UI was definitely made by a raccoon on caffeine.",
  "I tried to leave a review but the button ran away.",
  "A toaster could’ve made this better… but it didn’t.",
  "10/10, would confuse my grandma again.",
  "This is the UI equivalent of a rubber chicken.",
  "I clicked something and now I'm legally married to this app.",
  "Reviews are being teleported from another universe.",
  "This feels like a fever dream, but I’m into it.",
  "I'm not sure if I'm being pranked or enlightened.",
  "Every second here lowers my IQ in the best way.",
  "If this was a sandwich, it’d be made of glitter.",
  "Best interface ever. I’ve already told my plants about it."
];

const userMessages = [
  "Uhhh... is this thing on?",
  "I came here to review but got distracted by a spinning wheel.",
  "Can I rate this with potato emojis?",
  "This UI made me question reality. 5 stars!",
  "I tried to leave but the button winked at me.",
  "This is the weirdest thing I’ve ever loved.",
  "I wasn’t ready for this level of chaos.",
  "Does this review section have a personality?",
  "Why is this so fun? Send help.",
  "I pressed send and now I feel powerful."
];

// Función para escribir mensaje letra por letra
function typeMessage(text, className, delay = 0) {
  return new Promise(resolve => {
    const msg = document.createElement("div");
    msg.className = `message ${className}`;
    reviewBox.appendChild(msg);
    reviewBox.scrollTop = reviewBox.scrollHeight;

    let i = 0;
    const interval = setInterval(() => {
      msg.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, 40);
  });
}

async function autoWriteReviews() {
  for (let i = 0; i < 3; i++) {
    const randomText = systemMessages[Math.floor(Math.random() * systemMessages.length)];
    await typeMessage(randomText, "");
    await new Promise(r => setTimeout(r, 600));
  }

  const userText = userMessages[Math.floor(Math.random() * userMessages.length)];
  await typeMessage(userText, "user", 500);

  // ¡Ahora habilitamos el input!
  reviewInput.disabled = false;
  sendBtn.disabled = false;
}

// Al enviar una review manual
sendBtn.addEventListener("click", async () => {
  const text = reviewInput.value.trim();
  if (!text) return;

  reviewInput.value = "";
  reviewInput.disabled = true;
  sendBtn.disabled = true;

  await typeMessage(text, "user");

  reviewInput.disabled = false;
  sendBtn.disabled = false;
  reviewInput.focus();
});

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

window.addEventListener("load", autoWriteReviews);



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
