class Particle {
  constructor({ x, y }) {
    this.pos = createVector(x, y);
    this.start = { ...this.pos };
    this.vel = createVector();
    this.acc = createVector();

    this.maxAcc = 0.4;
    this.maxSpeed = 4;
    this.avoidRadius = 100;

    this.gravity = createVector(0, 0.1);

    this.size = 5;
  }

  applyForce(vec) {
    this.acc.add(vec).limit(this.maxAcc);
  }

  dist({ x, y }) {
    return dist(this.pos.x, this.pos.y, x, y);
  }

  steer({ x, y }) {
    const predicted = this.pos.copy().add(this.vel);
    const desired = createVector(x, y);

    return desired.sub(predicted);
  }

  seek(target) {
    this.applyForce(this.steer(target));
  }

  avoid(target) {
    this.applyForce(this.steer(target).mult(-1));
  }

  update() {
    this.applyForce(this.gravity);

    const mouse = { x: mouseX, y: mouseY };
    if (this.dist(mouse) < this.avoidRadius) this.avoid(mouse);
    else this.seek(this.start);

    this.vel.add(this.acc).limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.draw();
  }

  draw() {
    circle(this.pos.x, this.pos.y, this.size);
  }
}
