var game = new Phaser.Game(1280, 720, Phaser.AUTO);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.start('state1');
