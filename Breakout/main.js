var game = new Phaser.Game(800, 800, Phaser.AUTO);

var mainState = {
    preload() {
        game.load.image('paddle', 'assets/paddle.png');
        game.load.image('brick', 'assets/brick.png');
        game.load.image('ball', 'assets/ball.png');
    },

    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#78cdd9';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        this.paddle = game.add.sprite(game.world.centerX, game.world.height - 30, 'paddle');
        this.paddle.anchor.setTo(0.5, 0.5);
        this.paddle.enableBody = true;
        this.paddle.body.collideWorldBounds = true;

    },

    update() {
        // Mouse Controls
        // this.paddle.x = game.input.x;
    }
}

game.state.add('main', mainState);
game.state.start('main');
