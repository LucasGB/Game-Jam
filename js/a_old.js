class CharSelection extends GameState {

    preload() {
        this.game.load.baseURL = '//examples.phaser.io/';
        this.game.load.crossOrigin = 'anonymous';
        this.game.load.image('dude', 'assets/sprites/blue_ball.png');
    }

    create() {
        var characters = ["warrior","wizard","spinal","guardian","sorcerer","knight","apache"];

        this.game.stage.backgroundColor = 0x221122;
''
        this.carousel = new Carousel(this.game, this.game.width/2, this.game.height/2,0.75,150, characters, 'dude', 250, 2, 500);

        var left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        left.onDown.add(function(){ this.carousel.change(-1)}, this.carousel);  

        var right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        right.onDown.add(function(){ this.carousel.change(1)}, this.carousel);  
    }

    update(){
        
    }

/*
    render() {
        this.game.debug.text(carousel1.currentIndex,32,32);
        this.game.debug.text("selection :"+carousel1.selection.label.text,32,64);
    }
*/
//Item.prototype = Object.create(Phaser.Sprite.prototype);

    

}