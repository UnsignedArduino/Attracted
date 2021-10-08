const width = 1280;
const height = 720;
const fps = 60;

function setup() {
  createCanvas(width, height);
  frameRate(fps);
  initGame();
}

function draw() {
  updateGame();
}

function keyPressed() {
  // Space
  if (keyCode == 32) {
    togglePaused();
  }
}
