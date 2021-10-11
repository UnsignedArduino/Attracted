const width = 1280;
const height = 720;
const fps = 60;
let mouseHeld = false;
let dragging = false;

function setup() {
  createCanvas(width, height);
  starBackground = makeBackground();
  frameRate(fps);
  initGame();
  //noCursor();
}

function draw() {
  background(0);
  drawBackground();
  image(starBackground, 0, 0);
  updateGame();
  
}

function keyPressed() {
  // Space
  if (keyCode == 32) {
    togglePaused();
    if (!paused) {
      //noCursor();
    } else {
      cursor();
    }
  }
  // L
  if (keyCode == 76) {
    showLines = !showLines
  }
  //m
  if (keyCode == 77){
    showMap = !showMap
  }

  // // A
  // if (keyCode == 65) {
  //   // Get smaller, and wrap around if needed
  //   att.type --;
  //   if (att.type < 0){
  //       att.type = m;
  //   }
  // }
  //Numbers
  if (canModify){
    if (keyCode == 49){
      moveMode = true;
      placeMode = false;
      deleteMode = false
      selectionMode = false
    }
    if (keyCode == 50){
      moveMode = false;
      placeMode = true;
      deleteMode = false
      selectionMode = false
    }
    if (keyCode == 51){
      moveMode = false;
      placeMode = false;
      deleteMode = true
      selectionMode = false
    }
    if (keyCode == 52){
      moveMode = false;
      placeMode = false;
      deleteMode = false
      selectionMode = true
    }
  }
  // if (keyCode == 52){
  //   moveMode = false;
  //   placeMode = false;
  //   deleteMode = false
  //   selectionMode = true
  // }
}


function mousePressed(){
    mouseHeld = true;
}
function mouseReleased(){
    mouseHeld = false;
}
function mouseClicked(){
  if (selectionMode && !RUN){
    let p = player.pos.copy()
    let m = createVector(mouseX, mouseY)

    player.vel = p5.Vector.sub(m, p)
    player.vel.x /= 100
    player.vel.y /= 100
  }
  if (canModify){
    if (placeMode && mouseY < height-100){
      if (!showMap){
        attractors.push(new Attractor(mouseX+PAN.x, mouseY+PAN.y, choosingType))
      }
      else{
        attractors.push(new Attractor(mouseX*scale, mouseY*scale, choosingType))
      }
      
    }
    else if (placeMode){
      let gap = width/4
      if (mouseX < gap){
        choosingType = 0;
      }
      if (mouseX > gap && mouseX < gap*2){
        choosingType = 3;
      }
      if (mouseX > gap*2 && mouseX < gap*3){
        choosingType = 1;
      }
      if (mouseX > gap*3){
        choosingType = 2;
      }
    }
    if (deleteMode){
      for (index in attractors){
        if (dist(attractors[index].pos.x, attractors[index].pos.y, mouseX, mouseY) < attractors[index].currentR){
          attractors.splice(index, 1)
        }
      }
    }
  }
}