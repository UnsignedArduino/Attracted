let starBackground;
let starPoints = [];
let starOriginalSizes = [];
let starSizes = [];

function makeBackground() {
  let graphics = createGraphics(width, height);
  let starCount = random(0, (H + W) * 4);
  starBackground = null;
  starPoints = [];
  starOriginalSizes = [];
  starSizes = [];
  for (let c = 0; c < starCount; c++) {
    starPoints.push(createVector(random(-W, W * 11), random(-H, H * 11)));
    let size = random(1, 5);
    starOriginalSizes.push(size);
    starSizes.push(size);
  }
  return graphics;
}

function drawBackground() {
  starBackground.background(0);
  starBackground.fill(255);
  starBackground.noStroke();
  for (let index in starPoints) {
    // // Animate by fading in and out (twinkle)
    // if (random(1) < 0.0001) {
    //   starSizes[index] = max(starOriginalSizes[index] - 1, 0);
    //   setTimeout(() => {
    //     starSizes[index] = max(starOriginalSizes[index] - 1, 0);
    //   }, 100);
    //   setTimeout(() => {
    //     starSizes[index] = max(starOriginalSizes[index] - 1, 0);
    //   }, 200);
    //   setTimeout(() => {
    //     starSizes[index] = max(starOriginalSizes[index] - 1, 0);
    //   }, 300);
    //   setTimeout(() => {
    //     starSizes[index] = min(starOriginalSizes[index] + 1, starOriginalSizes[index]);
    //   }, 800);
    //   setTimeout(() => {
    //     starSizes[index] = min(starOriginalSizes[index] + 1, starOriginalSizes[index]);
    //   }, 900);
    //   setTimeout(() => {
    //     starSizes[index] = min(starOriginalSizes[index] + 1, starOriginalSizes[index]);
    //   }, 1000);
    // }
    // Draw the star
    let vector = starPoints[index];
    starBackground.circle(vector.x - PAN.x, vector.y - PAN.y, /*starSizes[index]*/ 4);
    // if (starPoints[index].x-PAN.x<0){
    //     starPoints.splice(index, 1);
    //     starPoints.push(new createVector(width+PAN.x, random(0, height)))
    //     starOriginalSizes[index] = random(0, 3)
    // }
  }
}
