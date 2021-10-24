function runLevel(i) {
  if (i == 0) {
    // Freeplay
    levelZero();
  } else if (i == 1) {
    levelOne();
  } else if (i == 2) {
    levelTwo();
  } else if (i == 3) {
    levelThree();
  } else if (i == 4) {
    levelFour();
  } else if (i == 5) {
    levelFive();
  } else if (i == 6) {
    levelSix();
  } else if (i == 7) {
    levelSeven();
  } else if (i == 8) {
    levelEight();
  } else if (i == 9) {
    levelNine();
  } else if (i == 10) {
    levelTen();
  } else if (i == 11) {
    levelEleven();
  } else if (i == 12) {
    levelTwelve();
  } else if (i == 13) {
    levelThirteen();
  } else {
    // Not even a real level
    return;
  }
  onLevel = i;
  attractors = [];
  gravityBlockers = [];
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

function levelOne() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = []
  levelAttractors = []
  levelAsteroids = []

  let level = [];
  for (let i = H * 5; i < H * 5.5; i += 60) {
    level.push([W * 5, i]);
  }
  for (let i = 0; i < level.length; i ++) {
    levelAsteroids.push(createVector(level[i][0], level[i][1]));
  }
}

function levelTwo() {
  flagPos = createVector(W * 9.5, H * 4.5);
  let level = [];
  attractors = [];
  levelAttractors = [];
  levelAsteroids = [];
  let inc = 1;
  for (let x = W * 3; x < W * 7; x += 60) {
    level.push([x, inc * inc + H * 4]);
    inc += 0.5;
  }
  for (let x = W * 3; x < W * 7; x += 60) {
    level.push([x, inc * inc + H * 4]);
    inc -= 0.5;
  }
  for (let i = 0; i < level.length; i ++) {
    levelAsteroids.push(createVector(level[i][0], level[i][1]));
  }
}

function levelThree() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAttractors = [];
  levelAsteroids = [];

  levelAttractors.push(new Attractor(W * 5, H, 2))
  levelAttractors.push(new Attractor(W * 5, H * 8, 2))
  levelAttractors.push(new Attractor(W * 5, H * 5, 2))  

  for (let i = 0; i < levelAttractors.length; i ++) {
    levelAttractors[i].unchangeable = true;
  }
}

function levelFour() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAsteroids = [];
  levelAttractors = [];
  for (let x = 0; x < W * 5; x += 45) {
    levelAsteroids.push(createVector(x, H * 8 - 1 / 4 * x));
    levelAsteroids.push(createVector(x, H * 4 - 1 / 4 * x));
  }
  for (let x = W * 5; x < W * 10; x += 45) {
    levelAsteroids.push(createVector(x, H * 3.6 + 1 / 4 * x));
    levelAsteroids.push(createVector(x, -H * 0.4 + 1 / 4 * x));
  }
}

function levelFive() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAttractors = [];
  levelAsteroids = []; 
  for (let x = -50; x < 50; x += 0.5) {
    levelAsteroids.push(createVector(
      x * 60 + W * 2,
      -x * -60 + H *2
    ));
  }
  for (let x =- 50; x < 50; x += 0.5) {
    levelAsteroids.push(createVector(
      x * 60 + W * 6,
      -x * 60 + H * 8
    ));
  }
}

function levelSix() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAttractors = [];
  levelAsteroids = []; 

  let a = 10;
  let b = 10;
  let r = 500;
  let inc = 0.5;

  for (let angle = 0; angle < 4 * PI; angle += inc) {
    let ox = W * 5;
    let oy = H * 5;
    let X = ox;
    let Y = oy + r;

    let New_X = ox + (X - ox) * cos(angle) - (Y - oy) * sin(angle);
    let New_Y = oy + (X - ox) * sin(angle) + (Y - oy) * cos(angle);
    levelAsteroids.push(createVector(New_X, New_Y));
  }
  for (let angle = 0; angle < 4 * PI; angle += inc) {
    let ox = W * 2;
    let oy = H * 2;
    let X = ox;
    let Y = oy + r;

    let New_X = ox + (X - ox) * cos(angle) - (Y - oy) * sin(angle);
    let New_Y = oy + (X - ox) * sin(angle) + (Y - oy) * cos(angle);
    levelAsteroids.push(createVector(New_X, New_Y));
  }
  for (let angle = 0; angle < 4 * PI; angle += inc) {
    let ox = W * 8;
    let oy = H * 6;
    let X = ox;
    let Y = oy + r;

    let New_X = ox + (X - ox) * cos(angle) - (Y - oy) * sin(angle);
    let New_Y = oy + (X - ox) * sin(angle) + (Y - oy) * cos(angle);
    levelAsteroids.push(createVector(New_X, New_Y));
  }
  for (let angle = 0; angle < 4 * PI; angle += inc) {
    let ox = W * 7.5;
    let oy = H * 2;
    let X = ox;
    let Y = oy + r;

    let New_X = ox + (X - ox) * cos(angle) - (Y - oy) * sin(angle);
    let New_Y = oy + (X - ox) * sin(angle) + (Y - oy) * cos(angle);
    levelAsteroids.push(createVector(New_X, New_Y));
  }
  for (let angle = 0; angle < 4 * PI; angle += 0.8) {
    let ox = flagPos.x + r / 2 + 50;
    let oy = flagPos.y + r / 2 + 50;
    let X = ox;
    let Y = oy + r;

    let New_X = ox + (X - ox) * cos(angle) - (Y - oy) * sin(angle);
    let New_Y = oy + (X - ox) * sin(angle) + (Y - oy) * cos(angle);
    levelAsteroids.push(createVector(New_X, New_Y));
  }  
}

