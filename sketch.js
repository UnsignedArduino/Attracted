let width = 1280;
let height = 720;
const fps = 60;

let mouseHeld = false;
let dragging = false;
let fpsToShow;

function setup() {
  width = windowWidth - 15;
  height = windowHeight - 15;
  createCanvas(width, height);
  launchVel = createVector();
  // Make the background
  starBackground = makeBackground();
  frameRate(fps);
  initGame();
  // noCursor();
  // Only update the FPS display every second so we can actually read it
  setInterval(() => {
    fpsToShow = round(frameRate());
  }, 1000);
}

function draw() {
  background(0);
  drawBackground();
  image(starBackground, 0, 0);
  updateGame();

  // Write FPS to screen
  textSize(12)
  push();
  textAlign(RIGHT);
  fill(255);
  text("FPS: " + fpsToShow, width - 10, 15);
  pop();

  // Skip drawing rest of stuff to screen if in splash screen
  if (isSplash) {
    // Draw the splash screen before we exit
    push();
    textAlign(CENTER);
    textSize(80);
    fill(255);
    textFont(chopsic);
    text("Attracted", width / 2, height / 4);
    textSize(15);
    fill(238, 144, 245)
    text("Gravity. The most attractive force in the universe", width / 2, height / 4 + 30)
    fill(192);
    text("A game made by Bobingstern and UnsignedArduino\nFor the repl.it 2021 game jam\n", 
         width / 2, height / 4 + 60);
    text("Press any key to begin", 
         splahScreenRun.x + (splahScreenRun.width / 2), 
         splahScreenRun.y + splahScreenRun.height + 20);
    pop();
    return;
  }

  // Write position to screen
  push();
  textAlign(RIGHT);
  fill(255);
  text("Rocket position: (" + round(player.pos.x) + ", " + round(player.pos.y) + ")",
    width - 10, 35);
  pop();

  // Write velocity to screen
  push();
  textAlign(RIGHT);
  fill(255);
  text("Rocket speed: (" + round(player.vel.x) + ", " + round(player.vel.y) + ") px/frame",
    width - 10, 55);
  pop();
}

function keyPressed() {
  // Don't listen to the normal key bindings if we are in the splash screen 
  // and exit the splash screen on any key press
  if (isSplash) {
    splahScreenRun.color = selectedButtonColor;
    isSplash = false;
    // PAN = createVector(0, height * 5 - height / 2);
    PAN = createVector(0, 0);
    return;
  }
  // Space
  if (RUN && keyCode == 32) { 
    // Pause the game
    togglePaused();
    // if (!paused) {
    //   // noCursor();
    // } else {
    //   cursor();
    // }
  }

  // Enter
  if (keyCode == 13) {
    // Stop or run the game
    RUN = !RUN;
    canModify = !RUN;
    if (RUN) {
      runButton.text = "Stop (Enter)";
    } else {
      initGame()
      runButton.text = "Run (Enter)";
    }
  }

  // D
  if (keyCode == 68) {
    // Show the debug lines (shows the attraction between the player and attractors)
    showLines = !showLines;
  }

  // L
  if (keyCode == 76) {
    // Show the level menu
    showLevelsMenu = !showLevelsMenu
  }

  // M
  if (keyCode == 77) {
    // Show the map overlay
    showMap = !showMap;
  }

  // S
  if (keyCode == 83 && RUN) {
    // Toggle speed
    multiUpdate = multiUpdate != 5 ? 5 : 1;
    speedButton.color = multiUpdate == 5 ? selectedButtonColor : unselectedButtonColor;
  }

  if (canModify) {
    // Select all the different modes
    // 1
    if (keyCode == 49) {
      placeMode = !placeMode;
      if (placeMode){
        moveMode = false;
        deleteMode = false;
        selectionMode = false;
      }
      // 2
    } else if (keyCode == 50) {
      moveMode = !moveMode;
      if (moveMode){
        placeMode = false;
        deleteMode = false;
        selectionMode = false;
      }
      // 3
    } else if (keyCode == 51) {
      deleteMode = !deleteMode;
      if (deleteMode){
        placeMode = false;
        moveMode = false;
        selectionMode = false;
      }
      // 4
    } else if (keyCode == 52) {
      selectionMode = !selectionMode;
      if (selectionMode){
        placeMode = false;
        moveMode = false;
        deleteMode = false;
      }
    }
  }
}

function mousePressed() {
  mouseHeld = true;
}

function mouseReleased() {
  mouseHeld = false;
}

function mouseClicked() {
  if (isSplash){
    return
  }
  // Don't do anything in this function if we are up near the buttons
  if (mouseY < runButton.y + runButton.height) {
    return;
  }

  // Set the initial velocity of the player if we are in selection mode
  if (selectionMode && !RUN) {
    if (showMap){
      let p = player.pos.copy();
      p.div(scale)
      let m = createVector(mouseX, mouseY);
      launchVel = p5.Vector.sub(m, p);
      launchVel.setMag(6);
      player.vel = launchVel.copy();
    }
    else{
      let p = player.pos.copy();
      p.sub(PAN)
      let m = createVector(mouseX, mouseY);
      launchVel = p5.Vector.sub(m, p);
      launchVel.setMag(6);
      player.vel = launchVel.copy();
    }
  }
  let p = true
  if (showGuide && dist(mouseX, mouseY, nextButton.x+55, nextButton.y+15) < 110){
    p = false
  }
  if (canModify && p) {
    // Make new attractors if we are in place mode
    if (placeMode && mouseY < height - 100 && !showLevelsMenu && mouseY > 120) {
      if (!showMap) {
        attractors.push(new Attractor(mouseX + PAN.x, mouseY + PAN.y, choosingType));
      } else {
        // Since we are in the zoomed out map, we place it at the scale
        attractors.push(new Attractor(mouseX * scale, mouseY * scale, choosingType));
      }
    }
  }

  if (deleteMode) {
    // Delete stuff that is touching the mouse cursor
    if (showMap) {
      for (index in attractors) {
        // Use the scale cause we are in the zoomed-out map
        if (dist(attractors[index].pos.x / scale, attractors[index].pos.y / scale, mouseX, mouseY) < attractors[index].currentR/scale) {
          attractors.splice(index, 1);
        }
      }
    } else {
      for (index in attractors) {
        if (dist(attractors[index].pos.x-PAN.x, attractors[index].pos.y-PAN.y, mouseX, mouseY) < attractors[index].currentR) {
          attractors.splice(index, 1);
        }
      }
    }
  }
}