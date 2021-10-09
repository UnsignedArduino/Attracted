let att;
let player;
let paused = false;
let smallBH
let bigBH;
let sun;
let WH;
let rocket

function preload(){
    smallBH = loadImage("Assets/smolBH.png")
    WH = loadImage("Assets/smWH.png")
    bigBH = loadImage("Assets/bigBH.png")
    sun = loadImage("Assets/SUN.png")
    rocket = loadImage("Assets/rocket-ship.png")
}

function initGame() {
  // Make a player and an attractor object
  player = new Player(300, 300, 5);
  att = new Attractor(width / 2, height / 2, 50);
}

function drawPauseSymbol() {
  noStroke();
  fill(128);
  rect(20, 20, 10, 50, 5);
  rect(40, 20, 10, 50, 5);
}

function updateGame() {
  // Update and draw everything to the screen
  if (!paused) {
    // Only updates and moves the player if not paused
    att.attract(player);
    player.update();
  }
  
  // Draws everything to screen
  att.show()
  player.show()

  // Show red exclaimation mark if less then 50 px away
  if (dist(att.pos.x, att.pos.y, player.pos.x, player.pos.y) <= 200) {
    fill(255, 0, 0);
    textSize(25);
    text("!", player.pos.x, player.pos.y - 25);
  }

  // Draw the pause symbol if neccessary
  if (paused) {
    drawPauseSymbol();
  }

  // Set the position of the attractor to your mouse position
  att.pos = createVector(mouseX, mouseY);
}

function togglePaused() {
  // Toggle whether we are paused or not
  paused = !paused;
}
