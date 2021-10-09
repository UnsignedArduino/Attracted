let att;
let player;
let paused = false;
let smallBH
let rocket

function preload(){
    smallBH = loadImage("Assets/smolBH.png")
    rocket = loadImage("Assets/rocket-ship.png")
}

function initGame() {
  // Make a player and an attractor object
  player = new Player(300, 300, 5);
  att = new Attractor(width / 2, height / 2, 50);
}

function updateGame() {
  // Update and draw everything to the screen
  if (!paused) {
    // Only updates and moves the player if not paused
    att.attract(player);
    player.update()
  }
  
  // Draws everything to screen
  att.show()
  player.show()

  // Set the position of the attractor to your mouse position
  att.pos = createVector(mouseX, mouseY);
}

function togglePaused() {
  // Toggle whether we are paused or not
  paused = !paused;
}
