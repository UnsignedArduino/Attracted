const width = 1280;
const height = 720;
const fps = 60;

function setup() {
  createCanvas(width, height);
  starBackground = makeBackground();
  frameRate(fps);
  initGame();
  noCursor();
}

function draw() {
  background(0);
  drawBackground();
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
  // S
  let m = 3
  if (keyCode == 83) {
    // Get bigger, and wrap around if needed
    att.type ++;
    if (att.type > m){
        att.type = 0;
    }
  }
  // A
  if (keyCode == 65) {
    // Get smaller, and wrap around if needed
    att.type --;
    if (att.type < 0){
        att.type = m;
    }
  }
}
