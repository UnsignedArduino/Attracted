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
let levelAttractors = [];
let levelAsteroids = [];
let splashAttractors = [];
let maxLevel = 1;
let onLevel = 0;
let multiUpdate = 1;

let isSplash = true

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

// Dev function
function logAllAttractors() {
  let arr = [];
  for (let i of attractors) {
    arr.push([i.pos.x, i.pos.y]);
    console.log("[" + i.pos.x + ", " + i.pos.y + "],");
  }
}

// Set up the game
function initGame() {
  multiUpdate = 1
  splashAttractors = [];
  // Make a player and an attractor object
  // randomLevel()
  placeMode = true;
  starBackground.background(0);
  starBackground = makeBackground();
  // attractors = [];
  choosingType = 0;
  PAN = createVector(0, 0);
  player = new Player(width / 2, height * 5, 5);
  RUN = false;
  placeMode = false;
  moveMode = false;
  deleteMode = false;
  selectionMode = false;
  makeButtons();
  textSize(12);
  player.vel = launchVel.copy();
}

// Update the game
function updateGame() {
  if (showGuide) {
    updateGuide();
  }
  // Update and draw everything to the screen
  for (let n = 0; n < multiUpdate; n ++) {
    if (!paused && RUN) {
      // Only updates and moves the player if not paused
      for (let i = 0; i < attractors.length; i++) {
        attractors[i].attract(player);
      }
      // Update the attractors already built-in to the level
      for (let i = 0; i < levelAttractors.length; i++) {
        levelAttractors[i].attract(player);
      }
      // Reset the game if we crash into a asteroid
      for (let i = 0; i < levelAsteroids.length; i++) {
        if (dist(player.pos.x, player.pos.y, levelAsteroids[i].x, levelAsteroids[i].y) < 40) {
          initGame();
        }
      }
      player.update();
    }
  
    // Update the camera panning if we aren't in the splash screen or not paused
    if (!paused && !isSplash) {
      PAN.x += (player.pos.x - width / 2 - PAN.x) * cameraEasing;
      PAN.y += (player.pos.y - height / 2 - PAN.y) * cameraEasing;
    }
  }
  
  // Draws everything to screen if we are not in the pause screen
  if (!isSplash) { 
    push();
    textFont(chopsic);
    fill(255);
    textSize(20);
    // Show the level we are currently on
    if (onLevel == 0) {
      text("Level: Free play", 720, 30);
    } else {
      text("Level: " + onLevel, 720, 30);
    }
    pop();
    // Draw all the attractors and asteroids
    for (let i = 0; i < attractors.length; i++) {
      attractors[i].show();
    }
    for (let i = 0; i < levelAttractors.length; i++) {
      levelAttractors[i].show();
    }
    for (let i = 0; i < levelAsteroids.length; i++) {
      push();
      fill(200, 200, 200);
      circle(levelAsteroids[i].x - PAN.x, levelAsteroids[i].y - PAN.y, 40);
      pop();
    }
    
    // Show the player and maybe the map
    player.show();
    if (showMap) {
      displayMap();
    }
    // Draw the map
    drawButtons();
  } else {
    // Keep cycling through
    if (PAN.x > height * 9) {
      PAN.x = 0;
      splashAttractors = []
    }
    // Iterate through all the attractors in the splash screen and pop them if they are out of the screen
    for (let i = splashAttractors.length - 1; i >= 0; i --) {
      splashAttractors[i].show();
      if (splashAttractors[i].pos.x - PAN.x < -200) {
        splashAttractors.splice(i, 1);
      }
    }
    // Make a splash attractor with a 0.1% chance every frame
    if (random(0, 1) < 0.001) {
      splashAttractors.push(new Attractor(PAN.x + width + 100, random(0, height), floor(random(0, 4))));
    }
    // Scroll a bit
    PAN.x += 5;
    splahScreenRun.draw();
  }

  // Set the position of the attractor to your mouse position
  // att.pos = createVector(mouseX, mouseY);
}

function togglePaused() {
  // Toggle whether we are paused or not
  paused = !paused;
}
