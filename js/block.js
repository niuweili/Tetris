function Block(){
    this.type = ["I","L","S","Z","O","J","T"][parseInt(Math.random() * 7)];
    this.directionNumber = block_json[this.type].length;
    this.direction = parseInt(Math.random() * this.directionNumber);
    this.code = block_json[this.type][this.direction];
    this.row = 0;
    this.col = 4;
}
Block.prototype.render = function(){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(this.code[i][j] != 0){
                game.getClass(this.row + i,this.col + j,this.type)
            }
        };
    };
}
Block.prototype.down = function(){
    game.map.code[0].forEach(function(item){
        if(item != 0){
            clearInterval(game.timer);
            alert("游戏结束~");
            return;
        }
    });
    if(this.check(this.row + 1, this.col)){
        this.row ++;
    }else{
        this.addDie();
        game.block = new Block();
        this.clear();
    }
}
Block.prototype.left = function(){
    if(this.check(this.row, this.col - 1)){
        this.col --;
    }
}
Block.prototype.right = function(){
    if(this.check(this.row, this.col + 1)){
        this.col ++;
    }
}
Block.prototype.bottom = function(){
    if(this.check(this.row + 1, this.col)){
        this.row ++;
    }
}
Block.prototype.goDown = function(){
    while(this.check(this.row + 1, this.col)){
        this.row ++;
    }
}
Block.prototype.rotate = function(){
    var oldDiretion = this.direction;
    if(this.direction == this.directionNumber - 1){
        this.direction = 0
    }else{
        this.direction ++;
    }
    this.code = block_json[this.type][this.direction];
    if(!this.check(this.row, this.col)){
        this.direction = oldDiretion;
        this.code = block_json[this.type][this.direction];
    }
}
Block.prototype.check = function(row,col){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0){
                return false;
            }
        };
    };
    return true;
}
Block.prototype.addDie = function(){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(this.code[i][j] != 0){
                game.map.code[this.row + i][this.col + j] = this.type;
            }
        };
    };
}
Block.prototype.clear = function(){
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 12; j++) {
            if(!game.map.code[i].includes(0)){
                game.map.code.splice(i, 1);
                game.map.code.unshift(new Array(12).fill(0));
                game.score++;
            }
        };
    };
}
