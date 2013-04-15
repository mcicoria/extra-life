var Life = function(){
    var 
        that = this,
        LIFE = 1,
        DEATH = 0;

    that.width = 0;
    that.height = 0;
    that.matrix = new Array();
    that.age = 0;
    that.maxAge = 1;

    //Public methods
    that.step = function(){

        var neighbors = 0, nextAge = [], row = [];
        for(var y = 0; y < that.matrix.length; y++) {

            for(var x = 0; x < that.matrix[y].length; x++){

                neighbors = _countNeighbors(parseInt(x),parseInt(y));

                if(neighbors == 3){
                    row.push(LIFE);
                } else if(neighbors < 2 || neighbors > 3) {
                    row.push(DEATH);
                } else {
                    row.push(that.matrix[y][x]);
                }
            }

            nextAge.push(row);
            row = [];
        }

        that.matrix = nextAge;
        that.age++;
    };

    that.display = function(){
        for(var i in that.matrix) { 
            console.log(that.matrix[i].toString().replace(/,/gi," "));
        }
    };

    that.addLine = function(line){
        var vals = line.split(" ");
        for(var i in vals) vals[i] = parseInt(vals[i]);
        that.matrix.push(vals);
    };

    that.runLife = function(verbose){
        for(var i = 0; i < that.maxAge; i++) {
           
            that.step();

            if(verbose) {
                console.log("Step",that.age);
                that.display();
            }

        }
        that.display();
    };


    //Private methods
    var _countNeighbors = function(x, y){
        var count = 0;

        if(_getCell(x+1, y) == 1) count++;
        if(_getCell(x-1, y) == 1) count++;
        if(_getCell(x, y+1) == 1) count++;
        if(_getCell(x, y-1) == 1) count++;

        return count;
    };

    var _getCell = function(x, y) {

        if(x < 0) x = _getNegativeCell(x, that.width);
        if(y < 0) y = _getNegativeCell(y, that.height);

        if(x > that.width-1) x = x%that.width;
        if(y > that.height-1) y = y%that.height;

        return that.matrix[y][x];
    };

    var _getNegativeCell = function(val, max) {
        var x = val;

        x = max - ((-1 * x) % max)
        return x;
    };

    return this;
};

module.exports = Life;