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

// Buttons
let runButton;
let pauseButton;
let placeButton;
let selectButton;
let moveButton;
let deleteButton;
let launchVel

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

  runButton = new Clickable();
  runButton.locate(10, 10);
  runButton.resize(100, 30);
  runButton.text = "Run";
  runButton.onPress = function() {
    RUN = !RUN;
    canModify = !RUN;
    if (RUN) {
      runButton.text = "Stop";
    } else {
      runButton.text = "Run";
    }
  }
  canModify = true;

  pauseButton = new Clickable();
  pauseButton.locate(10, 50);
  pauseButton.resize(100, 30);
  pauseButton.text = "Pause";
  pauseButton.onPress = function() {
    paused = !paused;
    if (paused) {
      pauseButton.text = "Resume";
    } else {
      pauseButton.text = "Pause";
    }
  }

  placeButton = new Clickable();
  placeButton.locate(120, 10);
  placeButton.resize(100, 30);
  placeButton.text = "Place mode";
  placeButton.onPress = function() {
    placeMode = true;
    moveMode = false;
    deleteMode = false;
    selectionMode = false;
  }

  moveButton = new Clickable();
  moveButton.locate(230, 10);
  moveButton.resize(110, 30);
  moveButton.text = "Move mode";
  moveButton.onPress = function() {
    placeMode = false;
    moveMode = true;
    deleteMode = false;
    selectionMode = false;
  }

  deleteButton = new Clickable();
  deleteButton.locate(350, 10);
  deleteButton.resize(110, 30);
  deleteButton.text = "Delete mode";
  deleteButton.onPress = function() {
    placeMode = false;
    moveMode = false;
    deleteMode = true;
    selectionMode = false;
  }

  selectButton = new Clickable();
  selectButton.locate(470, 10);
  selectButton.resize(110, 30);
  selectButton.text = "Select mode";
  selectButton.onPress = function() {
    placeMode = false;
    moveMode = false;
    deleteMode = false;
    selectionMode = true;
  }

  player.vel = launchVel
}

function updateGame() {
  // Update and draw everything to the screen
  if (!paused && RUN) {
    // Only updates and moves the player if not paused
    for (let i = 0; i < attractors.length; i ++) {
      attractors[i].attract(player);
    }
    player.update();
    PAN.x += (player.pos.x-width / 2 - PAN.x) * cameraEasing;
    PAN.y += (player.pos.y-height / 2 - PAN.y) * cameraEasing;
  }
  
  // Draws everything to screen
  for (let i = 0; i < attractors.length; i ++) {
    attractors[i].show();
  }

  runButton.draw();

  if (RUN) {
    pauseButton.draw();
  }

  if (canModify) {
    // Draw and highlight the buttons
    placeButton.draw();
    moveButton.draw();
    deleteButton.draw();
    selectButton.draw();
    placeButton.color = unselectedButtonColor;
    moveButton.color = unselectedButtonColor;
    deleteButton.color = unselectedButtonColor;
    selectButton.color = unselectedButtonColor;
    if (placeMode) {
      placeButton.color = selectedButtonColor;
    } else if (moveMode) {
      moveButton.color = selectedButtonColor;
    } else if (deleteMode) {
      deleteButton.color = selectedButtonColor;
    } else if (selectionMode) {
      selectButton.color = selectedButtonColor;
    }
  }

  player.show();

  if (showMap) {
    displayMap();
  }
  if (canModify && placeMode) {
    showMenu();
  }

  // Set the position of the attractor to your mouse position
  // att.pos = createVector(mouseX, mouseY);
}

function togglePaused() {
  // Toggle whether we are paused or not
  paused = !paused;
}
