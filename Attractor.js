class Attractor {
  constructor(x,y,m) {
    this.pos = createVector(x,y);
    this.mass = m;
    this.r = sqrt(abs(this.mass))*2;
    this.canAttract = true;
    this.type = 0;
    this.angle = 0;
  }
  
  attract(mover) {
    if (!this.canAttract) {
      return;
    }
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let G = 5;
    let strength = G * (this.mass * mover.mass) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }
  
  show() {
    if (!paused) {
        this.angle += 0.01;
    }
    // noStroke();
    // fill(0, 0, 0);
    // ellipse(this.pos.x, this.pos.y, this.r*2);   
    // Black hole
    if (this.type == 0) {
      const k = 7;
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      smallBH.resize(this.r * k, this.r * k);
      image(smallBH, -this.r * k / 2, -this.r * k / 2);
      pop();
    } 
  }
}