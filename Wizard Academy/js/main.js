var WizardAcademy = WizardAcademy || {};

// Initiate Phaser framework
WizardAcademy.game = new Phaser.Game('100%', '100%', Phaser.AUTO);

WizardAcademy.game.state.add('GameState', WizardAcademy.GameState);
WizardAcademy.game.state.start('GameState');