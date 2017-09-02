// Create our 'main' state that will contain the game
var mainState = {
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // change background color to blue
        game.stage.backgroundColor = '#71c5cf';

        // set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // display bird at position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');

        // add physics to the bird
        // needed for movement, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);

        // add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = game.add.group();
    },

    update: function () {
        // This function is called 60 times per second
        // It contains the game's logic

        // If the bird is out of the screen, call 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame()
        }
    },

    // make the bird jump
    jump: function () {
        // add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },

    // restart the game
    restartGame: function () {
        // start the 'main' state, which restarts the game
        game.state.start('main');
    },

    addOnePipe: function (x, y) {
        // Create a pipe at the position of x and y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Add the pipe to our previously created group
        this.pipes.add(pipe);

        // Enable physics on the pipe
        game.physics.arcade.enable(pipe);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        // Automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function () {
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;

        // Add the 6 pipes
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++) {
            if (i != hole && i != hole + 1) {
                this.addOnePipe(400, i * 60 + 10);
            }
        }
    }
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
