class Attractor {
  constructor(x, y, t) {
    this.pos = createVector(x, y);
    this.mass = 20;
    this.r = sqrt(abs(this.mass)) * 5;
    this.canAttract = true;
    // A numeric value that says whether it's a sun, white hole, etc.
    this.type = t;
    this.angle = 0;
    this.currentR = this.r;
    this.draggingMe = false;
    this.unchangeable = false
    this.flipped = false
    this.myIndex = 0
    this.dragBegun = false
  }

  attract(mover) {
    if (this.type == 5){
      return
    }
    let dontAttract = false;    

    let drawPos = this.pos.copy();
    drawPos.sub(PAN);
    let d = dist(this.pos.x, this.pos.y, mover.pos.x, mover.pos.y);

    for (let i = 0; i < gravityBlockers.length; i ++) {
      let hit = collideLineCircle(drawPos.x, drawPos.y, mover.pos.x - PAN.x, mover.pos.y - PAN.y, gravityBlockers[i].pos.x - PAN.x, gravityBlockers[i].pos.y - PAN.y, gravityBlockers[i].currentR);
      if (hit) {
        dontAttract = true;
      }
      
    }
    
    // Draw a exclaimation mark on the mover if it is closer then 200 px
    if (d <= 200 && !mover.fake) {
      push();
      fill(255, 0, 0);
      textSize(25);
      text("!", mover.pos.x - PAN.x, mover.pos.y - 25 - PAN.y);
      pop();
    }

    // Reset the game if we are touching
    if (d < this.currentR / 2 && !dontAttract) {
      if (mover.fake){
        return -3
      }
      else{
        initGame();
      }
      return;
    }

    // Don't do anything else if we can't attract
    if (!this.canAttract) {
      //return;
    }

    // Apply the force
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = force.magSq();
    let G = 155;
    let strength = G * (this.mass * mover.mass) / distanceSq;
    force.setMag(strength);
    if (!dontAttract){
      mover.applyForce(force);
    }

    // Draw debug lines (enable by pressing the d key)
    if (showLines && d < (width + height) && !mover.fake) {
      push();
      stroke(255);
      if (dontAttract){
        stroke(255, 0, 0)
      }
      strokeWeight(strength * 10);
      line(drawPos.x, drawPos.y, mover.pos.x - PAN.x, mover.pos.y - PAN.y);
      pop();
    }
  }

  show() {
    let temp = this.pos.copy();
    this.pos.sub(PAN);
    let t = this.pos.copy();

    // Only rotate for animating if we are not paused
    if (!paused) {
      this.angle += 0.01;
    }

    // noStroke();
    // fill(0, 0, 0);
    // ellipse(this.pos.x, this.pos.y, this.r*2);   

    let k;
    // Sun
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
      this.mass = 300
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
    else if (this.type == 4) {
      this.mass = 1500
      k = 50;
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      fill(200, 0, 0)
      
      //WH.resize(this.r * k, this.r * k);
      //image(WH, -this.r * k / 2, -this.r * k / 2);
      circle(0, 0, this.r*k)
      stroke(0)
      line(-20, -20, 20, -20)
      fill(0)
      circle(-30, -20, 5)
      circle(30, -20, 5)
      pop();
    }
    else if (this.type == 5) {
      this.mass = 0
      k = 7;
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      fill(0, 0, 255)
      //WH.resize(this.r * k, this.r * k);
      //image(WH, -this.r * k / 2, -this.r * k / 2);
      circle(0, 0, this.r*k)
      pop();
    }

    // Do dragging stuff
    this.currentR = this.r * k;
    this.pos = temp.copy();

    if (this.draggingMe){
        this.flipped = true
      }
      else if (this.flipped){
        this.flipped = false
        wasPreviousMove = true
      }

      if (!this.draggingMe){
        this.dragBegun = true
      }
      else if (this.dragBegun){
        this.dragBegun = false
        prevLoc = [this.myIndex, this.pos]
      }
    console.log()


    if (!this.unchangeable){
      
      
      if (!showMap && canModify) {
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
      } else if (canModify) {
        if (mouseHeld && moveMode) {
          if (dist(mouseX, mouseY, this.pos.x / scale, this.pos.y / scale) < this.currentR/scale) {
            if (!dragging) {
              dragging = true;
              this.draggingMe = true;
            }
          }
          if (this.draggingMe) {
            this.pos.x = mouseX * scale;
            this.pos.y = mouseY * scale;
          }
        } else {
          this.draggingMe = false;
          dragging = false;
        }
      }

      
    }
  }
}
