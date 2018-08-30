class Wheelchair extends Phaser.Sprite{
    constructor(game, x, y, img) {
        super(game, x, y, img)
        // this.health = config.PLAYER_HEALTH
        this.name = "Wheelchair"
        this.health = 3
        game.physics.arcade.enable(this)
        this.anchor.setTo(0.5, 0.5)
        // this.body.drag.set(config.PLAYER_DRAG)
        this.body.maxVelocity.set(400)
        this.body.mass = 0.1
        this.body.gravity.y = 750
        // this.body.allowGravity = true
        this.body.friction.setTo(0, 0)
        this.body.setSize(30, 53, 0, 0)
        this.body.collideWorldBounds = true
        this.body.allowRotation = false
        this.coins = 0
        this.canWalk = true
        this.scale.x = 1.25
        this.scale.y = 1.25

        this.canJump = true
        this.isAfraid = false

        this.X_VELOCITY = 300
        this.Y_VELOCITY = 600
        
        this.cursors = {
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            //fire: game.input.keyboard.addKey(keys.fire)
        }
        
        this.animations.add('walk', [0,1], 8, true)
        // this.animations.add('jump', [8,9,10,11], 1, false)                                                                                                                                       
        this.animations.add('idle', [0], 8, true)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        

        // this.sfx = {
        //     jump: this.game.add.audio('sfx:jump'),
        //     gameOver: this.game.add.audio('sfx:gameOver')
        // }

        // this.events.onKilled.addOnce(function () {
        //     this.body.velocity.x = 0
        //     this.visible = true
        //     this.exists = true
        //     this.animations.play('die')
        //     this.gameOver()
        // },this)
    }

    
    
    // die(){
    //     // this.body.enable = false
    //     // console.log("aeho")
    //     this.animations.play('die',4, false, true)       
        
    // }

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
    
    run_away(){
        this.animations.play('walk')
        var run = this.game.add.tween(this).to({x: 1050 }, 500)
        run.start()
        this.isAfraid = false

    }

    moveKeyboard() {
        if (!this.alive) {
            return
        }

        if(this.isAfraid){
            this.scale.x = -1.25            
            this.run_away()

        }
        else {
        if(this.canWalk){
        
            this.body.velocity.x = 0
            
            if (this.cursors.left.isDown) {
                this.scale.x = -1.25
                this.scale.y = 1.25
                this.animations.play('walk')
                
                if(this.body.onFloor())
                    this.X_VELOCITY = 300
                else
                    this.X_VELOCITY = 200
                this.body.velocity.x = -this.X_VELOCITY
            }
            else if (this.cursors.right.isDown) {
                this.scale.x = 1.25
                this.scale.y = 1.25
                this.animations.play('walk')
                if(this.body.onFloor())
                    this.X_VELOCITY = 300
                else
                    this.X_VELOCITY = 200
                this.body.velocity.x = this.X_VELOCITY
            }
            else{
                this.animations.play('idle')
            }
            
        } else {
            this.animations.play('idle')
        }    
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
        this.moveKeyboard()       
    }
}