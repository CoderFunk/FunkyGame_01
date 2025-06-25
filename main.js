const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Suelo
const groundHeight = 100;

// Personaje
const player = {
  x: 100,
  y: canvas.height - groundHeight - 100, // en el suelo
  width: 40,
  height: 100,
  color: "red",
  velocityX: 0,
  velocityY: 0,
  speed: 5,
  jumpForce: 15,
  isOnGround: false,
  jumpCount: 0
};

// Gravedad
const gravity = 0.8;
const maxJump = 2;

// Plataforma (suelo)
const ground = {
  x: 0,
  y: canvas.height - groundHeight,
  width: canvas.width,
  height: groundHeight,
  color: "#8B4513" // color café
};

// Teclas presionadas
const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;

  // Salto
  if (e.code === "Space" && player.jumpCount < maxJump) {
    player.velocityY = -player.jumpForce;
    player.jumpCount++;
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

function update() {
  // Movimiento horizontal
  player.velocityX = 0;
  if (keys["ArrowLeft"]) player.velocityX = -player.speed;
  if (keys["ArrowRight"]) player.velocityX = player.speed;

  // Aplicar gravedad
  player.velocityY += gravity;

  // Actualizar posición
  player.x += player.velocityX;
  player.y += player.velocityY;

  // Colisión con el suelo
  if (player.y + player.height > ground.y) {
    player.y = ground.y - player.height;
    player.velocityY = 0;
    player.isOnGround = true;
    player.jumpCount = 0;
  } else {
    player.isOnGround = false;
  }
}

function draw() {
  // Fondo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Suelo
  ctx.fillStyle = ground.color;
  ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

  // Personaje
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
