var demo = {};
var centerX = 1280 / 2;
var centerY = 900 / 2;
var steve;
var speed = 5;

demo.state0 = function () {};
demo.state0.prototype = {
    preload: function () {
        game.load.spritesheet('steve', 'assets/spritesheets/steve_sheet.png', 270, 280);
        game.load.image('background', 'assets/backgrounds/dirt_path.png');
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#adfff2';
        console.log('state0');
        addChangeStateEventListeners();
        game.world.setBounds(0, 0, 1800, 900);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        var dirtPath = game.add.sprite(0, 0, 'background');
        steve = game.add.sprite(centerX, centerY, 'steve');
        steve.anchor.setTo(0.5, 0.5);
        steve.scale.setTo(0.5, 0.5);
        game.physics.enable(steve);
        steve.body.collideWorldBounds = true;
        steve.animations.add('run', [0, 1]);

        game.camera.follow(steve);
        game.camera.deadzone = new Phaser.Rectangle(centerX - 200, 0, 400, 900);
    },
    update: function () {
        if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            steve.scale.setTo(0.5, 0.5);
            steve.x += speed;
            steve.animations.play('run', 5, true);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            steve.scale.setTo(-0.5, 0.5);
            steve.x -= speed;
            steve.animations.play('run', 5, true);
        } else {
            steve.animations.stop('run');
            steve.frame = 0;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            steve.y -= speed;
            steve.animations.play('run', 5, true);
            if (steve.y < 400) {
                steve.y = 400;
            }
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            steve.y += speed;
            steve.animations.play('run', 5, true);
        }
    }
};

function changeState(i, stateNum) {
    console.log(i);
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners() {
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
    addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
    addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
    addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
    addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
    addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}
