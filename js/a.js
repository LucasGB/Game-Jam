class CharSelection extends GameState {

 preload() {
    this.game.load.baseURL = '//examples.phaser.io/';
    this.game.load.crossOrigin = 'anonymous';
    this.game.load.image('dude', 'assets/sprites/blue_ball.png');
}

 create() {
    this.style={ font: "30px Arial", fill: "#ffffff", align: "center" };
    this.characters=["warrior","wizard","spinal","guardian","sorcerer","knight","apache"];
    this.carousel;

    this.game.stage.backgroundColor=0x221122;

    this.carousel=new Carousel(this.game,this.game.width/2,this.game.height/2,0.75,150,this.characters,'dude',250,2,500);

    var left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    left.onDown.add(function(){this.carousel.change(-1)}, this.carousel);  
    
    var right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    right.onDown.add(function(){this.carousel.change(1)}, this.carousel);

    main()
}


 render() {
    this.game.debug.text(this.carousel.currentIndex,32,32);
    this.game.debug.text("selection :"+this.carousel.selection.label.text,32,64);
}

main(){

var Carousel = function Carousel(game, x, y,scale, spacing,items,bg, zoomSpeed, zoomScale,moveSpeed) {
    Phaser.Group.call(this, this.game);
    this.x = x;
    this.y = y;
    this.scale.setTo(scale);
    this.spacing = spacing * scale;    
    this.items = items;
    this.zoomScale = zoomScale;
    this.zoomSpeed = zoomSpeed;
    this.moveSpeed = moveSpeed;
  
    this.items.forEach(function(item) {
        var slide = new Item(this.game, bg, item, 1);
        this.add(slide);
    }, this);
    
    this.align(items.length, 1, spacing, spacing);
    this.currentIndex = 0;
    this.previousIndex = 0;
    this.direction = 0;
    this.selection = this.children[0];
}

Carousel.prototype = Object.create(Phaser.Group.prototype);

Carousel.prototype.change=function(direction) {
    this.selection.zoom(1, this.zoomSpeed); //zoom out current object   
    this.previousIndex=this.currentIndex;
    this.currentIndex = Phaser.Math.clamp((this.currentIndex + direction), 0, this.length-1);
    this.selection = this.children[this.currentIndex];
    this.selection.zoom(this.zoomScale, this.zoomSpeed);//zoom in current object 

    //animate
    //if currentIndex is not at the boundaries animate, the direction is 1 or -1, otherwise 0
    this.direction = (this.currentIndex !=this.previousIndex)? direction: 0;
    this.game.add.tween(this).to({'x':this.x-(this.spacing*this.direction)},this.moveSpeed,"Quad",true); 
}

var Item = function (game, bg, text, scale) {
    Phaser.Sprite.call(this, this.game, 0, 0, bg);
    this.scale.setTo(scale);
    this.label= this.game.add.text(this.x, this.y, text, this.style);
    this.label.anchor.setTo(0.5, 1);
    this.addChild(this.label);
}

Item.prototype = Object.create(Phaser.Sprite.prototype);

Item.prototype.zoom= function(zoomScale, zoomSpeed){
    this.game.add.tween(this.scale).to({'x':zoomScale,'y':zoomScale}, zoomSpeed/4, "Quad", true);
}

}

}