let board;
const boardWidth = 720;
const boardHeight = 241;
let context;

const dinoWidth = 68;
const dinoFullHeight = 74;
const dinoX = 50;
let dino = { x: dinoX, y: boardHeight - dinoFullHeight, width: dinoWidth, height: dinoFullHeight };
let dinoImg;
let isDucking = false;

let cactusArray = [];
const cactus1Width = 26, cactus2Width = 59, cactus3Width = 92;
const cactusHeight = 64;
const cactusX = 700, cactusY = boardHeight - cactusHeight;
let cactus1Img, cactus2Img, cactus3Img;

let birdArray = [];
const birdHeight = 30;
const bird1Width = 40, bird2Width = 40;
let bird1Img, bird2Img;
let birdImgs;
const birdSpeed = -8;
let birdInterval = 9;

let speedX = -8;
let speedY = 0;
const gravity = 0.4;

let runImgs = [], runFrame = 0, runTimer = 0, runInterval = 9;
let dinoRun1Img, dinoRun2Img;
let duckImgs = [], duckFrame = 0, duckTimer = 0, duckInterval = 10;
let dinoDuck1Img, dinoDuck2Img;

let groundImg;
let groundX = 0;

let gameStarted = false;
let gameOver = false;
let gameOverImg, gameResetImg;
let score = 0;
window.onload = function() {
    board = document.getElementById("dino-board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    dinoImg = new Image(); dinoImg.src = "/img/google-dino/dino.png";
    dinoRun1Img = new Image(); dinoRun1Img.src = "/img/google-dino/dino-run1.png";
    dinoRun2Img = new Image(); dinoRun2Img.src = "/img/google-dino/dino-run2.png";
    runImgs = [dinoRun1Img, dinoRun2Img];
    dinoDuck1Img = new Image(); dinoDuck1Img.src = "/img/google-dino/dino-duck1.png";
    dinoDuck2Img = new Image(); dinoDuck2Img.src = "/img/google-dino/dino-duck2.png";
    duckImgs = [dinoDuck1Img, dinoDuck2Img];

    cactus1Img = new Image(); cactus1Img.src = "/img/google-dino/cactus1.png";
    cactus2Img = new Image(); cactus2Img.src = "/img/google-dino/cactus2.png";
    cactus3Img = new Image(); cactus3Img.src = "/img/google-dino/cactus3.png";

    bird1Img = new Image(); bird1Img.src = "/img/google-dino/bird1.png";
    bird2Img = new Image(); bird2Img.src = "/img/google-dino/bird2.png";
    birdImgs = [bird1Img, bird2Img];

    groundImg = new Image(); groundImg.src = "/img/google-dino/track.png";

    gameOverImg = new Image(); gameOverImg.src = "/img/google-dino/game-over.png";
    gameResetImg = new Image(); gameResetImg.src = "/img/google-dino/reset.png";

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    requestAnimationFrame(update);
    setInterval(positionCactus, 1500);
    setInterval(positionBird, 3500);
};
function handleKeyDown(e) {
    if (gameOver && (e.code === "Space" || e.code === "ArrowUp")) {
        resetGame();
        gameStarted = true;
        e.preventDefault();
        return;
    }
    if (!gameStarted && (e.code === "Space" || e.code === "ArrowUp")) {
        gameStarted = true;
        speedY = 0;
        e.preventDefault();
        return;
    }
    if (gameStarted && !gameOver && (e.code === "Space" || e.code === "ArrowUp") && !isDucking && dino.y >= boardHeight - dino.height) {
        speedY = -10;
        e.preventDefault();
    }
    if (e.code === "ArrowDown" && dino.y >= boardHeight - dino.height) {
        isDucking = true;
        dino.height = 40;
        dino.y = boardHeight - dino.height;
        dinoImg = duckImgs[0];
        e.preventDefault();
    }
}
function handleKeyUp(e) {
    if (e.code === "ArrowDown") {
        isDucking = false;
        dino.height = dinoFullHeight;
        dino.y = boardHeight - dino.height;
        dinoImg = runImgs[runFrame];
        e.preventDefault();
    }
}
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);
    if (gameStarted) {
        groundX += speedX;
        if (groundX <= -boardWidth) groundX = 0;
    }
    context.drawImage(groundImg, groundX, boardHeight - 20, boardWidth, 20);
    context.drawImage(groundImg, groundX + boardWidth, boardHeight - 20, boardWidth, 20);
    if (!gameStarted) {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
        context.fillStyle = "black";
        context.font = "16px Arial";
        context.fillText("Press Space or Up to Start", boardWidth / 2 - 100, boardHeight / 2);
        return;
    }
    if (gameOver) {
        context.drawImage(gameOverImg, boardWidth/2 - 110, boardHeight/2 - 40, 200, 80);
        context.drawImage(gameResetImg, boardWidth/2 - 40, boardHeight/2 + 50, 50, 50);
        return;
    }
    speedY += gravity;
    dino.y += speedY;
    if (dino.y >= boardHeight - dino.height) {
        dino.y = boardHeight - dino.height;
        speedY = 0;
    }
    if (!isDucking && dino.y >= boardHeight - dino.height) {
        runTimer++;
        if (runTimer >= runInterval) {
            runFrame = (runFrame + 1) % runImgs.length;
            dinoImg = runImgs[runFrame];
            runTimer = 0;
        }
    } else if (isDucking) {
        duckTimer++;
        if (duckTimer >= duckInterval) {
            duckFrame = (duckFrame + 1) % duckImgs.length;
            dinoImg = duckImgs[duckFrame];
            duckTimer = 0;
        }
    }
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    for (let cactus of cactusArray) {
        cactus.x += speedX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        if (crash(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "/img/google-dino/dino-dead.png";
        }
    }
    updateBirds();
    score++;
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText(score, 5, 20);
}
function resetGame() {
    gameOver = false;
    score = 0;
    speedY = 0;
    isDucking = false;
    gameStarted = false;

    dino.height = dinoFullHeight;
    dino.width = dinoWidth;
    dino.y = boardHeight - dino.height;
    dino.x = dinoX;
    dinoImg = runImgs[0];

    runFrame = 0;
    runTimer = 0;
    duckFrame = 0;
    duckTimer = 0;

    cactusArray = [];
    birdArray = [];
}
function positionCactus() {
    if (!gameStarted || gameOver) return;
    let cactus = { img:null, x:cactusX, y:cactusY, width:null, height:cactusHeight};
    let r = Math.random();
    if(r>0.9){cactus.img=cactus3Img;cactus.width=cactus3Width;}
    else if(r>0.75){cactus.img=cactus2Img;cactus.width=cactus2Width;}
    else if(r>0.55){cactus.img=cactus1Img;cactus.width=cactus1Width;}
    else return;
    cactusArray.push(cactus);
    if(cactusArray.length>5) cactusArray.shift();
}
function positionBird() {
    if (!gameStarted || gameOver) return;
    let lastCactus = cactusArray[cactusArray.length-1];
    if(lastCactus && lastCactus.x > boardWidth-500) return;
    let bird = {
        x: boardWidth,
        y: boardHeight - dinoFullHeight - 9 - Math.random()*9,
        width: bird1Width,
        height: birdHeight,
        img: birdImgs[0],
        frame: 0,
        timer: 0
    };
    birdArray.push(bird);
    if(birdArray.length>5) birdArray.shift();
}
function updateBirds() {
    for (let bird of birdArray) {
        bird.x += birdSpeed;
        bird.timer++;
        if (bird.timer >= birdInterval) {
            bird.frame = (bird.frame + 1) % birdImgs.length;
            bird.img = birdImgs[bird.frame];
            bird.timer = 0;
        }
        context.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);
        if (crash(dino, bird)) {
            gameOver = true;
            dinoImg.src = "/img/google-dino/dino-dead.png";
        }
    }
}
function crash(a,b){
    return a.x < b.x+b.width && a.x+a.width > b.x &&
           a.y < b.y+b.height && a.y+a.height > b.y;
}