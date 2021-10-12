const width = 1280;
const height = 720;
const fps = 60;
let mouseHeld = false;
let dragging = false;
let fpsToShow;

function setup() {
  createCanvas(width, height);
  launchVel = createVector()
  starBackground = makeBackground();
  frameRate(fps);
  initGame();
  // noCursor();
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
  push();
  textAlign(RIGHT);
  fill(255);
  text("FPS: " + fpsToShow, width - 10, 10);
  pop();
}

function keyPressed() {
  // Space
  if (RUN && keyCode == 32) {
    togglePaused();
    if (!paused) {
      // noCursor();
    } else {
      cursor();
    } 
  }
  // Enter
  if (keyCode == 13) {
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
    showLines = !showLines;
  }

  // M
  if (keyCode == 77) {
    showMap = !showMap;
  }
  
  if (canModify) {
    moveMode = false;
    placeMode = false;
    deleteMode = false;
    selectionMode = false;
    // 1
    if (keyCode == 49) {
      placeMode = true;
    // 2
    } else if (keyCode == 50) {
      moveMode = true;
    // 3
    } else if (keyCode == 51) {
      deleteMode = true;
    // 4
    } else if (keyCode == 52) {
      selectionMode = true;
    }
  }
  // if (keyCode == 52) {
  //   moveMode = false;
  //   placeMode = false;
  //   deleteMode = false
  //   selectionMode = true
  // }
}

function mousePressed() {
    mouseHeld = true;
}

function mouseReleased() {
    mouseHeld = false;
}

function mouseClicked() {
  if (mouseY < runButton.y + runButton.height && 
      mouseX < mapButton.x + mapButton.width) {
    return;
  }
  
  if (selectionMode && !RUN) {
    let p = player.pos.copy();
    let m = createVector(mouseX, mouseY);
    launchVel = p5.Vector.sub(m, p);
    launchVel.x /= 100;
    launchVel.y /= 100;
    player.vel =launchVel.copy()
  }

  if (canModify) {
    if (placeMode && mouseY < height - 100) {
      if (!showMap) {
        attractors.push(new Attractor(mouseX + PAN.x, mouseY + PAN.y, choosingType));
      } else {
        attractors.push(new Attractor(mouseX * scale, mouseY * scale, choosingType));
      }
    } else if (placeMode) {
      let gap = width / 4;
      if (mouseX < gap) {
        choosingType = 0;
      }
      if (mouseX > gap && mouseX < gap * 2) {
        choosingType = 3;
      }
      if (mouseX > gap * 2 && mouseX < gap * 3) {
        choosingType = 1;
      }
      if (mouseX > gap * 3) {
        choosingType = 2;
      }
    }

    if (deleteMode && !showMap) {
      for (index in attractors) {
        if (dist(attractors[index].pos.x, attractors[index].pos.y, mouseX, mouseY) < attractors[index].currentR) {
          attractors.splice(index, 1);
        }
      }
    }
    else if (deleteMode && showMap) {
      for (index in attractors) {
        if (dist(attractors[index].pos.x / scale, attractors[index].pos.y / scale, mouseX, mouseY) < attractors[index].currentR) {
          attractors.splice(index, 1);
        }
      }
    }
  }
}