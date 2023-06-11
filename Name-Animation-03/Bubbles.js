class Bubbles {
    constructor(x, y) {
      this.x  = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * (variables.maxRadius - variables.minRadius) + variables.minRadius;
      this.opacity = Math.random() * (variables.maxOpacity - variables.minOpacity) + variables.minOpacity;
      this.color = variables.colorPalette[Math.floor(Math.random() * 4)];
      this.destination = {
        x : x,
        y : y
      };
      this.delX = 0;
      this.delY = 0;
        
      this.velocity = {
          x: (Math.random() < 0.5 ? -.5 : .5),
          y: (Math.random() < 0.5 ? -.5 : .5),
      }
    }
  


    updateVelocity() {
      this.delX = this.destination.x - this.x;
      this.delY = this.destination.y - this.y;
      if(Math.abs(this.delX) > variables.minBubbleDistance || Math.abs(this.delY) > variables.minBubbleDistance) {
        this.velocity.x = this.delX / variables.velocityController;
        this.velocity.y = this.delY / variables.velocityController;
      }else {
        this.velocity.x = Math.random() < 0.5 ? -0.1 : 0.1;
        this.velocity.y = Math.random() < 0.5 ? -0.1 : 0.1;
      }
    }

    float() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
 
    }
    show() {
      ctx.beginPath();
      ctx.globalAlpha = this.opacity;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = "#f2f2f2";
      ctx.stroke();
    }
  }
