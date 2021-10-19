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
  attractors = []
  levelAttractors = []
  levelAsteroids = []

  let level = [];
  for (let i = height * 5; i < height * 6; i += 60) {
    level.push([width * 5, i]);
  }
  for (let i = 0; i < level.length; i ++) {
    levelAsteroids.push(createVector(level[i][0], level[i][1]));
  }
  flagPos = createVector(width * 10 - 500, height * 5);
}

function levelTwo(){
  let level = [];
  attractors = []
  levelAttractors = []
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
  flagPos = createVector(width * 10 - 500, height * 5);
  attractors = []
  levelAttractors = []
  levelAsteroids = []

  levelAttractors.push(new Attractor(width*5, height, 2))
  levelAttractors.push(new Attractor(width*5, height*9, 2))
  levelAttractors.push(new Attractor(width*5, height*5, 2))  

  for (let i=0;i<levelAttractors.length;i++){
    levelAttractors[i].unchangeable = true
  }
}

