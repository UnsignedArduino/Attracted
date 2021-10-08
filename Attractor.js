class Attractor {
  constructor(x,y,m) {
    this.pos = createVector(x,y);
    this.mass = m;
    this.r = sqrt(abs(this.mass))*2;
    this.canAttract = true;
    this.type = 0;
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
    // noStroke();
    // fill(0, 0, 0);
    // ellipse(this.pos.x, this.pos.y, this.r*2);   
    // Black hole
    if (this.type == 0) {
        const k = 3;
        smallBH.resize(this.r * k, this.r * k);
        image(smallBH, this.pos.x - this.r * k / 2, this.pos.y - this.r * k / 2);
    } 
  }
}