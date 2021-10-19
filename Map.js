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
  circle(player.pos.x / scale, player.pos.y / scale, 100/scale);
  for (let a of gravityBlockers){
    push()
    fill(0, 0, 255)
    circle(a.pos.x/scale, a.pos.y/scale, a.currentR/scale)
    pop()
  }
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
    if (a.type == 4) {
      fill(200, 0, 0);
    }
    if (a.type == 5) {
      fill(0, 0, 255);
    }
    
    circle(a.pos.x / scale, a.pos.y / scale, a.currentR / scale);
    fill(255, 0, 0)
    circle(a.pos.x / scale, a.pos.y / scale, scale/3)
    let da = false
    for (let i=0;i<gravityBlockers.length;i++){
      
      let hit = collideLineCircle(a.pos.x/scale, a.pos.y/scale, player.pos.x/scale, player.pos.y/scale, gravityBlockers[i].pos.x/scale, gravityBlockers[i].pos.y/scale, gravityBlockers[i].currentR/scale)
      if (hit){
        da = true
      }
      
    }
    
    
    push()
    stroke(255)
    if (da){
      stroke(255, 0, 0)
    }
    if (showLines){
      line(a.pos.x/scale, a.pos.y/scale, player.pos.x/scale, player.pos.y/scale)
    }
    pop()
    
    
  }
  for (let a of levelAttractors) {
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
    if (a.type == 4) {
      fill(200, 0, 0);
    }
    if (a.type == 5) {
      fill(0, 0, 255);
    }
    circle(a.pos.x / scale, a.pos.y / scale, a.currentR / (scale));
    let da = false
    for (let i=0;i<gravityBlockers.length;i++){
      
      let hit = collideLineCircle(a.pos.x/scale, a.pos.y/scale, player.pos.x/scale, player.pos.y/scale, gravityBlockers[i].pos.x/scale, gravityBlockers[i].pos.y/scale, gravityBlockers[i].currentR/scale)
      if (hit){
        da = true
      }
      
    }
    
    push()
    stroke(255)
    if (da){
      stroke(255, 0, 0)
    }
    if (showLines){
      line(a.pos.x/scale, a.pos.y/scale, player.pos.x/scale, player.pos.y/scale)
    }
    pop()
    
  }
  for (let a of levelAsteroids) {
    fill(200, 200, 200)
    circle(a.x / scale, a.y / scale, 40/scale);
  }
  fill(0, 255, 0);
  circle((circlePos.x+PAN.x) / scale, (circlePos.y+PAN.y) / scale, 300/scale);
  pop();
}