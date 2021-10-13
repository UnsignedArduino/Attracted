// Colors
const unselectedButtonColor = "#FFFFFF";
const selectedButtonColor = "#1D9ECB";
const hoverButtonColor = "#9bd9e8";

// Buttons
let runButton;
let pauseButton;

let splahScreenRun;

let placeButton;
let selectButton;
let moveButton;
let deleteButton;
let mapButton;

let sunButton;
let whButton;
let sbhButton;
let bbhButton;

// Make all the buttons in the game
function makeButtons() {
  runButton = new Clickable();
  runButton.locate(10, 10);
  runButton.resize(100, 30);
  runButton.text = "Run (Enter)";
  runButton.onPress = function () {
    RUN = !RUN;
    canModify = !RUN;
    if (RUN) {
      runButton.text = "Stop (Enter)";
    } else {
      initGame()
      runButton.text = "Run (Enter)";
    }
    runButton.color = selectedButtonColor;
  }
  runButton.onHover = function() {
    runButton.color = hoverButtonColor;
  }
  runButton.onOutside = function() {
    runButton.color = unselectedButtonColor;
  }
  runButton.onRelease = function() {
    runButton.color = hoverButtonColor;
  }
  canModify = true;

  pauseButton = new Clickable();
  pauseButton.locate(120, 10);
  pauseButton.resize(100, 30);
  pauseButton.text = "Pause (Space)";
  pauseButton.onHover = function() {
    pauseButton.color = hoverButtonColor;
  }
  pauseButton.onOutside = function() {
    pauseButton.color = unselectedButtonColor;
  }
  pauseButton.onPress = function() {
    paused = !paused;
    pauseButton.color = selectedButtonColor;
  }
  pauseButton.onRelease = function() {
    pauseButton.color = hoverButtonColor;
  }

  placeButton = new Clickable();
  placeButton.locate(120, 10);
  placeButton.resize(100, 30);
  placeButton.text = "Place mode (1)";
  placeButton.onPress = function () {
    placeMode = true;
    moveMode = false;
    deleteMode = false;
    selectionMode = false;
    placeButton.color = selectedButtonColor;
  }
  placeButton.onRelease = function() {
    placeButton.color = placeMode ? selectedButtonColor : unselectedButtonColor;
  }
  placeButton.onOutside = placeButton.onRelease;
  placeButton.onHover = function() {
    placeButton.color = placeMode ? selectedButtonColor : hoverButtonColor;
  }

  moveButton = new Clickable();
  moveButton.locate(230, 10);
  moveButton.resize(110, 30);
  moveButton.text = "Move mode (2)";
  moveButton.onPress = function () {
    placeMode = false;
    moveMode = true;
    deleteMode = false;
    selectionMode = false;
    moveButton.color = selectedButtonColor;
  }
  moveButton.onRelease = function() {
    moveButton.color = moveMode ? selectedButtonColor : unselectedButtonColor;
  }
  moveButton.onOutside = moveButton.onRelease;
  moveButton.onHover = function() {
    moveButton.color = moveMode ? selectedButtonColor : hoverButtonColor;
  }

  deleteButton = new Clickable();
  deleteButton.locate(350, 10);
  deleteButton.resize(110, 30);
  deleteButton.text = "Delete mode (3)";
  deleteButton.onPress = function () {
    placeMode = false;
    moveMode = false;
    deleteMode = true;
    selectionMode = false;
    deleteButton.color = selectedButtonColor;
  }
  deleteButton.onRelease = function() {
    deleteButton.color = deleteMode ? selectedButtonColor : unselectedButtonColor;
  }
  deleteButton.onOutside = deleteButton.onRelease
  deleteButton.onHover = function() {
    deleteButton.color = deleteMode ? selectedButtonColor : hoverButtonColor;
  }

  selectButton = new Clickable();
  selectButton.locate(470, 10);
  selectButton.resize(110, 30);
  selectButton.text = "Launch mode (4)";
  selectButton.onPress = function () {
    placeMode = false;
    moveMode = false;
    deleteMode = false;
    selectionMode = true;
    selectButton.color = selectedButtonColor;
  }
  selectButton.onRelease = function() {
    selectButton.color = selectionMode ? selectedButtonColor : unselectedButtonColor;
  }
  selectButton.onOutside = selectButton.onRelease;
  selectButton.onHover = function() {
    selectButton.color = selectionMode ? selectedButtonColor : hoverButtonColor;
  }

  mapButton = new Clickable();
  mapButton.locate(10, 50);
  mapButton.resize(110, 30);
  mapButton.text = "Open map (m)";
  mapButton.onPress = function () {
    showMap = !showMap;
    mapButton.text = showMap ? "Close map (m)" : "Open map (m)";
    mapButton.color = selectedButtonColor;
  } 
  mapButton.onRelease = function() {
    mapButton.color = showMap ? selectedButtonColor : unselectedButtonColor;
  }
  mapButton.onOutside = mapButton.onRelease;
  mapButton.onHover = function() {
    mapButton.color = showMap ? selectedButtonColor : hoverButtonColor;
  }

  sunButton = new Clickable();
  sunButton.locate(10, height - 110);
  sunButton.resize(200, 100);
  sunButton.text = "";
  // sunButton.text = "Small Star";
  sunButton.image = sun2;
  sunButton.fitImage = true;
  sunButton.imageScale = 0.6;
  sunButton.textFont = chopsic;
  sunButton.textSize = 15;
  sunButton.onPress = function() {
    choosingType = 0;
    sunButton.color = selectedButtonColor;
  }
  sunButton.onRelease = function() {
    sunButton.color = choosingType == 0 ? selectedButtonColor : unselectedButtonColor;
  }
  sunButton.onOutside = sunButton.onRelease;
  sunButton.onHover = function() {
    sunButton.color = choosingType == 0 ? selectedButtonColor : hoverButtonColor;
  }

  whButton = new Clickable();
  whButton.locate(220, height - 110);
  whButton.resize(200, 100);
  whButton.text = "";
  // whButton.text = "White Hole";
  whButton.image = WH2;
  whButton.fitImage = true;
  whButton.imageScale = 0.6;
  whButton.textFont = chopsic;
  whButton.textSize = 15;
  whButton.onPress = function() {
    choosingType = 3;
    whButton.color = selectedButtonColor;
  }
  whButton.onRelease = function() {
    whButton.color = choosingType == 3 ? selectedButtonColor : unselectedButtonColor;
  }
  whButton.onOutside = whButton.onRelease;
  whButton.onHover = function() {
    whButton.color = choosingType == 3 ? selectedButtonColor : hoverButtonColor;
  }

  sbhButton = new Clickable();
  sbhButton.locate(430, height - 110)
  sbhButton.resize(200, 100);
  sbhButton.text = "";
  // sbhButton.text = "Small Black Hole";
  sbhButton.image = smallBH;
  sbhButton.fitImage = true;
  sbhButton.imageScale = 0.6;
  sbhButton.textFont = chopsic;
  sbhButton.textSize = 15;
  sbhButton.onPress = function() {
    choosingType = 1;
    sbhButton.color = selectedButtonColor;
  }
  sbhButton.onRelease = function() {
    sbhButton.color = choosingType == 1 ? selectedButtonColor : unselectedButtonColor;
  }
  sbhButton.onOutside = sbhButton.onRelease;
  sbhButton.onHover = function() {
    sbhButton.color = choosingType == 1 ? selectedButtonColor : hoverButtonColor;
  }

  bbhButton = new Clickable();
  bbhButton.locate(640, height - 110);
  bbhButton.resize(200, 100);
  bbhButton.text = "";
  // bbhButton.text = "Big Black Hole";
  bbhButton.image = bigBH;
  bbhButton.fitImage = true;
  bbhButton.imageScale = 0.6;
  bbhButton.textFont = chopsic;
  bbhButton.textSize = 15;
  bbhButton.onPress = function() {
    choosingType = 2;
    bbhButton.color = selectedButtonColor;
  }
  bbhButton.onRelease = function() {
    bbhButton.color = choosingType == 2 ? selectedButtonColor : unselectedButtonColor;
  }
  bbhButton.onOutside = bbhButton.onRelease;
  bbhButton.onHover = function() {
    bbhButton.color = choosingType == 2 ? selectedButtonColor : hoverButtonColor;
  }

  splahScreenRun = new Clickable();
  splahScreenRun.locate(width / 2 - 100, height - (height / 4));
  splahScreenRun.resize(200, 100);
  splahScreenRun.textFont = chopsic;
  splahScreenRun.textSize = 20;
  splahScreenRun.text = "Start Game";
  splahScreenRun.onHover = function() {
    splahScreenRun.color = hoverButtonColor;
  }
  splahScreenRun.onOutside = function() {
    splahScreenRun.color = unselectedButtonColor;
  }
  splahScreenRun.onPress = function() {
    splahScreenRun.color = selectedButtonColor;
    isSplash = false;
    // PAN = createVector(0, height * 5 - height / 2);
    PAN = createVector(0, 0);
  }
}

