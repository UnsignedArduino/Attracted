let scale = 10;

// Draws the zoom-ed out map
function displayMap() {
  push();
  stroke(0);
  fill(100, 100, 100);
  rect(0, 0, width, height);
  fill(255, 0, 0);
  let d = player.vel.copy();
  if (!selectionMode){
    drawArrow(p5.Vector.div(player.pos, scale), d.normalize().mult(10), 'blue');
  }
  else{
    drawArrow(p5.Vector.div(player.pos, scale), d.normalize().mult(100), 'blue');
  }
  circle(player.pos.x / scale, player.pos.y / scale, scale);

  for (let a of attractors) {
    if (a.type == 0) {
      fill(255, 255, 0);
    }
    if (a.type == 1) {
      fill(50);
    }
    if (a.type == 2) {
      fill(50);
    }
    if (a.type == 3) {
      fill(200, 200, 200);
    }
    
    circle(a.pos.x / scale, a.pos.y / scale, a.currentR / scale);
    fill(255, 0, 0)
    circle(a.pos.x / scale, a.pos.y / scale, scale/3)
  }
  for (let a of levelAttractors) {
    if (a.type == 0) {
      fill(255, 255, 0);
    }
    if (a.type == 1) {
      fill(200, 200, 200);
    }
    if (a.type == 2) {
      fill(255, 255, 255);
    }
    if (a.type == 3) {
      fill(200, 200, 200);
    }
    circle(a.pos.x / scale, a.pos.y / scale, a.currentR / (scale));
  }
  for (let a of levelAsteroids) {
    fill(200, 200, 200)
    circle(a.x / scale, a.y / scale, 40/scale);
  }
  fill(0, 255, 0);
  circle((circlePos.x+PAN.x) / scale, (circlePos.y+PAN.y) / scale, scale);
  pop();
}