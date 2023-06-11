export class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.x = Math.random() * this.effect.cvsWidth;
    this.y = 0; // this.effect.cvsHeight;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.size = this.effect.gap; // +-1
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = 0.9; // Math.random() * 0.6 + 0.15;
    this.ease = 0.2; // Math.random() * 0.1 + 0.005;
  }
  draw() {
    this.effect.ctx.fillStyle = this.color;
    this.effect.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}
