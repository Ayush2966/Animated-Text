
// get canvas element.
let canvas = document.getElementById("myCanvas");
// get drawing context.
let ctx = canvas.getContext("2d");
// get the DOM elements.
let input = document.querySelector('input');
let infoDiv = document.getElementById('infoId');
let footerDiv = document.querySelector('footer');
// set canvas width and height.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (infoDiv.clientHeight + footerDiv.clientHeight);
// array to hold all the bubble objects.
let bubbles = [];
// initialize all necessary variables.
let variables = {
  text : input.value,
  colorPalette : [
    "#081226",
    "#011C40",
    "#1F4C73",
    "#3A6D8C",
    "#689BA6"
  ],
  minRadius : 3,
  maxRadius: 7,
  minOpacity: 0.4,
  maxOpacity: 0.9,
  minBubbleDistance : 2,
  velocityController : 20
};



let initializeText = () => {
  if(canvas.width < 500) {
    let userTextSplit = variables.text.split(" ");
    ctx.font = `lighter ${canvas.width / 5}px Verdana`;
    for(let i = 0; i < userTextSplit.length; i++) {
      ctx.fillStyle = "#f2f2f2";
      ctx.textAlign = "center";
      ctx.fillText(userTextSplit[i], canvas.width / 2, canvas.height / 4 + i * canvas.width / 4);
    }
  }else {
    ctx.font = `lighter ${canvas.width / 9}px Verdana`;  ctx.fillStyle = "#f2f2f2";
    ctx.textAlign = "center";
    ctx.fillText(variables.text, canvas.width / 2, canvas.height / 2);
  }
}

let getTextInformation = () => {
  bubbles = [];
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let pxl = imgData.data;
  for(let i = 0; i < canvas.width * canvas.height; i++) {
    let alphaIndex = i * 4 + 3;
    if(pxl[i * 4 + 3] > 0) {
        // get the x and y position of drawn pixel.
        let linearPosition = alphaIndex / 4;
        let x = linearPosition - (Math.floor(linearPosition / canvas.width) * canvas.width);
        let y = Math.floor(linearPosition / canvas.width);
        let tempParticle = new Bubbles(x, y);
        bubbles.push(tempParticle);
    }
  }
}

input.addEventListener("keyup", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  variables.text = input.value;
  initializeText();
  getTextInformation();
})

window.addEventListener('load', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  variables.text = `Hi, There!`;
  initializeText();
  getTextInformation();
})

let animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // depending on the device width
  // choose the number of pixels to be jumped.
  // 10 has more pixel than 20.
  for(let i = 0; i < bubbles.length; i+= canvas.width < 500? 10 : 20) {
      bubbles[i].updateVelocity();
      bubbles[i].float();
      bubbles[i].show();
  }
  requestAnimationFrame(animate);
}

// call the functions.
animate();
