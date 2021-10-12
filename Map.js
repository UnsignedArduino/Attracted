let scale = 10;

// Draws the zoom-ed out map
function displayMap() {
  push();
  stroke(0);
  fill(255, 255, 255, 100);
  rect(0, 0, width, height);
  fill(255, 0, 0);
  let d = player.vel.copy();
  drawArrow(p5.Vector.div(player.pos, scale), d.normalize().mult(10), 'blue');
  circle(player.pos.x / scale, player.pos.y / scale, scale);

  for (let a of attractors) {
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
    circle(a.pos.x / scale, a.pos.y / scale, a.currentR / scale);
  }
  pop();
}