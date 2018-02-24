function Map(){
    var arr = []
    this.code = (function(){
        for (var i = 0; i < 20; i++) {
            arr.push([]);
            for (var j = 0; j < 12; j++) {
                arr[i].push(0)
            };
        };
        arr.push(Array(12).fill(1))
        return arr;
    })()
    console.log(this.code)
         
}
Map.prototype.render = function(){
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 12; j++) {
            if(this.code[i][j] != 0){
                game.getClass(i, j, this.code[i][j])
            }
        };
    };
}