const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 500;
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
let birdx = 50;
let birdy = SCREEN_HEIGHT / 2;
let birdVelocity = 0;
let gravity = 0.5;

const PIPE_WIDTH = 60;
const PIPE_HEIGHT = 400;
let pipex = SCREEN_WIDTH;
let pipegap = 150;
let pipeheight = randomIntFromRange(100, SCREEN_HEIGHT - pipegap - 100);
let pipespeed = -3;

const GROUND_HEIGHT = 80;
let score = 0;

const birdImg = new Image();
birdImg.src = "bird.png";

const pipeImg = new Image();
pipeImg.src = "pipe.png";

canvas.addEventListener("click", () => {
  birdVelocity = -10;
});

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawPipe() {
  ctx.drawImage(
    pipeImg,
    pipex,
    pipeheight - PIPE_HEIGHT,
    PIPE_WIDTH,
    PIPE_HEIGHT
  );
  ctx.drawImage(pipeImg, pipex, pipeheight + pipegap, PIPE_WIDTH, PIPE_HEIGHT);
}

function drawBird() {
  ctx.drawImage(birdImg, birdx, birdy, BIRD_WIDTH, BIRD_HEIGHT);
}

function drawGround() {
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(0, SCREEN_HEIGHT - GROUND_HEIGHT, SCREEN_WIDTH, GROUND_HEIGHT);
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function checkCollision() {
  if (birdy < 0 || birdy + BIRD_HEIGHT > SCREEN_HEIGHT - GROUND_HEIGHT) {
    return true;
  }

  if (pipex < birdx + BIRD_WIDTH && pipex + PIPE_WIDTH > birdx) {
    if (birdy < pipeheight) {
      return true;
    }

    if (birdy + BIRD_HEIGHT > pipeheight + pipegap) {
      return true;
    }
  }

  return false;
}

function gameLoop() {
  ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  birdVelocity += gravity;
  birdy += birdVelocity;

  pipex += pipespeed;

  if (pipex + PIPE_WIDTH < 0) {
    pipex = SCREEN_WIDTH;
    pipeheight = randomIntFromRange(
      100,
      SCREEN_HEIGHT - pipegap - GROUND_HEIGHT
    );
    score++;
    pipespeed -= 0.5;
    gravity += 0.05;
  }

  if (checkCollision()) {
    resetGame();
  }

  drawBird();
  drawPipe();
  drawGround();
  drawScore();

  requestAnimationFrame(gameLoop);
}

function resetGame() {
  birdy = SCREEN_HEIGHT / 2;
  birdVelocity = 0;
  gravity = 0.5;
  pipex = SCREEN_WIDTH;
  pipespeed = -3;
  score = 0;
}

gameLoop();
