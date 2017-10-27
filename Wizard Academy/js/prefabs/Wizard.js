var WizardAcademy = WizardAcademy || {};

WizardAcademy.Wizard = function(game, x, y, key, health, spellWindBlast) {
    Phaser.Sprite.call(this, game, x, y, key);
    
    this.game = game;
    
    this.game.physics.arcade(this);
    
    this.anchor.setTo(0.5);
    this.health = health;
    this.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 15, true);
    this.animations.add('cast', [12, 13, 14, 15, 16], 8, false);
    
    this.spellWindBlast = spellWindBlast;
};

WizardAcademy.Wizard.prototype = Object.create(Phaser.Sprite.prototype);
WizardAcademy.Wizard.prototype.constructor = WizardAcademy.Wizard;

WizardAcademy.Wizard.prototype.update = function () {
    
}