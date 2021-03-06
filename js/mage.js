class Mage extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img)
        // this.health = config.PLAYER_HEALTH
        this.health = 3
        game.physics.arcade.enable(this)
        this.anchor.setTo(0.5, 0.5)
        // this.body.drag.set(config.PLAYER_DRAG)
        this.body.maxVelocity.set(400)
        this.body.mass = 0.1
        this.body.gravity.y = 750
        // this.body.allowGravity = true
        this.body.friction.setTo(0, 0)
        this.body.setSize(23, 34, 20, 15)
        this.body.collideWorldBounds = true
        this.body.allowRotation = false
        this.coins = 0
        this.canWalk = true
        this.scale.x = 1.25
        this.scale.y = 1.25
        
        this.cursors = {
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            //fire: game.input.keyboard.addKey(keys.fire)
        }
        
        this.animations.add('walk', [12,13,13,15,16,17,18,19], 20, true)
        this.animations.add('die', [1,2,3,4,5], 4, false)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        this.animations.add('jump', [8,9,10,11], 1, false)                                                                                                                                       
        this.animations.add('idle', [0], 8, true)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        

        
    }

    
    
    

    bounce() {
        this.body.velocity.y = -config.BOUNCE_SPEED
    }

    jump() {
        if(this.canWalk){        
            if (!this.alive) {
                return
            }
            if (this.body.touching.down || this.body.onFloor()) {
                //if(this.cursors.up.isDown && this.body.onFloor()){
                    this.body.velocity.y = -650
                    this.sfx.jump.play()
                    this.animations.play('die', 1, false)
            }
    }
        
    }
    
    moveKeyboard() {
        if (!this.alive) {
            return
        }

        if(this.canWalk){
        
            this.body.velocity.x = 0            
            
            if (this.cursors.left.isDown) {
                this.scale.x = -1.25
                this.scale.y = 1.25
                this.animations.play('walk')
                this.body.velocity.x = -300
            }
            else if (this.cursors.right.isDown) {
                this.scale.x = 1.25
                this.scale.y = 1.25
                this.animations.play('walk')
                this.body.velocity.x = 300
            }
            else{
                this.animations.play('idle')
            }
            
            if(this.cursors.up.isDown && this.body.onFloor()){
                this.animations.play('jump', 1, true)
                this.body.velocity.y = -300
                // this.sfx.jump.play()
                
            }
        }else{
            this.animations.play('idle')
        }      
    }

    createText(x, y, string, size=16) {
        let style = { font: `bold ${size}px Arial`, fill: 'white' }
        let text = this.game.add.text(x, y, string, style)
        //text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.anchor.setTo(0.5, 0.5)
        text.fixedToCamera = true
        return text
    }

    gameOver() {
        this.createText(this.game.width * 1 / 2, this.game.height * 1 / 2, 'GAME OVER', 50)
        this.sfx.gameOver.play()
    }
    
    

    update() {
        // this.move()
        this.moveKeyboard()
        // console.log(this.body.onFloor())
        // console.log(this.body.blocked.right)
        
        // console.log(this.body.touching.down)
        // this.debug.body()

        
    }
    
}