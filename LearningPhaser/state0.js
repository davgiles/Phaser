var demo = {};
var centerX = 1280 / 2;
var centerY = 900 / 2;
var steve;
var speed = 6;

demo.state0 = function () {};
demo.state0.prototype = {
    preload: function () {
        game.load.image('steve', 'assets/sprites/SteveRunning1.png');
    },
    create: function () {
        game.stage.backgroundColor = '#adfff2';
        console.log('state0');
        addChangeStateEventListeners();
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        steve = game.add.sprite(centerX, centerY, 'steve');
        steve.anchor.setTo(0.5, 0.5);
    },
    update: function () {
        if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            steve.x += speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            steve.x -= speed;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            steve.y -= speed;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            steve.y += speed;
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
