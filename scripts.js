const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = {
    x: 400,
    y: 250,
    angle: 0,
    speed: 2,
    handling: 2,
    driftScore: 0
};

let money = 0;
let drifting = false;

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {

    if (keys["ArrowUp"]) {
        car.x += Math.cos(car.angle) * car.speed;
        car.y += Math.sin(car.angle) * car.speed;
    }

    if (keys["ArrowLeft"]) {
        car.angle -= 0.05 * car.handling;
        drifting = true;
    }

    if (keys["ArrowRight"]) {
        car.angle += 0.05 * car.handling;
        drifting = true;
    }

    if (!keys["ArrowLeft"] && !keys["ArrowRight"]) {
        drifting = false;
    }

    if (drifting && keys["ArrowUp"]) {
        car.driftScore += 1;
    }
}

function drawCar() {
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);

    ctx.fillStyle = "red";
    ctx.fillRect(-15, -10, 30, 20);

    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTrack();
    drawCar();

    ctx.fillStyle = "white";
    ctx.fillText("Drift Score: " + car.driftScore, 10, 20);
}

function drawTrack() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, 700, 400);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function startDrift() {
    setTimeout(() => {
        let earned = Math.floor(car.driftScore / 10);
        money += earned;
        car.driftScore = 0;
        updateStats();
        alert("Drift bitdi! Qazanc: $" + earned);
    }, 10000);
}

function upgradeSpeed() {
    let cost = car.speed * 25;
    if (money >= cost) {
        money -= cost;
        car.speed += 0.5;
        updateStats();
    }
}

function upgradeHandling() {
    let cost = car.handling * 25;
    if (money >= cost) {
        money -= cost;
        car.handling += 0.3;
        updateStats();
    }
}

function updateStats() {
    document.getElementById("money").innerText = money;
    document.getElementById("speed").innerText = car.speed.toFixed(1);
    document.getElementById("handling").innerText = car.handling.toFixed(1);
    document.getElementById("speedCost").innerText = Math.floor(car.speed * 25);
    document.getElementById("handleCost").innerText = Math.floor(car.handling * 25);
}

updateStats();
gameLoop();
