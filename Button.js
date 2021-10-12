// Buttons
let runButton;
let pauseButton;

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
  }
  canModify = true;

  pauseButton = new Clickable();
  pauseButton.locate(10, 50);
  pauseButton.resize(100, 30);
  pauseButton.text = "Pause (Space)";
  pauseButton.onPress = function () {
    paused = !paused;
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
  }

  selectButton = new Clickable();
  selectButton.locate(470, 10);
  selectButton.resize(110, 30);
  selectButton.text = "Select mode (4)";
  selectButton.onPress = function () {
    placeMode = false;
    moveMode = false;
    deleteMode = false;
    selectionMode = true;
  }

  mapButton = new Clickable();
  mapButton.locate(590, 10);
  mapButton.resize(110, 30);
  mapButton.text = "Open map (m)";
  mapButton.onPress = function () {
    showMap = !showMap;
  }

  sunButton = new Clickable();
  sunButton.locate(10, height - 110);
  sunButton.resize(200, 100);
  sunButton.text = "Small Star";
  sunButton.image = sun2;
  sunButton.fitImage = true;
  sunButton.imageScale = 1.2;
  sunButton.textFont = chopsic;
  sunButton.textSize = 15;
  sunButton.onPress = function() {
    choosingType = 0;
  }

  whButton = new Clickable();
  whButton.locate(220, height - 110);
  whButton.resize(200, 100);
  whButton.text = "White Hole";
  whButton.image = WH2;
  whButton.fitImage = true;
  whButton.imageScale = 1.2;
  whButton.textFont = chopsic;
  whButton.textSize = 15;
  whButton.onPress = function() {
    choosingType = 3;
  }

  sbhButton = new Clickable();
  sbhButton.locate(430, height - 110)
  sbhButton.resize(200, 100);
  sbhButton.text = "Small Black Hole";
  sbhButton.image = WH2;
  sbhButton.fitImage = true;
  sbhButton.imageScale = 1.2;
  sbhButton.textFont = chopsic;
  sbhButton.textSize = 15;
  sbhButton.onPress = function() {
    choosingType = 1;
  }

  bbhButton = new Clickable();
  bbhButton.locate(640, height - 110);
  bbhButton.resize(200, 100);
  bbhButton.text = "Big Black Hole";
  bbhButton.image = WH2;
  bbhButton.fitImage = true;
  bbhButton.imageScale = 1.2;
  bbhButton.textFont = chopsic;
  bbhButton.textSize = 15;
  bbhButton.onPress = function() {
    choosingType = 2;
  }
}

// Draw the buttons and update them if neccessary
function drawButtons() {
  runButton.draw();

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
    mapButton.draw();

    // First set the color to be unselected
    placeButton.color = unselectedButtonColor;
    moveButton.color = unselectedButtonColor;
    deleteButton.color = unselectedButtonColor;
    selectButton.color = unselectedButtonColor;
    // The set the color on the selected button
    if (placeMode) {
      placeButton.color = selectedButtonColor;
    } else if (moveMode) {
      moveButton.color = selectedButtonColor;
    } else if (deleteMode) {
      deleteButton.color = selectedButtonColor;
    } else if (selectionMode) {
      selectButton.color = selectedButtonColor;
    }
    mapButton.color = showMap ? selectedButtonColor : unselectedButtonColor;
    mapButton.text = showMap ? "Close map (m)" : "Open map (m)";
  }

  if (canModify && placeMode) {
    // Draw and highlight the celestial body select buttons
    sunButton.draw();
    whButton.draw();
    sbhButton.draw();
    bbhButton.draw();

// First set the color to be unselected
    sunButton.color = unselectedButtonColor;
    whButton.color = unselectedButtonColor;
    sbhButton.color = unselectedButtonColor;
    bbhButton.color = unselectedButtonColor;
    // The set the color on the selected button
    if (choosingType == 0) {
      sunButton.color = selectedButtonColor;
    } else if (choosingType == 1) {
      sbhButton.color = selectedButtonColor;
    } else if (choosingType == 2) {
      bbhButton.color = selectedButtonColor;
    } else if (choosingType == 3) {
      whButton.color = selectedButtonColor;
    }

    // Draw the currently selected celestial body at the mouse point if we are in place mode
    if (mouseY < height - 100) {
      if (!showMap) {
        if (choosingType == 0) {
          let k = 4;
          sun.resize(sqrt(20) * 2 * k, sqrt(20) * 2 * k);
          image(sun, mouseX - sqrt(20) * 2 * k / 2, mouseY - sqrt(20) * 2 * k / 2);
        } else if (choosingType == 1) {
          let k = 7;
          smallBH.resize(sqrt(20) * 2 * k, sqrt(20) * 2 * k);
          image(smallBH, mouseX - sqrt(20) * 2 * k / 2, mouseY - sqrt(20) * 2 * k / 2);
        } else if (choosingType == 3) {
          let k = 7;
          WH.resize(sqrt(20) * 2 * k, sqrt(20) * 2 * k);
          image(WH, mouseX - sqrt(20) * 2 * k / 2, mouseY - sqrt(20) * 2 * k / 2);
        } else if (choosingType == 2) {
          let k = 14;
          bigBH.resize(sqrt(20) * 2 * k, sqrt(20) * 2 * k);
          image(bigBH, mouseX - sqrt(20) * 2 * k / 2, mouseY - sqrt(20) * 2 * k / 2);
        }
      }
    }
  }
}