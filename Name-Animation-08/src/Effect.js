import { Particle } from "./Particle.js";

export class Effect {
  constructor(ctx, cvsWidth, cvsHeight) {
    this.ctx = ctx;
    this.cvsWidth = cvsWidth;
    this.cvsHeight = cvsHeight;
    this.textX = this.cvsWidth / 2;
    this.textY = this.cvsHeight / 2;
    this.fontSize = 120;
    this.lineHeight = this.fontSize * 1.2;
    this.textMaxWidth = this.cvsWidth * 0.5;
    this.verticalOffset = 10;
    this.inputText = document.querySelector("input");
    this.inputText.addEventListener("keyup", (e) => {
      if (e.key !== " ") {
        this.ctx.clearRect(0, 0, this.cvsWidth, this.cvsHeight);
        this.textWrapper(e.target.value.toUpperCase());
      }
    });
    // Particle text
    this.particles = [];
    this.gap = 3;
    this.mouse = {
      radius: 15000,
      x: 0,
      y: 0,
    };
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
  }
  textWrapper(text) {
    // Setting
    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      this.cvsWidth,
      this.cvsHeight
    );
    gradient.addColorStop(0.2, "#e8ff00");
    gradient.addColorStop(0.4, "#ff0000");
    gradient.addColorStop(0.6, "#ee0c3c");
    gradient.addColorStop(0.8, "#ff00d1");
    gradient.addColorStop(0.9, "#001fff");
    this.ctx.fillStyle = gradient;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.lineWidth = 3;
    // this.ctx.strokeStyle = "#ee340c";
    this.ctx.strokeStyle = "#f4f3bb";
    this.ctx.font = `${this.fontSize}px Sigmar`;

    // Break multiline text
    let line = "";
    let linesArray = [];
    let lineCounter = 0;
    let words = text.split(" ");

    words.forEach((word) => {
      let testLine = `${line}${word} `;
      if (this.ctx.measureText(testLine).width > this.textMaxWidth) {
        line = `${word} `;
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    });

    let textHeight = this.lineHeight * lineCounter;
    this.textY = this.cvsHeight / 2 - textHeight / 2 + this.verticalOffset;

    linesArray.forEach((el, index) => {
      this.ctx.fillText(el, this.textX, this.textY + index * this.lineHeight);
      this.ctx.strokeText(el, this.textX, this.textY + index * this.lineHeight);
    });

    this.convertToParticles();
  }
  convertToParticles() {
    this.particles = [];
    const pixels = this.ctx.getImageData(
      0,
      0,
      this.cvsWidth,
      this.cvsHeight
    ).data;
    this.ctx.clearRect(0, 0, this.cvsWidth, this.cvsHeight);
    for (let y = 0; y < this.cvsHeight; y += this.gap) {
      for (let x = 0; x < this.cvsWidth; x += this.gap) {
        const index = (y * this.cvsWidth + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgd(${red},${green},${blue})`;
          this.particles.push(new Particle(this, x, y, color));
        }
      }
    }
  }
  render() {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
  resize(width, height) {
    this.cvsWidth = width;
    this.cvsHeight = height;
    this.textX = this.cvsWidth / 2;
    this.textY = this.cvsHeight / 2;
    this.textMaxWidth = this.cvsWidth * 0.5;
  }
}
