class Item extends Phaser.Sprite {
	constructor(game, bg, text, scale) {
        super(game, bg, text, scale)
        var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
        
        Phaser.Sprite.call(this, game, 0, 0, bg);
        this.scale.setTo(scale);
        this.label= game.add.text(this.x, this.y, text, style);
        this.label.anchor.setTo(0.5, 1);
        this.addChild(this.label);
    }

    zoom (zoomScale, zoomSpeed) {
        this.game.add.tween(this.scale).to({'x':zoomScale,'y':zoomScale}, zoomSpeed/4, "Quad", true);
    }
}