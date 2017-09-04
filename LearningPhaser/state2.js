demo.state2 = function () {};

var cBarrel, cBalls, cBall;
var ballVelocity = 1000;
var nextFire = 0;
var fireRate = 200;
var enemy;
var enemyGroup;

demo.state2.prototype = {
    preload: function () {
        game.load.image('cannonBase', 'assets/sprites/cannonBase.png');
        game.load.image('cannonBarrel', 'assets/sprites/cannonBarrel.png');
        game.load.image('cannonBall', 'assets/sprites/cannonBall.png');
    },
    create: function () {
        game.stage.backgroundColor = 'fff000';
        addChangeStateEventListeners();

        var cBase = game.add.sprite(centerX, centerY, 'cannonBase');
        cBase.anchor.setTo(0.5);
        cBase.scale.setTo(0.8);

        cBalls = game.add.group();
        cBalls.enableBody = true;
        cBalls.physicsBodyType = Phaser.Physics.ARCADE;
        cBalls.createMultiple(50, 'cannonBall');
        cBalls.setAll('checkWorldBounds', true);
        cBalls.setAll('outOfBoundsKill', true);
        cBalls.setAll('anchor.y', 0.5);
        cBalls.setAll('anchor.x', 0.5);

        cBarrel = game.add.sprite(centerX, centerY, 'cannonBarrel');
        cBarrel.anchor.setTo(0.5);

        enemy = game.add.sprite(100, 200, 'steve');
        game.physics.enable(enemy);

        enemyGroup = game.add.group();
        enemyGroup.enableBody = true;
        enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 5; i++) {
            enemyGroup.create(1000, 350 * i + 100, 'steve');
        }

        enemyGroup.setAll('anchor.y', 0.5);
        enemyGroup.setAll('anchor.x', 0.5);
        enemyGroup.setAll('scale.y', 0.3);
        enemyGroup.setAll('scale.x', 0.3);
    },
    update: function () {
        cBarrel.rotation = game.physics.arcade.angleToPointer(cBarrel);
        if (game.input.activePointer.isDown) {
            this.fire();
        }

        game.physics.arcade.overlap(cBalls, enemy, this.hitEnemy);
        game.physics.arcade.overlap(cBalls, enemyGroup, this.hitGroup);
    },
    fire: function () {
        if (game.time.now > nextFire) {
            nextFire = game.time.now + fireRate;
            console.log('Firing!');
            cBall = cBalls.getFirstDead();
            cBall.reset(cBarrel.x, cBarrel.y);

            game.physics.arcade.moveToPointer(cBall, ballVelocity);
        }
    },
    hitEnemy: function () {
        console.log('Hit!');
        enemy.kill();
        cBall.kill();
    },
    hitGroup: function (b, e) {
        b.kill();
        e.kill();
    }
};
