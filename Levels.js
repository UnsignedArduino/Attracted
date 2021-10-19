function runLevel(i) {
  // Freeplay
  if (i == 0) {
    onLevel = 0;
    levelZero();
    attractors = [];
  } else if (i == 1) {
    onLevel = 1;
    levelOne();
    attractors = [];
  } else if (i == 2) {
    onLevel = 2;
    levelTwo();
    attractors = [];
  } else if (i == 3) {
    onLevel = 3;
    levelThree();
    attractors = [];
  } else if (i == 4) {
    onLevel = 4;
    levelFour();
    attractors = [];
  }
  else if (i == 5) {
    onLevel = 5;
    levelFive();
    attractors = [];
  }
  else if (i == 6) {
    onLevel = 6;
    levelSix();
    attractors = [];
  }
  else if (i == 7) {
    onLevel = 7;
    levelSeven();
    attractors = [];
  }
  else if (i == 8) {
    onLevel = 8;
    levelEight();
    attractors = [];
  }
}

// Fill the map with asteroids
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
  flagPos = createVector(width * 10 - 500, height * 5);
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
}

function levelTwo() {
  flagPos = createVector(width * 10 - 500, height * 5);
  let level = [];
  attractors = [];
  levelAttractors = [];
  levelAsteroids = [];
  let inc = 1;
  for (let x = width * 3; x < width * 7; x += 60) {
    level.push([x, inc * inc + height * 4]);
    inc += 0.5;
  }
  for (let x = width * 3; x < width * 7; x += 60) {
    level.push([x, inc * inc + height * 4]);
    inc -= 0.5;
  }
  for (let i = 0; i < level.length; i ++) {
    levelAsteroids.push(createVector(level[i][0], level[i][1]));
  }
}

function levelThree(){
  flagPos = createVector(width * 10 - 500, height * 5);
  attractors = [];
  levelAttractors = [];
  levelAsteroids = [];

  levelAttractors.push(new Attractor(width * 5, height, 2))
  levelAttractors.push(new Attractor(width * 5, height * 9, 2))
  levelAttractors.push(new Attractor(width * 5, height * 5, 2))  

  for (let i = 0; i < levelAttractors.length; i ++) {
    levelAttractors[i].unchangeable = true;
  }
  
}


function levelFour(){
  flagPos = createVector(width * 10 - 500, height * 7);
  attractors = []
  levelAsteroids = []
  levelAttractors = []
  for (let x=0;x<width*5;x+=45){
    levelAsteroids.push(createVector(x, height*8-1/4*x))
    levelAsteroids.push(createVector(x, height*4-1/4*x))
  }
  for (let x=width*5;x<width*10;x+=45){
    levelAsteroids.push(createVector(x, height*3.6+1/4*x))
    levelAsteroids.push(createVector(x, -height*0.4+1/4*x))
  }
}

function levelFive(){
  flagPos = createVector(width * 10 - 500, height * 5);
  attractors = [];
  levelAttractors = [];
  levelAsteroids = []; 
  for (let x=-50;x<50;x+=0.5){
    levelAsteroids.push(createVector(
      x*60+width*2,
      -x*-60+height*2
    ))
  }
  for (let x=-50;x<50;x+=0.5){
    levelAsteroids.push(createVector(
      x*60+width*6,
      -x*60+height*8
    ))
  }
}


function levelSix(){
 
}

function levelSeven(){
  
}

function levelEight(){
  
}

function levelNine(){
  
}

function levelTen(){
  
}