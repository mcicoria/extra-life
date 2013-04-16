var 
    Life = require(__dirname + "/models/life"), 
    readline = require('readline');

var 
    line = 0, 
    game = new Life(), 
    str;

var rd = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    readGameData(line);
});

rd.on("close", function(){
    runGame();
});

var readGameData = function(data) {

    if(line == 0) game.maxAge = parseInt(data);
    else if(line == 1) {
        str = data.split(" ");
        game.width = parseInt(str[0]);
        game.height = parseInt(str[1]);
    }
    else game.addLine(data);
    line++;
};

var runGame = function() {
    game.runLife(true);
};