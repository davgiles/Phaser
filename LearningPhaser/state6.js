demo.state6 = function () {};
demo.state6.prototype = {
    preload: function () {
        game.load.image('volcano', 'assets/backgrounds/volcano.png');
        game.load.image('lava1', 'assets/sprites/lava1.png');
        game.load.image('lava2', 'assets/sprites/lava2.png');
    },
    create: function () {
        game.stage.backgroundColor = '#aaeeee';
        addChangeStateEventListeners();

        var volcano = game.add.sprite(centerX, game.world.height - 100, 'volcano');
        volcano.scale.setTo(1, 1);
        volcano.anchor.setTo(0.5, 0.5);

        var emitter = game.add.emitter(centerX, 720, 2000);
        emitter.area = new Phaser.Rectangle(0, 0, 100, 10);
        emitter.makeParticles(['lava1', 'lava2'], 0, 5000, false, true);
        emitter.maxParticleSpeed.set(300, -300);
        emitter.minParticleSpeed.set(-300, -100);
        emitter.gravity = 300;

        game.time.events.add(2000, function () {
            emitter.start(false, 10000, 10);
            game.time.events.loop(1000, function () {
                if (emitter.on) {
                    emitter.on = false;
                } else {
                    emitter.on = true;
                }
            })
        })
    },
    update: function () {}
};
