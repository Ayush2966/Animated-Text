import { Effect } from "./src/Effect.js";

window.addEventListener("load", () => {
  const cvs = document.querySelector("canvas");
  const ctx = cvs.getContext("2d", {
    willReadFrequently: true,
  });
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;

  const effect = new Effect(ctx, cvs.width, cvs.height);
  effect.textWrapper(effect.inputText.value);
  effect.render();

  function animate() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    effect.render();
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    effect.textWrapper(effect.inputText.value);
    effect.resize(cvs.width, cvs.height);
  });
});
