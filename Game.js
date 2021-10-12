const unselectedButtonColor = "#FFFFFF";
const selectedButtonColor = "#1D9ECB";

let att;
let att2;
let player;
let paused = false;
let PAN;
let attractors = [];
let placeMode = false;
let moveMode = false;
let deleteMode = false;
let selectionMode = false;
let choosingType = 0;
let canModify = true;
let showLines = false;
let cameraEasing = 0.1;
let showMap = false;
let launchVel;

// Images
let smallBH;
let bigBH;
let sun;
let smallBH2
let bigBH2;
let sun2;
let WH;
let WH2;
let rocket;
let chopsic;

let RUN = false;

// Load a bunch of assets
function preload() {
  smallBH = loadImage("Assets/smolBH.png");
  WH = loadImage("Assets/smWH.png");
  bigBH = loadImage("Assets/bigBH.png");
  sun = loadImage("Assets/SUN.png");
  smallBH2 = loadImage("Assets/smolBH.png");
  WH2 = loadImage("Assets/smWH.png");
  bigBH2 = loadImage("Assets/bigBH.png");
  sun2 = loadImage("Assets/SUN.png");
  rocket = loadImage("Assets/rocket-ship.png");
  chopsic = loadFont("Assets/Chopsic-K6Dp.ttf");
}

// Set up the game
function initGame() {
  // Make a player and an attractor object
  placeMode = true;
  starBackground.background(0);
  starBackground = makeBackground();
  //attractors = [];
  choosingType = 0;
  PAN = createVector(0, 0);
  player = new Player(width / 2, height / 2, 5);
  RUN = false;
  placeMode = true;
  moveMode = false;
  deleteMode = false;
  selectionMode = false;
  makeButtons();
  textSize(12);
  player.vel = launchVel.copy();
}

// Update the game
function updateGame() {
  // Update and draw everything to the screen
  if (!paused && RUN) {
    // Only updates and moves the player if not paused
    for (let i = 0; i < attractors.length; i++) {
      attractors[i].attract(player);
    }
    player.update();
    PAN.x += (player.pos.x - width / 2 - PAN.x) * cameraEasing;
    PAN.y += (player.pos.y - height / 2 - PAN.y) * cameraEasing;
  }

  // Draws everything to screen
  for (let i = 0; i < attractors.length; i++) {
    attractors[i].show();
  }

  drawButtons();

  player.show();

  if (showMap) {
    displayMap();
  }

  // Set the position of the attractor to your mouse position
  // att.pos = createVector(mouseX, mouseY);
}

function togglePaused() {
  // Toggle whether we are paused or not
  paused = !paused;
}
