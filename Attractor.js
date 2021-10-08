
class Attractor {
  
  constructor(x,y,m) {
    this.pos = createVector(x,y);
    this.mass = m;
    this.r = sqrt(this.mass)*2;
    this.canAttract = true;
  }
  
  attract(mover) {
    if (!this.canAttract){
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
    noStroke();
    fill(255,0, 100);
    ellipse(this.pos.x, this.pos.y, this.r*2);    
  }
}