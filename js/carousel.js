class Carousel extends Phaser.Group {

    constructor(game, x, y, scale, spacing,items,bg, zoomSpeed, zoomScale, moveSpeed) {
    	super(game, x, y, scale, spacing,items,bg, zoomSpeed, zoomScale, moveSpeed)
        Phaser.Group.call(this, game);
        this.x = x;
        this.y = y;
        this.scale.setTo(scale);
        this.spacing = spacing * scale;    
        this.items = items;
        this.zoomScale = zoomScale;
        this.zoomSpeed = zoomSpeed;
        this.moveSpeed = moveSpeed;
      
        this.items.forEach(function(item) {
            var slide = new Item(game, bg, item, 1);
            this.add(slide);
        }, this);
        
        this.align(items.length, 1, spacing, spacing);
        this.currentIndex = 0;
        this.previousIndex = 0;
        this.direction = 0;
        this.selection = this.children[0];
    }

//Carousel.prototype = Object.create(Phaser.Group.prototype);

    change(direction) {
        this.selection.zoom(1, this.zoomSpeed); //zoom out current object   
        this.previousIndex=this.currentIndex;
        this.currentIndex = Phaser.Math.clamp((this.currentIndex + direction), 0, this.length-1);
        this.selection = this.children[this.currentIndex];
        this.selection.zoom(this.zoomScale, this.zoomSpeed);//zoom in current object 

        console.log("a")
        //animate
        //if currentIndex is not at the boundaries animate, the direction is 1 or -1, otherwise 0
        this.direction = (this.currentIndex !=this.previousIndex)? direction: 0;
        game.add.tween(this).to({'x':this.x-(this.spacing*this.direction)},this.moveSpeed,"Quad",true); 
    }
}