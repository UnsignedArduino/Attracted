// Function to draw arrow
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

class Player {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
    this.fake = false
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    // Update the velocities and acceleration
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    // Reset the game if we go out of bounds
    if (this.pos.x > W * 11 || this.pos.x < -W || this.pos.y > H * 11 || this.pos.y < -H) {
      if (!this.fake){
        initGame();
      }
    }
  }

  show() {
    // Actually draw the player (which is a rocket)
    let drawPos = this.pos.copy();
    drawPos.sub(PAN);
    // drawPos.x -= PAN.x;
    // drawPos.y -= PAN.y;
    push();
    translate(drawPos.x, drawPos.y);
    rotate(this.vel.heading() + radians(90));
    let k = 8;
    rocket.resize(this.r * k, this.r * k);
    image(rocket, -this.r * k / 2, -this.r * k / 2);
    pop();
    // Show the direction it will head towards initially if we are not running
    if (!RUN) {
      push();
      stroke(255);
      strokeWeight(2);
      fill(255, 100);
      ellipse(drawPos.x, drawPos.y, this.r * 2);
      let d1 = this.vel.copy();
      drawArrow(drawPos, d1.mult(15), 'blue');
      pop();
    }
  }
}
