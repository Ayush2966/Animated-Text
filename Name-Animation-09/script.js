const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let spread = 15;
let hue = 0;
// found adjustX and adjustY using trial and error
let adjustX = canvas.width / 2 - (100 * spread) / 10;
let adjustY = canvas.height / 2 - (200 * spread) / 10;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  location.reload();
});

console.log(ctx);

let particleArray = [];

// Mouse
const mouse = {
  x: null,
  y: null,
  radius: 100,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

ctx.fillStyle = "white";
ctx.font = "35px Verdana";
ctx.fillText("A", 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 100, 100);

// Particle
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }
  draw() {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    ctx.closePath();
    ctx.stroke();
  }
  update() {
    let delX = mouse.x - this.x;
    let delY = mouse.y - this.y;
    let distance = Math.sqrt(delX * delX + delY * delY);
    let forceDirectionX = delX / distance;
    let forceDirectionY = delY / distance;
    let maxDistance = mouse.radius;

    /* force is a multiplier which slows partices 
    down as 5they get furthur away from the mouse.
    Value of force is between from 0 to 1 */
    let force = (maxDistance - distance) / maxDistance;

    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
      if (this.size < 20) {
        this.size += 1;
      }
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
      if (this.size > 1) {
        this.size -= 1;
      }
    }
  }
}

function init() {
  particleArray = [];
  let h = textCoordinates.height;
  let w = textCoordinates.width;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Checking if opacity is greater than 50%
      // clamped array contains element from 0 to 225
      // 0->r, 1->g, 2->b, 3->a
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + (x * 4 + 3)] > 128
      ) {
        let posX = x * spread + adjustX;
        let posY = y * spread + adjustY;

        particleArray.push(new Particle(posX, posY));
      }
    }
  }
}
console.log(ctx);

function connect() {
  for (let i = 0; i < particleArray.length; i++) {
    for (let j = i + 1; j < particleArray.length; j++) {
      let dx = particleArray[i].x - particleArray[j].x;
      let dy = particleArray[i].y - particleArray[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 70) {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  connect();
  hue += 0.1;
  requestAnimationFrame(animate);
}

init();
animate();
