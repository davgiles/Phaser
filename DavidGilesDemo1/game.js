var SPEED = 200;
var JUMP_HEIGHT = 420;

var map, mapSky, mapGround, mapPlatforms;
var player;
var coins;
var cursors;
var scoreText, livesText;
var score = 0, lives = 3;

var gameState = {
    preload: function () {
        game.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grassTileset', 'assets/tilesets/grassTileset.png');
        game.load.spritesheet('steve', 'assets/sprites/steve.png', 15, 29);
        game.load.spritesheet('coin', 'assets/sprites/coin.png', 16, 16);
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 800, 640);
        // turn off collision on bottom edge
        game.physics.arcade.checkCollision.down = false;

        // add tilemap and tilesets to game
        map = game.add.tilemap('level1');
        map.addTilesetImage('grassTileset');

        // create map layers
        mapSky = map.createLayer('sky');
        mapGround = map.createLayer('ground');
        mapPlatforms = map.createLayer('platforms');

        // add collectable coins to game
        coins = game.add.group();
        coins.enableBody = true;
        map.createFromObjects('collectables', 15, 'coin', 0, true, false, coins);
        coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 6, true);
        coins.callAll('animations.play', 'animations', 'spin');

        // add collision for tilemap
        map.setCollisionBetween(1, 30, true, 'ground');
        map.setCollisionBetween(1, 30, true, 'platforms');

        // add player 'steve' to game
        player = game.add.sprite(50, 450, 'steve');
        player.anchor.setTo(0.5);
        // enable physics for player
        game.physics.enable(player);
        player.body.gravity.y = 800;
        player.body.bounce.y = 0.2;
        player.body.drag.x = 2000;
        player.body.collideWorldBounds = true;
        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(this.killPlayer, this);
        // add player animations
        player.animations.add('walk', [1, 2, 3, 2], 5, true);

        // create cursor keys for basic controls
        this.cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // create score text
        scoreText = game.add.text(5, 5, 'Coins Collected: ' + score + '/10', {
            font: 'bold 18px Courier',
            fill: '#000'
        });
        scoreText.fixedToCamera = true;

        // create lives text
        livesText = game.add.text(game.camera.width - 5, 5, 'Lives: ' + lives, {
            font: 'bold 18px Courier',
            fill: '#000'
        });
        livesText.anchor.set(1, 0);
        livesText.fixedToCamera = true;
    },

    update: function () {
        // make player collide with tiles
        game.physics.arcade.collide(player, [mapGround, mapPlatforms]);
        // call pickUpCoin when player is overlapping with a coin object
        game.physics.arcade.overlap(player, coins, this.pickUpCoin, null, this);

        // basic controls for player, LEFT and RIGHT for horizontal movement, UP to jump
        if (this.cursors.left.isDown) {
            player.scale.setTo(-1, 1);
            player.animations.play('walk');
            player.body.acceleration.x = -SPEED - 100;
        } else if (this.cursors.right.isDown) {
            player.scale.setTo(1, 1);
            player.animations.play('walk');
            player.body.acceleration.x = SPEED + 100;
        } else {
            player.animations.stop('walk');
            player.frame = 0;
            player.body.acceleration.x = 0;
        }
        if (this.cursors.up.isDown && player.body.onFloor()) {
            player.body.velocity.y = -JUMP_HEIGHT;
        }
        
        // limit player velocity
        if (player.body.velocity.x > SPEED) {
            player.body.velocity.x = SPEED;
        }
        if (player.body.velocity.x < -SPEED) {
            player.body.velocity.x = -SPEED;
        }
    },

    killPlayer: function () {
        lives--;
        if (lives) {
            livesText.setText('Lives: ' + lives);
            player.reset(50, 450);
        } else {
            alert('You ran out of lives. GAME OVER!');
            location.reload();
        }
    },

    pickUpCoin: function (player, coin) {
        coin.kill();
        score++;
        scoreText.setText('Coins Collected: ' + score + '/10');
        if (score === 10) {
            alert('You collected all the coins! YOU WIN!');
            location.reload();
        }
    }
};
