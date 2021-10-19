// Colors
const unselectedButtonColor = "#FFFFFF";
const selectedButtonColor = "#1D9ECB";
const hoverButtonColor = "#9bd9e8";
const guideButtonColor = "#46faaf";

// Buttons
let runButton;
let pauseButton;

let splahScreenRun;

let placeButton;
let selectButton;
let moveButton;
let deleteButton;
let mapButton;
let speedButton;

let celestialObjectButtons = [];
let sunButton;
let whButton;
let sbhButton;
let bbhButton;
let TONButton;
let gravityBlocker

let multSpeed = 5;

let levelDropdown;
let levelMenu = [];
let showLevelsMenu = false;
let buttonPoses = [];

let canPlace = false;

let alreadyMadeButtons = false;

// Make all the buttons in the game
function makeButtons() {
  showLevelsMenu = false;
  runButton = new Clickable();
  runButton.locate(10, 10);
  runButton.resize(100, 30);
  runButton.text = "Run (Enter)";
  runButton.onPress = function () {
    if (guidePhase != 5 && showGuide) {
      // Do nothing
    } else {
      showGuide = false;
      guidePhase = -5
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
  }
  runButton.onHover = function() {
    runButton.color = hoverButtonColor;
  }
  runButton.onOutside = function() {
    runButton.color = unselectedButtonColor;
    if (guidePhase == 5){
      runButton.color = guideButtonColor;
    }
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
    placeMode = !placeMode;
    if (placeMode){
      moveMode = false;
      deleteMode = false;
      selectionMode = false;
    }
    placeButton.color = selectedButtonColor;
  }
  placeButton.onRelease = function() {
    placeButton.color = placeMode ? selectedButtonColor : unselectedButtonColor;
    if (guidePhase == 0 && !placeMode) {
      placeButton.color = guideButtonColor;
    }
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
    
    moveMode = !moveMode;
    if (moveMode){
      placeMode = false;
      deleteMode = false;
      selectionMode = false;
    }
    moveButton.color = selectedButtonColor;
  }
  moveButton.onRelease = function() {
    moveButton.color = moveMode ? selectedButtonColor : unselectedButtonColor;
    if (guidePhase == 2) {
      moveButton.color = guideButtonColor;
    }
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
    deleteMode = !deleteMode;
    if (deleteMode){
      placeMode = false;
      moveMode = false;
      selectionMode = false;
    }
    deleteButton.color = selectedButtonColor;
  }
  deleteButton.onRelease = function() {
    deleteButton.color = deleteMode ? selectedButtonColor : unselectedButtonColor;
    if (guidePhase == 3) {
      deleteButton.color = guideButtonColor;
    }
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
    selectionMode = !selectionMode;
    if (selectionMode){
      placeMode = false;
      moveMode = false;
      deleteMode = false;
    }
    selectButton.color = selectedButtonColor;
  }
  selectButton.onRelease = function() {
    selectButton.color = selectionMode ? selectedButtonColor : unselectedButtonColor;
    if (guidePhase == 4) {
      selectButton.color = guideButtonColor;
    }
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
    if (guidePhase == 1) {
      mapButton.color = guideButtonColor;
    }
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
  // whButton.text = "\n\n\nMass: -50";
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

  TONButton = new Clickable();
  TONButton.locate(850, height - 110);
  TONButton.resize(200, 100);
  TONButton.text = "TON 618";
  // TONButton.image = bigBH;
  // TONButton.fitImage = true;
  // TONButton.imageScale = 0.6;
  TONButton.textFont = chopsic;
  TONButton.textSize = 15;
  TONButton.onPress = function() {
    choosingType = 4;
    TONButton.color = selectedButtonColor;
  }
  TONButton.onRelease = function() {
    TONButton.color = choosingType == 4 ? selectedButtonColor : unselectedButtonColor;
  }
  TONButton.onOutside = TONButton.onRelease;
  TONButton.onHover = function() {
    TONButton.color = choosingType == 4 ? selectedButtonColor : hoverButtonColor;
  }

  gravityBlocker = new Clickable();
  gravityBlocker.locate(1060, height - 110);
  gravityBlocker.resize(200, 100);
  gravityBlocker.text = "Gravity Blocker";
  // TONButton.image = bigBH;
  // TONButton.fitImage = true;
  // TONButton.imageScale = 0.6;
  gravityBlocker.textFont = chopsic;
  gravityBlocker.textSize = 15;
  gravityBlocker.onPress = function() {
    choosingType = 5;
    gravityBlocker.color = selectedButtonColor;
  }
  gravityBlocker.onRelease = function() {
    gravityBlocker.color = choosingType == 5 ? selectedButtonColor : unselectedButtonColor;
  }
  gravityBlocker.onOutside = gravityBlocker.onRelease;
  gravityBlocker.onHover = function() {
    gravityBlocker.color = choosingType == 5 ? selectedButtonColor : hoverButtonColor;
  }

  // Put them all in a list so we can iterate and place
  celestialObjectButtons.push(sunButton);
  celestialObjectButtons.push(whButton);
  celestialObjectButtons.push(sbhButton);
  celestialObjectButtons.push(bbhButton);
  celestialObjectButtons.push(TONButton);
  celestialObjectButtons.push(gravityBlocker);

  if (!alreadyMadeButtons) {
    let currX = 10;
    let currY = height - 110;
    let buttonWidth = round((width - 10 - (celestialObjectButtons.length * 10)) / celestialObjectButtons.length);
    for (let index = 0; index < celestialObjectButtons.length; index ++) {
      let celestialObjectButton = celestialObjectButtons[index];
      celestialObjectButton.locate(currX, currY);
      celestialObjectButton.resize(buttonWidth, 100);
      currX += buttonWidth + 10;
    }
  }
  alreadyMadeButtons = true;

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
    showGuide = false
    // PAN = createVector(0, height * 5 - height / 2);
    PAN = createVector(0, height*5);
  }
  
  // Level dropdown button
  levelDropdown = new Clickable();
  levelDropdown.locate(590, 10);
  levelDropdown.resize(110, 30);
  levelDropdown.text = "Levels (l)";
  levelDropdown.onPress = function () {
    if (!showGuide){
      levelDropdown.color = selectedButtonColor;
      showLevelsMenu = !showLevelsMenu
      placeMode = false;
      moveMode = false
      selectionMode = false
      deleteMode = false
    }
  }
  levelDropdown.onRelease = function() {
    levelDropdown.color = showLevelsMenu ? selectedButtonColor : unselectedButtonColor;
  }
  levelDropdown.onOutside = levelDropdown.onRelease;
  levelDropdown.onHover = function() {
    levelDropdown.color = showLevelsMenu ? selectedButtonColor : hoverButtonColor;
  }

  levelMenu = [];
  let ind = 0;
  for (let x = 0; x < 2; x ++) {
    for (let y = 0; y < 7; y ++) {
      levelMenu.push(new Clickable());
      levelMenu[levelMenu.length - 1].locate(600 + x * 100, 45 + y * 30);
      levelMenu[levelMenu.length - 1].resize(80, 25);
      // Level 0 is freeplay where everything is clear
      if (ind == 0) {
        levelMenu[levelMenu.length - 1].text = "Freeplay";
      } else if (ind > maxLevel) {
        levelMenu[levelMenu.length - 1].text = "Locked!";
      } else {
        levelMenu[levelMenu.length - 1].text = ind;
      }
      ind ++;
    }
  }

  for (let i = 0; i < levelMenu.length; i ++) {
    // Set the level target on the object so we can remember it
    levelMenu[i].levelTarget = i;
    levelMenu[i].onPress = function () {
      this.color = selectedButtonColor;
      if (this.levelTarget > maxLevel) {
        // Don't do anything if we haven't unlocked that level
      } else {
        // Run that level
        runLevel(this.levelTarget);
      }
    }
    levelMenu[i].onRelease = function() {
      this.color = onLevel == this.levelTarget ? selectedButtonColor : unselectedButtonColor;
    }
    levelMenu[i].onOutside = levelMenu[i].onRelease;
    levelMenu[i].onHover = function() {
      this.color = onLevel == this.levelTarget ? selectedButtonColor : hoverButtonColor;
    }
  } 

  // Guide next button
  nextButton = new Clickable();
  nextButton.locate(width / 2 - 110 / 2, height - 210);
  nextButton.resize(110, 30);
  nextButton.text = "Next->";
  nextButton.textFont = chopsic;
  nextButton.textSize = 15;
  nextButton.onPress = function() {
    guidePhase ++;
    nextButton.color = selectedButtonColor
  }
  nextButton.onRelease = function() {
    nextButton.color = unselectedButtonColor;
  }
  nextButton.onOutside = nextButton.onRelease;
  nextButton.onHover = function() {
    nextButton.color = hoverButtonColor;
  }

  // Help button
  helpButton = new Clickable();
  helpButton.locate(width - 10 - 110, 110);
  helpButton.resize(110, 30);
  helpButton.text = "Help";
  helpButton.onPress = function() {
    showGuide = true;
    guidePhase = -1;
    helpButton.color = selectedButtonColor;
  }
  helpButton.onRelease = function() {
    helpButton.color = unselectedButtonColor;
  }
  helpButton.onOutside = helpButton.onRelease;
  helpButton.onHover = function() {
    helpButton.color = hoverButtonColor;
  }

  // fast forward button
  speedButton = new Clickable();
  speedButton.locate(130, 50);
  speedButton.resize(110, 30);
  speedButton.text = "x5 Speed (s)";
  speedButton.onPress = function () {
    multiUpdate = multiUpdate != multSpeed ? multSpeed : 1;
    speedButton.color = multiUpdate == multSpeed ? selectedButtonColor : unselectedButtonColor;
  } 
  speedButton.onRelease = function() {
    speedButton.color = multiUpdate == multSpeed ? selectedButtonColor : unselectedButtonColor;
  }
  speedButton.onOutside = speedButton.onRelease;
  speedButton.onHover = function() {
    speedButton.color = multiUpdate == multSpeed ? selectedButtonColor : hoverButtonColor;
  }


}

function checkAllButtons() {
  if (isMouseIn(runButton)) {
    return true;
  } else if(isMouseIn(placeButton)) {
    return true;
  } else if(isMouseIn(mapButton)) {
    return true;
  } else if(isMouseIn(moveButton)) {
    return true;
  } else if(isMouseIn(deleteButton)) {
    return true;
  } else if(isMouseIn(selectButton)) {
    return true;
  } else if(isMouseIn(levelDropdown)) {
    return true;
  } else if(isMouseIn(helpButton)) {
    return true;
  } else if(isMouseIn(sunButton)) {
    return true;
  } else if(isMouseIn(whButton)) {
    return true;
  } else if(isMouseIn(sbhButton)) {
    return true;
  } else if(isMouseIn(bbhButton)) {
    return true;
  } else if(isMouseIn(TONButton)) {
    return true;
  } else if(isMouseIn(gravityBlocker)) {
    return true;
  } else {
    return false;
  }
}

function isMouseIn(b) {
  // Returns a boolean if we are in a button
  return (mouseX > b.x && mouseX < b.x + b.width && mouseY > b.y && mouseY < b.y + b.height);
}

// Draw the buttons and update them if neccessary
function drawButtons() {
  runButton.draw();
  mapButton.draw();

  // Only show the pause button if we are running the level
  let toShow = true
  toShow = !checkAllButtons()
  canPlace = toShow

  if (RUN) {
    pauseButton.draw();
    speedButton.draw()
  }

  pauseButton.text = paused ? "Resume (Space)" : "Pause (Space)";
  if (canModify) {
    // Draw the mode buttons
    placeButton.draw();
    moveButton.draw();
    deleteButton.draw();
    selectButton.draw();
    levelDropdown.draw();
    // Draw all the buttons in the level select button
    if (showLevelsMenu) {
      push()
      fill(255)
      rect(590, 40, 200, 215);
      pop()
      for (let i of levelMenu) {
        i.draw();
      }
    }
    if (!showGuide) {
      helpButton.draw();
    }
  }

  if (canModify && placeMode) {
    // Draw and highlight the celestial body select buttons
    sunButton.draw();
    whButton.draw();
    sbhButton.draw();
    bbhButton.draw();
    TONButton.draw()
    gravityBlocker.draw()

    // Draw the currently selected celestial body at the mouse point if we are in place mode
    
    if (toShow) {
      // if (showGuide && dist(mouseX, mouseY, nextButton.x+55, nextButton.y+15) < 110){
      //   return
      // }
      let m = 5
      if (!showMap) {
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
        else if (choosingType == 4) {
          let k = 50;
          // bigBH.resize(sqrt(20) * m * k, sqrt(20) * m * k);
          // image(bigBH, mouseX - sqrt(20) * m * k / 2, mouseY - sqrt(20) * m * k / 2);
          fill(255, 0, 0)
          circle(mouseX, mouseY, sqrt(20) * m * k)
        }
        else if (choosingType == 5) {
          let k = 7;
          // bigBH.resize(sqrt(20) * m * k, sqrt(20) * m * k);
          // image(bigBH, mouseX - sqrt(20) * m * k / 2, mouseY - sqrt(20) * m * k / 2);
          fill(0, 0, 255)
          circle(mouseX, mouseY, sqrt(20) * m * k)
        }
      } else {
        let xs = sqrt(20) * m;
        if (choosingType == 0) {
          push();
          fill(255, 255, 0);
          circle(mouseX, mouseY, xs * 4 / scale);
          pop();
        } else if(choosingType == 1) {
          push();
          fill(50, 50, 50)
          circle(mouseX, mouseY, xs * 7 / scale);
          pop();
        } else if(choosingType == 2) {
          push();
          fill(50, 50, 50);
          circle(mouseX, mouseY, xs * 14 / scale);
          pop();
        } else if(choosingType == 3) {
          push();
          fill(200, 200, 200);
          circle(mouseX, mouseY, xs * 7 / scale);
          pop();
        }
        else if (choosingType == 4) {
          push()
          fill(200, 0, 0)
          circle(mouseX, mouseY, xs * 50 / scale)
          pop()
        }
        else if (choosingType == 5) {
          // bigBH.resize(sqrt(20) * m * k, sqrt(20) * m * k);
          // image(bigBH, mouseX - sqrt(20) * m * k / 2, mouseY - sqrt(20) * m * k / 2);
          fill(0, 0, 255)
          circle(mouseX, mouseY, xs*7/scale)
        }
      }
    }
  }
}