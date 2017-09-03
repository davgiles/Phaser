demo.state8 = function () {};
demo.state8.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = 'ffffff';
        console.log('state8');
        
        addChangeStateEventListeners();
    },
    update: function () {}
};
