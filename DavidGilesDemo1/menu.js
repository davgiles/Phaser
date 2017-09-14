var bg;
var startButton, helpButton, backButton;
var pop;
var steve;

var menuState0 = {
    preload: function () {
        game.load.image('titleScreen', 'assets/sprites/titleScreen.png');
        game.load.spritesheet('helpButton', 'assets/sprites/helpButton.png', 136, 53);
        game.load.spritesheet('startButton', 'assets/sprites/startButton.png', 136, 53);
        game.load.spritesheet('steveRunning', 'assets/sprites/steveHD.png', 112, 232);
        game.load.audio('pop', 'assets/audio/pop.wav');
    },

    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        bg = game.add.sprite(0, 0, 'titleScreen');
        steve = game.add.sprite(463, 75, 'steveRunning', 1);
        helpButton = game.add.button(236, 187, 'helpButton', pushHelp, this, 1, 0);      
        startButton = game.add.button(236, 244, 'startButton', pushStart, this, 1, 0);
        pop = game.add.audio('pop');
    },

    update: function () {
    }
};

var menuState1 = {
    preload: function () {
        game.load.image('helpScreen', 'assets/sprites/helpScreen.png');
        game.load.spritesheet('backButton', 'assets/sprites/backButton.png', 136, 53);
        game.load.spritesheet('startButton', 'assets/sprites/startButton.png', 136, 53);
        game.load.spritesheet('steveRunning', 'assets/sprites/steveHD.png', 112, 232);
        game.load.audio('pop', 'assets/audio/pop.wav');
    },

    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        bg = game.add.sprite(0, 0, 'helpScreen');
        steve = game.add.sprite(463, 75, 'steveRunning', 1);
        backButton = game.add.button(236, 187, 'backButton', pushBack, this, 1, 0);      
        startButton = game.add.button(236, 244, 'startButton', pushStart, this, 1, 0);
        pop = game.add.audio('pop');
    },

    update: function () {
    }
};

function pushStart () {
    game.state.start('game');
    pop.play();
}

function pushHelp () {
    game.state.start('help');
    pop.play();
}

function pushBack () {
    game.state.start('title');
    pop.play();
}