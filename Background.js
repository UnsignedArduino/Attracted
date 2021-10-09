let starBackground;
let starPoints = [];
let starOriginalSizes = [];
let starSizes = [];

function makeBackground() {
  let graphics = createGraphics(width, height);
  let starCount = random(50, 100);
  startPoints = [];
  for (let c = 0; c < starCount; c++) {
    starPoints.push(createVector(random(0, width), random(0, height)));
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
    if (random(0.5) < 0.001) {
      starSizes[index] = max(starOriginalSizes[index] - 1, 0);
      setTimeout(() => {
        starSizes[index] = max(starOriginalSizes[index] - 1, 0);
      }, 100);
      setTimeout(() => {
        starSizes[index] = max(starOriginalSizes[index] - 1, 0);
      }, 200);
      setTimeout(() => {
        starSizes[index] = max(starOriginalSizes[index] - 1, 0);
      }, 300);
      setTimeout(() => {
        starSizes[index] = min(starOriginalSizes[index] + 1, starOriginalSizes[index]);
      }, 800);
      setTimeout(() => {
        starSizes[index] = min(starOriginalSizes[index] + 1, starOriginalSizes[index]);
      }, 900);
      setTimeout(() => {
        starSizes[index] = min(starOriginalSizes[index] + 1, starOriginalSizes[index]);
      }, 1000);
    }
    let vector = starPoints[index];
    starBackground.circle(vector.x, vector.y, starSizes[index]);
  }
}
