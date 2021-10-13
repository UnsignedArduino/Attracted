const width = 1280;
const height = 720;
const fps = 60;

let mouseHeld = false;
let dragging = false;
let fpsToShow;

function setup() {
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

  // Skip drawing stats to screen if in splash screen
  if (isSplash) {
    return;
  }

  // Write FPS to screen
  textSize(12)
  push();
  textAlign(RIGHT);
  fill(255);
  text("FPS: " + fpsToShow, width - 10, 10);
  pop();

  // Write position to screen
  push();
  textAlign(RIGHT);
  fill(255);
  text("Rocket position: (" + round(player.pos.x) + ", " + round(player.pos.y) + ")",
    width - 10, 30);
  pop();

  // Write velocity to screen
  push();
  textAlign(RIGHT);
  fill(255);
  text("Rocket speed: (" + round(player.vel.x) + ", " + round(player.vel.y) + ") px/frame",
    width - 10, 50);
  pop();
}

function keyPressed() {
  if (isSplash){
    return
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

  // L
  if (keyCode == 76) {
    // Show the debug lines (shows the attraction between the player and attractors)
    showLines = !showLines;
  }

  // M
  if (keyCode == 77) {
    // Show the map overlay
    showMap = !showMap;
  }

  if (canModify) {
    // Select all the different modes
    // 1
    if (keyCode == 49) {
      moveMode = false;
      deleteMode = false;
      selectionMode = false;
      placeMode = true;
      // 2
    } else if (keyCode == 50) {
      placeMode = false;
      deleteMode = false;
      selectionMode = false;
      moveMode = true;
      // 3
    } else if (keyCode == 51) {
      moveMode = false;
      placeMode = false;
      selectionMode = false;
      deleteMode = true;
      // 4
    } else if (keyCode == 52) {
      moveMode = false;
      placeMode = false;
      deleteMode = false;
      selectionMode = true;
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
  if (mouseY < runButton.y + runButton.height &&
    mouseX < mapButton.x + mapButton.width) {
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
      let m = createVector(mouseX, mouseY);
      launchVel = p5.Vector.sub(m, p);
      launchVel.setMag(6);
      player.vel = launchVel.copy();
    }
  }

  if (canModify) {
    // Make new attractors if we are in place mode
    if (placeMode && mouseY < height - 100) {
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
        if (dist(attractors[index].pos.x / scale, attractors[index].pos.y / scale, mouseX, mouseY) < attractors[index].currentR) {
          attractors.splice(index, 1);
        }
      }
    } else {
      for (index in attractors) {
        if (dist(attractors[index].pos.x, attractors[index].pos.y, mouseX, mouseY) < attractors[index].currentR) {
          attractors.splice(index, 1);
        }
      }
    }
  }
}