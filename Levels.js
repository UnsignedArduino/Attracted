function randomLevel() {
  levelAttractors = [];
  levelAsteroids = [];
  for (let i = 0; i < 10; i ++) { 
    levelAttractors.push(new Attractor(
      random(0, width * 10), 
      random(0, height * 10), 
      floor(random(0, 4))));
    levelAttractors[i].unchangeable = true;
  }
  for (let i = 0; i < 30; i ++) {
    levelAsteroids.push(new createVector(random(0, width * 10), 
                                         random(0, height * 10)));
  }
}

// Make level 0 (freeplay)
function levelZero() {
  levelAsteroids = [];
  let level = [];
  flagPos = createVector(-999999, -999999);
}

// Make level 1
function levelOne() {
  levelAsteroids = [];
  // let level = [
  // [3570, 4850],
  // [3790, 4630],
  // [3970, 4400],
  // [4210, 4130],
  // [4480, 3920],
  // [4730, 3720],
  // [4920, 3560],
  // [5110, 3380],
  // [5360, 3200],
  // [5600, 3000],
  // [5780, 2860],
  // [6020, 2730]
  // ]
  let level = [];
  for (let i = height * 3; i < height * 7; i += 60) {
    level.push([width * 5, i]);
  }
  for (let i = 0; i < level.length; i ++) {
    levelAsteroids.push(createVector(level[i][0], level[i][1]));
  }
  flagPos = createVector(width * 10 - 200, height * 5);
}

function levelTwo(){
  let level = [];
  levelAsteroids = []
  let inc = 1
  for (let x=width*3;x<width*7;x+=60) {
    level.push([x, inc*inc+height*4]);
    inc+=0.5
  }
  for (let x=width*3;x<width*7;x+=60) {
    level.push([x, inc*inc+height*4]);
    inc-=0.5
  }
  for (let i = 0; i < level.length; i ++) {
    levelAsteroids.push(createVector(level[i][0], level[i][1]));
  }
  flagPos = createVector(width * 10 - 200, height * 5);
}

function levelThree(){
  
}

