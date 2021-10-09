const width = 1280;
const height = 720;
const fps = 60;

let starBackground;

function makeBackground() {
  let graphics = createGraphics(width, height);
  let starCount = random(50, 100);
  for (let c = 0; c < starCount; c++) {
    let x = random(0, width);
    let y = random(0, height);
    graphics.fill(255, 255, 255);
    graphics.noStroke();
    graphics.circle(x, y, 1);
  }
  return graphics;
}

function setup() {
  createCanvas(width, height);
  starBackground = makeBackground();
  frameRate(fps);
  initGame();
  noCursor();
}

function draw() {
  background(32);
  image(starBackground, 0, 0);
  updateGame();
}

function keyPressed() {
  // Space
  if (keyCode == 32) {
    togglePaused();
    if (!paused) {
      noCursor();
    } else {
      cursor();
    }
  }
}
