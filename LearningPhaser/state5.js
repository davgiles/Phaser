demo.state5 = function () {};
demo.state5.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = '#ff0000';
        addChangeStateEventListeners();
    },
    update: function () {}
};
