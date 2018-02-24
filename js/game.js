function Game(){
    this.init();
    this.start();
    this.bindEvent();
    this.block = new Block();
    this.map = new Map();
}
Game.prototype.init = function(){
    this.$dom = $("<table></table>");
    var tr, td;
    for (var i = 0; i < 20; i++) {
        tr = $("<tr></tr>")
        for (var j = 0; j < 12; j++) {
            td = $("<td></td>");
            tr.append(td);
        };
        this.$dom.append(tr)
    };
    $("#app").append(this.$dom)
}
Game.prototype.getClass = function(row,col,classname){
    $("tr").eq(row).children('td').eq(col).addClass(classname);
}
Game.prototype.clearClass = function(){
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 12; j++) {
            $("tr").eq(i).children("td").eq(j).attr("class","")
        };
    };
}
Game.prototype.bindEvent = function(){
    var self = this;
    $(document).keydown(function(e){
        if(e.keyCode == 37){
            self.block.left();
        }else if(e.keyCode == 38){
            self.block.rotate();
        }else if(e.keyCode == 39){
            self.block.right();
        }else if(e.keyCode == 40){
            self.block.bottom();
        }else if(e.keyCode == 32){
            self.block.goDown();
        }
    })
}
Game.prototype.start = function(){
    var self = this;
    var f = 0;
    this.score = 0;
    this.timer = setInterval(function(){
        f++;
        self.clearClass();
        self.block.render();
        self.map.render();
        f % 30 == 0 && self.block.down();
        $(".score").html("分数：" +  self.score)
    }, 20)
}   