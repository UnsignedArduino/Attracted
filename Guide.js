let showGuide = false;
let guidePhase = 99999999999;
let nextButton;

function updateGuide() {
  nextButton.draw();
  if (guidePhase == -1) {
    push();
    textSize(20);
    textFont(chopsic);
    textAlign(CENTER);
    fill(255);
    text("Welcome to ATTRACTED!", width / 2, height / 2 - 50);
    pop();
    selectionMode = false;
    deleteMode = false;
    moveMode = false;
    placeMode = false;
  } else if (guidePhase == 0) {
    push();
    textSize(20);
    textFont(chopsic);
    textAlign(LEFT);
    fill(255);
    text("This button is to place gravity objects", 150, 80);
    pop();
    selectionMode = false;
    deleteMode = false;
    moveMode = false;
  } else if (guidePhase == 1) {
    push();
    textSize(20);
    textFont(chopsic);
    textAlign(LEFT);
    fill(255);
    text("This button is to open the map\nYou can place stuff in the map too", 10, 120);
    pop();
    selectionMode = false;
    deleteMode = false;
    moveMode = false;
  } else if (guidePhase == 2) {
    push();
    textSize(20);
    textFont(chopsic);
    textAlign(LEFT);
    fill(255);
    text("This button is to move gravity objects", 260, 80);
    pop();
    selectionMode = false;
    deleteMode = false;
  } else if (guidePhase == 3) {
    push();
    textSize(20);
    textFont(chopsic);
    textAlign(LEFT);
    fill(255);
    text("This button is to delete gravity objects", 370, 80);
    pop();
    selectionMode = false;
  } else if (guidePhase == 4) {
    push();
    textSize(20);
    textFont(chopsic);
    textAlign(LEFT);
    fill(255);
    text("This button is to set the launch direction of your rocket\nJust click anywhere on the screen or map to set it", 480, 80);
    pop();
  } else if (guidePhase == 5) {
    push();
    textSize(20);
    textFont(chopsic);
    textAlign(LEFT);
    fill(255);
    text("Just press this button to run, thats it!", 10, 120);
    pop();
  } else if (guidePhase > 5) {
    showGuide = false;
    guidePhase = -1;
  }
}