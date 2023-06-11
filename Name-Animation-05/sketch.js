let allParticles = []
let noOfBalls = 90000
let ctx
let imageData
let figureNo = 0
let text = 'Ayush Jain'
let mouseMoving
let fontSize = 5
let startX = 0

function setup() {
  createCanvas(innerWidth, innerHeight);
  ctx = document.querySelector('canvas').getContext('2d')
  setBalls()
}

function draw() {
  background(0, 0, 0, 100);
  for (let i = 0; i < allParticles.length; i++) {
    const element = allParticles[i];
    element.update()
  }
}
function setBalls(){
  mouseMoving = false
  ctx.fillStyle = 'white'
  ctx.font = '25px Verdana'
  ctx.fillText(text, 0, 30)
  imageData = ctx.getImageData(0, 0, 400, 100)

  ctx.clearRect(0, 0, innerWidth, innerHeight)
  if (figureNo===0) { 
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        if (imageData.data[y*imageData.width*4 + x*4 + 2] > 198) {
          allParticles.push(new Particle(x*fontSize+startX, y*fontSize+200, figureNo))
        }
      }
    }
  }
  else{
    let newParticles = []
    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        if (imageData.data[y*imageData.width*4 + x*4 + 2] > 128) {
          let nextX = x*fontSize+startX
          let nextY = y*fontSize+200
          let randomIndex = round(random(0, allParticles.length-1))
          let tempPosition = allParticles[randomIndex]
          let base = {
            x: nextX,
            y: nextY
          }
          newParticles.push(new Particle(tempPosition.basePosition.x,tempPosition.basePosition.y, figureNo, base=base))
        }
      }
    }
    allParticles = [...newParticles]
  }
}
function keyPressed(){
  if (keyCode===13) {
    let command = select('.command-input').value()
    select('.command-input').value('')
    if (command) {
      changeFigure(command)
    }
  }
}
function changeFigure(textNow){
  text = textNow
  figureNo++
  // fontSize = 76/text.length
  // startX = 1000/text.length
  setBalls()
}
function mouseMoved(){
  mouseMoving = true
}


class Particle{
  constructor(x, y, fgNo, base){
    this.position = {
      x: x,
      y: y,
    }
    this.basePosition = base || {
      x: x,
      y: y,
    }
    this.size = 2
    this.angle
    this.velocity = {
      x: 0, 
      y: 0
    }
    this.mass = random(0.5, 1.5)
    this.figureNo = fgNo
    this.visible = true
  }
  draw(){
    if (!this.visible) return
    fill(255)
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2)
    ctx.fill()
    // circle(this.position.x, this.position.y, this.size)
  }
  update(){
    if (dist(this.position.x, this.position.y, mouseX, mouseY) < 160 && mouseMoving) {
      this.angle = atan2(mouseY-this.position.y, mouseX-this.position.x)
      this.force = dist(mouseX, mouseY, this.position.x, this.position.y)
      this.velocity = {
        x: -cos(this.angle)*this.force*2.5/40,
        y: -sin(this.angle)*this.force*2.5/40
      }
      if (dist(mouseX, mouseY, this.position.x+this.velocity.x, this.position.y+this.velocity.y)>160) {
        this.velocity = {
          x: 0,
          y: 0
        }
      }
    }
    else{
      this.angle = atan2(this.basePosition.y-this.position.y, this.basePosition.x-this.position.x)
      this.force = dist(this.basePosition.x, this.basePosition.y, this.position.x, this.position.y)
      this.velocity = {
        x: cos(this.angle)*this.force*1.2/10,
        y: sin(this.angle)*this.force*1.2/10
      }
    }
    if (this.velocity.x || this.velocity.y) {
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
    this.draw()
  }
  drawLine(particle){
    stroke(255)
    line(this.position.x, this.position.y, particle.position.x, particle.position.y)
  }
}
