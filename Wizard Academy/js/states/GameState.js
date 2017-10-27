var WizardAcademy = WizardAcademy || {};

WizardAcademy.GameState = {
    // Initialize game settings
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.y = 1000;
        this.game.world.setBounds(0, 0, 2080, 1280);
        
        this.PLAYER_SPEED = 200;
    },
    // Load game assets before game starts
    preload: function() {
        this.load.tilemap('level_1', 'assets/tilemaps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset', 'assets/tilesets/WizardAcademy.png');
        this.load.image('rain_1', 'assets/sprites/rain1.png');
        this.load.image('rain_2', 'assets/sprites/rain2.png');
        this.load.spritesheet('player', 'assets/sprites/player.png', 64, 57);
        this.load.spritesheet('wizard', 'assets/sprites/wizard.png', 64, 57);
        this.load.image('firebolt', 'assets/sprites/firebolt.png', 44, 14);
        this.load.image('crosshair', 'assets/sprites/crosshair.png');
    },
    // Executes after everything is loaded
    create: function() {
        // Background
        this.background1 = this.add.tileSprite(0, 0, 2080, 1280, 'rain_1');
        this.background2 = this.add.tileSprite(0, 0, 2080, 1280, 'rain_2');
        
        this.background1.autoScroll(0, 45);
        this.background2.autoScroll(0, 60);
        
        // Tilemap
        this.map = this.add.tilemap('level_1');
        this.map.addTilesetImage('tileset');
        
        this.mapLayerWall = this.map.createLayer('Wall');
        this.mapLayerPlatforms = this.map.createLayer('Platforms');
        
        this.map.setCollisionBetween(1, 12, true, 'Platforms');
        this.playerStartX = this.map.objects['SpawnPoints'][0].x;
        this.playerStartY = this.map.objects['SpawnPoints'][0].y;
        
        // Player
        this.player = this.add.sprite(this.playerStartX, this.playerStartY, 'player');
        this.player.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.player);
        this.player.body.setSize(20, 44, 22, 10);
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        
        this.player.isAttacking = false;
        this.player.direction = 'right';
        
        // Firebolt
        this.firebolt = this.game.add.weapon(20, 'firebolt');
        
        this.firebolt.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.firebolt.bulletSpeed = 300;
        this.firebolt.fireRate = 500;
        this.firebolt.trackSprite(this.player, 0, 10);
        
        // Crosshair
        this.crosshair = this.add.sprite();
        
        // Camera
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.15, 0.15);
        
        // Controls
        this.keyMoveLeft = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);   
        this.keyMoveRight = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);    
        this.keyJump = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.keyAttack = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // Animation
        this.player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 15, true);
        this.player.animAttack = this.player.animations.add('attack', [12, 13, 14, 15, 16], 15, false);
        this.player.animAttack.onStart.add(function() {
            this.isAttacking = true;
        }, this.player);
        this.player.animAttack.onComplete.add(function() {
            this.isAttacking = false;
            this.frame = 0;
        }, this.player);
    },
    // Runs every frame
    update: function() {
        // Debugging
        //this.game.debug.body(this.player);
        //this.firebolt.debug();
        
        // Map collision
        this.physics.arcade.collide(this.player, this.mapLayerPlatforms);
        
        // Player controls
        if (this.keyMoveLeft.isDown) {
            this.player.scale.setTo(-1, 1);
            this.player.direction = 'left';
            if (!this.player.isAttacking) {
                this.player.body.velocity.x = -this.PLAYER_SPEED;
                this.player.animations.play('run');
            }
        } else if (this.keyMoveRight.isDown) {
            this.player.scale.setTo(1, 1);
            this.player.direction = 'right';
            if (!this.player.isAttacking) {
                this.player.body.velocity.x = this.PLAYER_SPEED;
                this.player.animations.play('run');
            }
        } else {
            this.player.body.velocity.x = 0;
            if (!this.player.isAttacking) {
                this.player.frame = 0;
            }
        }
        
        if (this.keyJump.isDown && this.player.body.onFloor() && !this.player.isAttacking) {
            this.player.body.velocity.y = -this.PLAYER_SPEED*2;
        }
        
        if (this.keyAttack.isDown) {
            if (this.keyAttack.justPressed()) {
                this.attack(this.player, this.firebolt);    
            }
        }
    },
    // Cast spell
    attack: function(player, spell) {
        player.animations.play('attack');
        if (player.direction == 'left') {
            spell.fireAngle = Phaser.ANGLE_LEFT;
        } else {
            spell.fireAngle = Phaser.ANGLE_RIGHT;
        }
        spell.fire();
    }
}