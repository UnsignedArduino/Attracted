const width = 1280;
const height = 720;
const fps = 60;

let att;
let player;
let paused = false;

function setup() {
  createCanvas(width, height);
  frameRate(fps);
  player = new Player(300, 300, 5);
  att = new Attractor(width / 2, height / 2, 50);
}

function draw() {
    background(56);

    if (!paused) {
        att.attract(player);
        player.update()
    }
    
    att.show()
    player.show()

    att.pos = createVector(mouseX, mouseY);
}

function keyPressed() {
    if (keyCode == 32) {
        paused = !paused;
    }
}
