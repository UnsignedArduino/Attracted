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
let gravityBlockers = []
let maxLevel = 10;
let onLevel = 0;
let multiUpdate = 1

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
let flag
let chopsic;
let flagPos;
let circlePos

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
  flag = loadImage("Assets/Flag.png");
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
  circlePos = createVector(0, 0);
  
  multiUpdate = 1;
  splashAttractors = [];
  // Make a player and an attractor object
  // randomLevel()
  placeMode = true;
  starBackground.background(0);
  starBackground = makeBackground();
  // attractors = [];
  choosingType = 0;
  PAN = createVector(0, 3402);
  player = new Player(width / 2, height * 5, 5);
  RUN = false;
  placeMode = false;
  moveMode = false;
  deleteMode = false;
  selectionMode = false;
  makeButtons();
  textSize(12);
  player.vel = launchVel.copy();
  flag.resize(200, 200);
  //runLevel(onLevel)
}

// Shows the player preview (of where it would go)
function showPreview() {
  let allps = [];
  let ogAcc = player.acc.copy();
  let ogVel = player.vel.copy();
  let ogPos = player.pos.copy();
  let pCopy = new Player(ogPos.x, ogPos.y, player.mass);
  pCopy.acc = ogAcc.copy();
  pCopy.vel = ogVel.copy();
  pCopy.pos = ogPos.copy();
  pCopy.fake = true;
  for (let n = 1; n < 500; n ++) { 
    let ni = 1;
    let ne = 1;
    for (let i = 0; i < attractors.length; i ++) {
      ni = attractors[i].attract(pCopy);
    }
    // Update the attractors already built-in to the level
    for (let i = 0; i < levelAttractors.length; i ++) {
      ne = levelAttractors[i].attract(pCopy);
    }
    if (ne == -3 || ni == -3) {
      break;
    } else {
      pCopy.update();
    }
    
    if (n % 20 == 0 && showLines) {
      if (showMap) {
        allps.push(pCopy.pos.copy().div(scale));
      }
    }
  }
  return allps;  
}

// Update the game
function updateGame() {
  circlePos = createVector(flagPos.x - PAN.x + 325, flagPos.y - PAN.y + 390)

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
    if (dist(circlePos.x+PAN.x, circlePos.y+PAN.y, player.pos.x, player.pos.y) < 100){
      onLevel++
      if (onLevel > maxLevel){
        maxLevel = onLevel
      }
      initGame()
      runLevel(onLevel)
    }
    push();
    //image(flag, flagPos.x - PAN.x, flagPos.y - PAN.y);
    fill(255, 0, 0);
    circle(circlePos.x, circlePos.y, 200);
    pop();
    
    // Draw all the attractors and asteroids
    for (let i = 0; i < attractors.length; i++) {
      attractors[i].show();
    }
    for (let i = 0; i < levelAttractors.length; i++) {
      levelAttractors[i].show();
    }
    for (let i = 0; i < gravityBlockers.length; i++) {
      gravityBlockers[i].show();
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
      let points = showPreview()
      for (let i=0;i<points.length;i++){
        push()
        fill(255)
        circle(points[i].x, points[i].y, 5)
        pop()
      }
    }
    
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
    // Make a splash attractor with a 0.2% chance every frame
    if (random(0, 1) < 0.002) {
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
