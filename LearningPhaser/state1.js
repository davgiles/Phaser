demo.state1 = function () {};

var cursors;
var vel = 400;
var rocks, grass;

demo.state1.prototype = {
    preload: function () {
        game.load.tilemap('field', 'assets/tilemaps/field.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grassTiles', 'assets/tilemaps/grassTiles.png');
        game.load.image('rockTiles', 'assets/tilemaps/rockTiles.png');
        game.load.image('steve', 'assets/sprites/steve_run.png');
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#ff0000';
        addChangeStateEventListeners();

        var map = game.add.tilemap('field');
        map.addTilesetImage('grassTiles');
        map.addTilesetImage('rockTiles');

        grass = map.createLayer('grass');
        rocks = map.createLayer('rocks');

        map.setCollisionBetween(3, 11, true, 'rocks');
        map.setCollisionBetween(2, 2, true, 'grass');

        steve = game.add.sprite(200, 200, 'steve');
        steve.scale.setTo(0.2, 0.2);
        game.physics.enable(steve);

        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function () {
        game.physics.arcade.collide(steve, rocks);
        game.physics.arcade.collide(steve, grass);

        if (cursors.up.isDown) {
            steve.body.velocity.y = -vel;
        } else if (cursors.down.isDown) {
            steve.body.velocity.y = vel;
        } else {
            steve.body.velocity.y = 0;
        }
        if (cursors.right.isDown) {
            steve.body.velocity.x = vel;
        } else if (cursors.left.isDown) {
            steve.body.velocity.x = -vel;
        } else {
            steve.body.velocity.x = 0;
        }
    }
};
