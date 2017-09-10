var arrow, startPointX, startPointY, endPointX, endPointY, swipeDirection;

demo.state7 = function () {};
demo.state7.prototype = {
    preload: function () {
        game.load.image('arrow', 'assets/sprites/arrow.png');
    },
    create: function () {
        game.stage.backgroundColor = '#000000';
        addChangeStateEventListeners();

        arrow = game.add.sprite(centerX, centerY, 'arrow');
        arrow.anchor.setTo(0.5);
        arrow.scale.setTo(4);

        game.input.onDown.add(this.startSwipe);
        game.input.onUp.add(this.getSwipeDirection);
    },
    update: function () {},
    startSwipe: function () {
        console.log(game.input.x + ' ' + game.input.y);
        startPointX = game.input.x;
        startPointY = game.input.y;
    },
    getSwipeDirection: function () {
        console.log(game.input.x + ' ' + game.input.y);
        endPointX = game.input.x;
        endPointY = game.input.y;

        if (Math.abs(endPointY - startPointY) < Math.abs(endPointX - startPointX)) {
            console.log('horizontal');
            if (endPointX > startPointX) {
                swipeDirection = 90;
            } else {
                swipeDirection = 270;
            }
        } else {
            console.log('vertical');
            if (endPointY > startPointY) {
                swipeDirection = 180;
            } else {
                swipeDirection = 0;
            }
        }

        arrow.angle = swipeDirection;
    }
};
