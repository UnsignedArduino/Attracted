class Attractor {
  constructor(x, y, t) {
    this.pos = createVector(x, y);
    this.mass = 20;
    this.r = sqrt(abs(this.mass)) * 2;
    this.canAttract = true;
    this.type = t;
    this.angle = 0;
    this.currentR = this.r;
    this.draggingMe = false;
  }
  
  attract(mover) {
    let drawPos = this.pos.copy();
    drawPos.sub(PAN);
    let d = dist(this.pos.x, this.pos.y, mover.pos.x, mover.pos.y);
    
    if (d <= 200) {
      push();
      fill(255, 0, 0);
      textSize(25);
      text("!", mover.pos.x - PAN.x, mover.pos.y - 25 - PAN.y);
      pop();
    }

    if (d < this.currentR / 2) {
      initGame();
      return;
    }

    if (!this.canAttract) {
      return;
    }

    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = force.magSq();
    let G = 55;
    let strength = G * (this.mass * mover.mass) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
    
    if (showLines && d < (width + height)) {
      push();
      stroke(255);
      strokeWeight(strength * 10);
      line(drawPos.x, drawPos.y, mover.pos.x - PAN.x, mover.pos.y - PAN.y);
      pop(); 
    }
  }
  
  show() {
    let temp = this.pos.copy();
    this.pos.sub(PAN);
    let t = this.pos.copy();
   
    if (!paused) {
        this.angle += 0.01;
    }

    // noStroke();
    // fill(0, 0, 0);
    // ellipse(this.pos.x, this.pos.y, this.r*2);   

    // Sun
    let k;
    if (this.type == 0) {
      this.mass = 30;
      k = 4;
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      sun.resize(this.r * k, this.r * k);
      image(sun, -this.r * k / 2, -this.r * k / 2);
      pop();
    // Small black hole
    } else if (this.type == 1) {
      this.mass = 50
      k = 7;
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      smallBH.resize(this.r * k, this.r * k);
      image(smallBH, -this.r * k / 2, -this.r * k / 2);
      pop();
    // Big black hole
    } else if (this.type == 2) {
      this.mass = 200
      k = 14;
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      bigBH.resize(this.r * k, this.r * k);
      image(bigBH, -this.r * k / 2, -this.r * k / 2);
      pop();
    // White hole
    } else if (this.type == 3) {
      this.mass = -40
      k = 7;
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      WH.resize(this.r * k, this.r * k);
      image(WH, -this.r * k / 2, -this.r * k / 2);
      pop();
    }

    this.currentR = this.r * k;
    this.pos = temp.copy();
    
    if (mouseHeld && moveMode) {
      circle(mouseX + PAN.x, mouseY + PAN.y, 10);
      if (dist(mouseX + PAN.x, mouseY + PAN.y, this.pos.x, this.pos.y) < this.currentR) {
        if (!dragging) {
          dragging = true;
          this.draggingMe = true;
        }
      }
      if (this.draggingMe) {
        this.pos.x = mouseX + PAN.x;
        this.pos.y = mouseY + PAN.y;
      }
    } else {
      this.draggingMe = false;
      dragging = false;
    }
  }
}
