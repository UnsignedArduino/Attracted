const width = 1280;
const height = 720;

let att;
let player;

function setup() {
  createCanvas(width, height);
  player = new Player(300, 300, 5);
  att = new Attractor(width / 2, height / 2, 50);
}

function draw() {
    background(56);
    att.attract(player);
    player.update()

    att.show()
    player.show()
}
