var game = new Phaser.Game(720, 600, Phaser.AUTO, 'verticality', {preload: preload, create: create, update: update, render: render});
var sprite1,
    sprite2,
    ground,
    cursor,
    tween,
    obstacle,
    resetBtn,
    gameOver = false;


function preload() {
  game.load.image('road', 'road.jpg');  
  game.load.image('obstacle', 'player.png');
  game.load.image('kayak', 'player.png');
  
}

function create() {

  var x = game.width/2,
      y = game.width/2;

  game.physics.setBoundsToWorld();
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Adds ground texture & start scrolling
  ground = game.add.tileSprite(0, 0, 720, 600, 'road');
  ground.autoScroll(0, 200);

  // Enable cursor keys
  cursor = game.input.keyboard.createCursorKeys();

  // Add player
  sprite1 = game.add.sprite(game.width/2, 450, 'kayak');
  sprite1.anchor.set(0.5);

  // Add player constraints
  game.physics.enable(sprite1, Phaser.Physics.ARCADE);
  sprite1.body.immovable = true;
  sprite1.checkWorldBounds = true;
  sprite1.body.collideWorldBounds = true;

  
  // Create timer to spawn obstacles
  game.time.events.repeat(Phaser.Timer.SECOND * 5, 10, createObstacle, this);
}

function createObstacle() {
  obstacle = game.add.sprite(game.world.randomX, 0, 'obstacle');
  
  game.physics.enable(obstacle, Phaser.Physics.ARCADE);

  obstacle.body.velocity.y = 200;
  obstacle.body.collideWorldBounds = true;
 
}

function update() {
  if (cursor.right.isDown) {
    var rightTween = game.add.tween(sprite1).to({x: '+100'}, 250, Phaser.Easing.Linear.None, true);
  } else if (cursor.left.isDown) {
    var leftTween = game.add.tween(sprite1).to({x: '-100'}, 250, Phaser.Easing.Linear.None, true);
  } 

  game.physics.arcade.collide(sprite1, obstacle, collisionHandler, null, this);
}

function collisionHandler(obj1, obj2) {
  
  console.log("BOOM");

  // Stop background tile movement
  ground.stopScroll();
  
  // Prevents further obstacles being spawned
  game.time.events.removeAll();

  // Display reset button on screen
  button = game.add.button(game.world.centerX, game.world.centerY, 'button', actionOnClick, this);
}

function actionOnClick() {
  console.log("Clicked!");
}

function render() {
  // game.debug.body(sprite1);
  // game.debug.body(sprite2);
}