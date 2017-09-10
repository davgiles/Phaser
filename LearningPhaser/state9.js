var hsText = [];
var hs = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
var config;
var database;

demo.state9 = function () {};
demo.state9.prototype = {
    preload: function () {},
    create: function () {
        game.stage.backgroundColor = '#ff0000';
        addChangeStateEventListeners();

        config = {
            apiKey: "AIzaSyDpFr80tKIzxvsalzvR1W6Sav-Uurb54SY",
            authDomain: "phaserdemotest-9504f.firebaseapp.com",
            databaseURL: "https://phaserdemotest-9504f.firebaseio.com",
            projectId: "phaserdemotest-9504f",
            storageBucket: "phaserdemotest-9504f.appspot.com",
            messagingSenderId: "64532902339"
        };
        firebase.initializeApp(config);

        // get a reference to database service
        database = firebase.database();

        for (var i = 1; i < 11; i++) {
            game.add.text(400, 10 + (i * 80), i + '.', {
                fontSize: '40px'
            }).anchor.setTo(1, 0);
        }

        for (var i = 0; i < 10; i++) {
            hsText[i] = game.add.text(410, 10 + ((i + 1) * 80), hs[i], {
                fontSize: '40px'
            });
        }

    },
    update: function () {}
};
