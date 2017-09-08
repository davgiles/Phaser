var x;

demo.state4 = function () {};
demo.state4.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = 'cc66ff';
        addChangeStateEventListeners();

        s1 = game.add.sprite(30, 100, 'steve');
        s2 = game.add.sprite(300, 100, 'steve');
        s3 = game.add.sprite(600, 100, 'steve');
        s4 = game.add.sprite(900, 100, 'steve');
        s5 = game.add.sprite(1200, 100, 'steve');

        game.add.tween(s1).to({
            y: '+600'
        }, 2000, 'Linear', true);

        x = game.add.tween(s2).to({
            x: 100,
            y: 0
        }, 1000, 'Quad.easeOut');

        game.add.tween(s3).from({
            y: 1000
        }, 1500, 'Circ.easeOut', true);

        game.add.tween(s4.anchor).to({
            x: 2
        }, 1000, 'Linear', true, 1000, false, true).loop(true);

        game.add.tween(s5).to({
            alpha: 0
        }, 2000, 'Quad.easeOut', true);
    },
    update: function () {}
};
