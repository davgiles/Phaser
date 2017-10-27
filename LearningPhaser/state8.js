var text;

WebFontConfig = {
    google: {
        families: ['Indie Flower']
    }
};

demo.state8 = function () {};
demo.state8.prototype = {
    preload: function () {
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js')
    },
    create: function () {
        game.stage.backgroundColor = '#99e6e6';
        addChangeStateEventListeners();

        text = "RICK: Listen, Morty, I hate to break it to you but what people call 'love' is just a chemical reaction that compels animals to breed. It hits hard, Morty, then it slowly fades, leaving you stranded in a failing marriage. I did it. Your parents are gonna do it. Break the cycle, Morty. Rise above. Focus on science."

        this.spellOutText(100, 100, 1000, text, 40, 40, '#ffffff', 'Indie Flower');
    },
    spellOutText: function (x, y, width, text, fontSize, speed, fill, font) {
        var sentence = game.add.text(x, y, '', {
            fontSize: fontSize + 'px',
            fill: fill,
            font: font
        });
        
        var currentLine = game.add.text(10, 10, '', {
            fontSize: fontSize + 'px',
            fill: fill,
            font: font
        });
        currentLine.alpha = 0;
        var loop = game.time.events.loop(speed, addChar);

        var index = 0;

        function addChar() {
            sentence.text += text[index];
            currentLine.text += text[index];

            if (currentLine.width > width && text[index] == ' ') {
                sentence.text += '\n';
                currentLine.text = '';
            }
            if (index >= text.length - 1) {
                game.time.events.remove(loop);
            }
            index++;
        }
    }
};
