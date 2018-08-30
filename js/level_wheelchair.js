class LevelWheelchair extends GameState{
    preload() {
        this.game.load.image('spritesheet_ground','assets/tilemaps/newTilesets/spritesheet_ground1.png');
        this.game.load.image('tileset','assets/tilemaps/newTilesets/tileset-42x42.png');
        this.game.load.image('tree1','assets/images/gothic/tree-1.png');
        this.game.load.image('tree2','assets/images/gothic/tree-2.png');
        this.game.load.image('statue','assets/images/gothic/statue.png');
        this.game.load.image('bush_large','assets/images/gothic/bush-large.png');
        this.game.load.image('bush_small','assets/images/gothic/bush-small.png');
        this.game.load.image('sky','assets/images/gothic/background.png');
        this.game.load.tilemap('levelWheelchair', 'assets/tilemaps/newMaps/mapWheelchair.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('mage', 'assets/sprites/mage.png', 64, 64)
        this.game.load.spritesheet('wheelchair', 'assets/sprites/rpg_wheelchair_without_background1.png', 35, 54)
        this.game.load.spritesheet('blind', 'assets/sprites/blindguy.png', 56, 120)
    }
    
    create(){
        this.flag = 0
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
             
        // let skyWidth = this.game.cache.getImage('sky').width
        // let skyHeight = this.game.cache.getImage('sky').height
        // this.sky = this.game.add.tileSprite(
        //     0, 0, skyWidth, skyHeight, 'sky')
        // this.sky.scale.x = this.game.width / this.sky.width
        // this.sky.scale.y = this.game.height / this.sky.height
        // this.sky.fixedToCamera = true
            
        // this.game.add.image(2100,220,'tree1')
        // this.game.add.image(2300,255,'statue')
        // this.game.add.image(2400,220,'tree2')
        // this.game.add.image(2700,265,'bush_large')
        // this.game.add.image(2800,220,'tree2')
        // this.game.add.image(2900,265,'bush_large')
        // this.game.add.image(3100,265,'bush_large')
        // this.game.add.image(3200,220,'tree1')
        // this.game.add.image(3400,265,'bush_large')
            
        this.createTileMap()
        this.game.image = this.game.add.sprite(50, 50, 'heart')
        this.game.image.scale.x = 0.15
        this.game.image.scale.y = 0.15
        this.game.image.anchor.set(0.5)
        this.game.image.fixedToCamera = true; 
        this.hud = {text1: this.createText(80, 50, ' x 3')}
        this.updateHud()
            
        if(this.game.CHOSEN_CHARACTER == 'mage'){
            this.player = new Mage(this.game, 10,90, 'mage')
            this.game.add.existing(this.player)
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
            this.game.camera.atLimit.y = false
        }else if(this.game.CHOSEN_CHARACTER == 'wheelchair'){
            this.player = new Wheelchair(this.game, 10, 90, 'wheelchair')
            this.game.add.existing(this.player)
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
            this.game.camera.atLimit.y = false
        }else if(this.game.CHOSEN_CHARACTER == 'blind'){
            this.player = new Blind(this.game, 10, 90, 'blind')
            this.game.add.existing(this.player)
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
            this.game.camera.atLimit.y = false
        }

        
        console.log(this.game.CHOSEN_CHARACTER)

    }

    createText(x, y, text, size=16, color='white') {
        var style = { font: `bold ${size}px Arial`, fill: color}
        var obj = this.game.add.text(x, y, text, style)
        obj.stroke = '#000000'
        obj.strokeThickness = 4
        obj.anchor.setTo(0.5, 0.5)
        obj.fixedToCamera = true
        return obj
    }

    createHud(){
        this.game.image = this.game.add.sprite(50, 50, 'heart')
        this.game.image.scale.x = 0.15
        this.game.image.scale.y = 0.15
        this.game.image.anchor.set(0.5)
        this.game.image.fixedToCamera = true;
        this.game.hud = {
            lives: this.createText(80, 50, ' x 3')
        }
    }

   

    createTileMap() {
        // TODO implementar leitura do arquivo de tilemap e objetos
        this.map = this.game.add.tilemap('levelWheelchair')
        this.map.addTilesetImage('spritesheet_ground')
        this.map.addTilesetImage('tileset')

        this.mapLayer = this.map.createLayer('Tiles Layer 1')
        this.map.setCollisionBetween(1, 100, true, 'Tiles Layer 1')
        this.map.setCollisionBetween(102, 128, true, 'Tiles Layer 1')
        this.map.setTileIndexCallback(101, this.collideRamp, this)
        this.map.setTileIndexCallback(142, this.touchFlag, this)

        this.mapLayer.resizeWorld()
    }
    
    updateHud() {
        this.hud.text1.text = ` x: ${this.game.lives}`
    }

    touchFlag(){
        this.state.start('Win')
    }

    collideRamp(){
        this.player.canJump = false
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            this.player.position.y = this.player.position.y - 6
        else
            this.player.position.y = this.player.position.y + 4
    }

    update(){
        this.flag++

        if(this.flag > 2){
            this.player.body.gravity.y = 750
            this.flag = 0
        }

        this.game.physics.arcade.collide(this.player, this.mapLayer);

        if(this.player.body.onFloor())
            this.player.canJump = true
        else
            this.player.canJump = false

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            this.game.levelAtual = this.game.levelAtual -1  
            this.game.lives = this.game.lives - 1  
            this.state.start("CharacterSelection")
        }

        if(this.player.position.y > 750){
            this.game.lives--
            if(this.game.lives <=0){
                this.game.state.start('Gameover')
            }else{
                this.game.state.start(this.game.state.current)
                console.log("bla")
            }
        }
    }

    render(){
        this.debug()
    }

    debug(){
        // this.game.debug.bodyInfo(this.player, 32, 32);
        // this.game.debug.body(this.player);
    }

}