function levelSeven() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAttractors = [];
  levelAsteroids = [];

  for (let y = H * 3; y < H * 7; y += 200) {
    levelAttractors.push(new Attractor(W * 5, y, 3));
  }
}

function levelEight() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAttractors = [];
  levelAsteroids = [];

  for (let x = 0; x < 5000; x += 30) {
    levelAsteroids.push(createVector(x + W * 3,
                        x * (sin(x / 700)) + H * 7));
  }
  for (let x = 0; x < 3000; x += 30) {
    levelAsteroids.push(createVector(x + W * 3,
                        x * (sin(x / 700)) + H * 2));
  }
}

function levelNine() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAttractors = [];
  levelAsteroids = [];
  let r = 2000;
  for (let angle = 0; angle < 4 * PI; angle += 0.2) {
    let ox = W * 5;
    let oy = H * 5;
    let X = ox;
    let Y = oy + r;

    let New_X = ox + (X - ox) * cos(angle) - (Y - oy) * sin(angle);
    let New_Y = oy + (X - ox) * sin(angle) + (Y - oy) * cos(angle);
    levelAsteroids.push(createVector(New_X, New_Y));
  }
  r = 100;
  for (let angle = 0; angle < 4 * PI; angle += 0.8) {
    let ox = W * 5 - 800;
    let oy = H * 5 - 100;
    let X = ox;
    let Y = oy + r;

    let New_X = ox + (X - ox) * cos(angle) - (Y - oy) * sin(angle);
    let New_Y = oy + (X - ox) * sin(angle) + (Y - oy) * cos(angle);
    levelAsteroids.push(createVector(New_X, New_Y));
  }
  for (let angle = 0; angle < 4 * PI; angle += 0.8) {
    let ox = W * 5 + 800;
    let oy = H * 5 - 100;
    let X = ox;
    let Y = oy + r;

    let New_X = ox + (X - ox) * cos(angle) - (Y - oy) * sin(angle);
    let New_Y = oy + (X - ox) * sin(angle) + (Y - oy) * cos(angle);
    levelAsteroids.push(createVector(New_X, New_Y));
  }
}

function levelTen() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAsteroids = [];
  levelAttractors = [];
  for (let x = 0; x < W * 5; x += 45) {
    levelAsteroids.push(createVector(x, H * 8 - 1 / 4 * x));
    levelAsteroids.push(createVector(x, H * 3.3 + 1 / 4 * x));
  }
  for (let x = W * 5; x < W * 10; x += 45) {
    levelAsteroids.push(createVector(x, H * 3.6 + 1 / 4 * x));
    levelAsteroids.push(createVector(x, H * 7.7 - 1 / 4 * x));
  }
}

function levelEleven() {
  flagPos = createVector(W * 6, H * 4.5);
  attractors = [];
  levelAsteroids = [];
  levelAttractors = [];
  for (let x = flagPos.x - 10 * 45; x < flagPos.x + 30 * 45; x += 45) {
    levelAsteroids.push(createVector(x, H * 4));
    levelAsteroids.push(createVector(x, H * 6));
  }
  for (let y = H * 4; y < H * 6; y += 45) {
    levelAsteroids.push(createVector(flagPos.x - 10 * 45, y));
  }
}

function levelTwelve() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAsteroids = [];
  levelAttractors = [];
  levelAttractors.push(new Attractor(W * 5, H * 5, 4));
  levelAttractors[0].unchangeable = true;
}

function levelThirteen() {
  flagPos = createVector(W * 9.5, H * 4.5);
  attractors = [];
  levelAsteroids = [];
  levelAttractors = [];
  for (let y = H * 0; y < H * 8; y += 45) {
    levelAsteroids.push(createVector(W * 2, y));
  }
  for (let y = H * 2; y < H * 10; y += 45) {
    levelAsteroids.push(createVector(W * 4, y));
  }
  for (let y = H * 0; y < H * 8; y += 45) {
    levelAsteroids.push(createVector(W * 6, y));
  }
  for (let y = H * 2; y < H * 10; y += 45) {
    levelAsteroids.push(createVector(W * 8, y));
  }
}