// Draw the buttons and update them if neccessary

function drawButtons() {
  runButton.draw();
  mapButton.draw();

  // Only show the pause button if we are running the level
  if (RUN) {
    pauseButton.draw();
  }

  pauseButton.text = paused ? "Resume (Space)" : "Pause (Space)";
  if (canModify) {
    // Draw and highlight the mode buttons
    placeButton.draw();
    moveButton.draw();
    deleteButton.draw();
    selectButton.draw();
  }

  if (canModify && placeMode) {
    // Draw and highlight the celestial body select buttons
    sunButton.draw();
    whButton.draw();
    sbhButton.draw();
    bbhButton.draw();

    // Draw the currently selected celestial body at the mouse point if we are in place mode
    if (mouseY < height - 100) {
      if (!showMap) {
        let m = 5
        if (choosingType == 0) {
          let k = 4;
        
          sun.resize(sqrt(20) * m * k, sqrt(20) * m * k);
          image(sun, mouseX - sqrt(20) * m * k / 2, mouseY - sqrt(20) * m * k / 2);
        } else if (choosingType == 1) {
          let k = 7;
          smallBH.resize(sqrt(20) * m * k, sqrt(20) * m * k);
          image(smallBH, mouseX - sqrt(20) * m * k / 2, mouseY - sqrt(20) * m * k / 2);
        } else if (choosingType == 3) {
          let k = 7;
          WH.resize(sqrt(20) * m * k, sqrt(20) * m * k);
          image(WH, mouseX - sqrt(20) * m * k / 2, mouseY - sqrt(20) * m * k / 2);
        } else if (choosingType == 2) {
          let k = 14;
          bigBH.resize(sqrt(20) * m * k, sqrt(20) * m * k);
          image(bigBH, mouseX - sqrt(20) * m * k / 2, mouseY - sqrt(20) * m * k / 2);
        }
      }
    }
  }
}