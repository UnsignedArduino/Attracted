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
    this.vel = p5.Vector.random2D();
    this.vel.mult(0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    if (this.pos.x > width*10 || this.pos.x < -width || this.pos.y > height*10 || this.pos.y < -height){
      initGame()
    }
  }

  show() {
    let drawPos = this.pos.copy();
    drawPos.sub(PAN)
    // drawPos.x -= PAN.x;
    // drawPos.y -= PAN.y
    push()
    translate(drawPos.x, drawPos.y);
    rotate(this.vel.heading()+radians(90))
    let k = 8;
    rocket.resize(this.r * k, this.r * k)
    image(rocket, -this.r * k/2, -this.r * k/2);
    pop();
    if (!RUN){
      push()
      stroke(255);
      strokeWeight(2);
      fill(255, 100);
      ellipse(this.pos.x, this.pos.y, this.r * 2);
      let d1 = this.vel.copy()
      drawArrow(this.pos, d1.mult(15), 'blue')
      pop()
    }
  }
}