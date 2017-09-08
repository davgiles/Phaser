var accel = 500;

demo.state5 = function () {};
demo.state5.prototype = {
    preload: function () {
        game.load.image('platform', 'assets/sprites/platform.png');
    },
    create: function () {
        game.stage.backgroundColor = '#555555';
        addChangeStateEventListeners();

        steve = game.add.sprite(centerX, 500, 'steve');
        platform = game.add.sprite(200, game.world.height - 100, 'platform');
        platformGroup = game.add.group();
        platformGroup.create(600, 400, 'platform');
        platformGroup.create(1000, 200, 'platform');

        steve.anchor.setTo(0.5, 0.5);
        steve.scale.setTo(0.25, 0.25);

        game.physics.enable([steve, platform, platformGroup]);

        steve.body.gravity.y = 600;
        steve.body.bounce.y = 0.4;
        steve.body.drag.x = 500;
        steve.body.collideWorldBounds = true;

        platform.body.immovable = true;
        platformGroup.setAll('body.immovable', true);
    },
    update: function () {
        game.physics.arcade.collide(steve, [platform, platformGroup]);

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            steve.body.acceleration.x = -accel;
            steve.scale.setTo(-0.25, 0.25);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            steve.body.acceleration.x = accel;
            steve.scale.setTo(0.25, 0.25);
        } else {
            steve.body.acceleration.x = 0;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            steve.body.velocity.y = -300;
        }
    }
};
