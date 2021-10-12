let starBackground;
let starPoints = [];
let starOriginalSizes = [];
let starSizes = [];

function makeBackground() {
  let graphics = createGraphics(width, height);
  let starCount = random(0, (height + width) * 3);
  starBackground = null;
  starPoints = [];
  starOriginalSizes = [];
  starSizes = [];
  for (let c = 0; c < starCount; c++) {
    starPoints.push(createVector(random(-width, width * 10), random(-height, height * 10)));
    let size = random(1, 3);
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
    let vector = starPoints[index];
    starBackground.circle(vector.x - PAN.x, vector.y - PAN.y, /*starSizes[index]*/ 2);
    // if (starPoints[index].x-PAN.x<0){
    //     starPoints.splice(index, 1);
    //     starPoints.push(new createVector(width+PAN.x, random(0, height)))
    //     starOriginalSizes[index] = random(0, 3)
    // }
  }
}
