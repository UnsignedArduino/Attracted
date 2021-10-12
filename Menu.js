function showMenu() {
  let gap = width / 4;
  let s = 1;

  push();
  fill(255);
  rect(0, height - 100, width, 5);
  for (let i = 0; i < width + 10; i += gap) {
    rect(i, height - 100, 5, 100);
  }
  sun2.resize(gap / 3, gap / 3);
  image(sun2, gap / 3, height - 100);

  WH2.resize(gap / 3.7, gap / 3.7);
  image(WH2, gap * 1.3, height - 90);
  pop();
  push();
  smallBH2.resize(gap / 3.7, gap / 3.7);
  image(smallBH2, gap * 2.3, height - 90);

  bigBH2.resize(gap / 3.5, gap / 3.5);
  image(bigBH2, gap * 3.3, height - 90);
  pop();
  push();
  
  if (placeMode) {
    if (choosingType == 0) {
      text("Sun", width / 2, 50);
    }
    if (choosingType == 1) {
      text("Small   Black   Hole", width / 2, 50);
    }
    if (choosingType == 3) {
      text("White   Hole", width / 2, 50);
    }
    if (choosingType == 2) {
      text("Big    Black   Hole", width / 2, 50);
    }
  }
  
  pop();
  
  if (mouseY < height - 100) {
    if (!showMap) {
      if (choosingType == 0) {
        let k = 4;
        sun.resize(sqrt(20) * 2 * k, sqrt(20) * 2 * k);
        image(sun, mouseX - sqrt(20) * 2 * k / 2, mouseY - sqrt(20) * 2 * k / 2);
      }
      if (choosingType == 1) {
        let k = 7;
        smallBH.resize(sqrt(20) * 2 * k, sqrt(20) * 2 * k);
        image(smallBH, mouseX - sqrt(20) * 2 * k / 2, mouseY - sqrt(20) * 2 * k / 2);
      }
      if (choosingType == 3) {
        let k = 7;
        WH.resize(sqrt(20) * 2 * k, sqrt(20) * 2 * k);
        image(WH, mouseX - sqrt(20) * 2 * k / 2, mouseY - sqrt(20) * 2 * k / 2);
      }
      if (choosingType == 2) {
        let k = 14;
        bigBH.resize(sqrt(20) * 2 * k, sqrt(20) * 2 * k);
        image(bigBH, mouseX - sqrt(20) * 2 * k / 2, mouseY - sqrt(20) * 2 * k / 2);
      }
    }
  }
}
