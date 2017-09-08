// Create our 'main' state that will contain the game
var mainState = {
    preload() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds

        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
        game.load.audio('jump', 'assets/jump.wav');
    },

    create() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        // change background color to blue
        game.stage.backgroundColor = '#71c5cf';

        // set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // display bird at position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');

        this.bird.anchor.setTo(-0.2, 0.5);

        // add physics to the bird
        // needed for movement, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);

        // add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = game.add.group();

        this.timer = game.time.events.loop(2000, this.addRowOfPipes, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {
            font: "30px Arial",
            fill: "#ffffff"
        });

        this.jumpSound = game.add.audio('jump');
    },

    update() {
        // This function is called 60 times per second
        // It contains the game's logic

        // If the bird is out of the screen, call 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame()
        }

        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

        // tilts bird downward
        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }
    },

    // make the bird jump
    jump() {
        if (this.bird.alive == false) {
            return;
        }

        // add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;

        this.jumpSound.play();

        // Create an animation on the bird
        // var animation = game.add.tween(this.bird); 
        // Change the angle of the bird to -20 degrees in 100 milliseconds
        // animation.to({angle: -20}, 100);
        // Start animation
        // animation.start();
        game.add.tween(this.bird).to({
            angle: -20
        }, 100).start();
    },

    // restart the game
    restartGame() {
        // start the 'main' state, which restarts the game
        game.state.start('main');
    },

    addOnePipe(x, y) {
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

    addRowOfPipes() {
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
        this.score += 1;
        this.labelScore.text = this.score;
    },

    hitPipe() {
        if (this.bird.alive == false) {
            return;
        }

        // set the alive property of bird to false
        this.bird.alive = false;

        // prevent new pipes from appearing
        game.time.events.remove(this.timer);

        // go thru all pipes and stop their movement
        this.pipes.forEach(function (p) {
            p.body.velocity.x = 0;
        }, this);
    }
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
