class LevelTest extends GameState{
    preload() {
        this.game.load.image('spritesheet_ground','assets/tilemaps/newTilesets/spritesheet_ground1.png');
        this.game.load.image('tileset','assets/tilemaps/newTilesets/tileset-42x42.png');
        this.game.load.tilemap('level1', 'assets/tilemaps/newMaps/mapBlind.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('mage', 'assets/sprites/mage.png', 64, 64)
        this.game.load.spritesheet('wheelchair', 'assets/sprites/rpg_wheelchair_without_background1.png', 35, 54)
    }
    
    create(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.createTileMap()

        if(this.game.CHOSEN_CHARACTER == 'mage'){
            this.player = new Mage(this.game, 500,200, 'mage')
            this.game.add.existing(this.player)
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
            this.game.camera.atLimit.y = false
        }else if(this.game.CHOSEN_CHARACTER == 'wheelchair'){
            this.player = new Wheelchair(this.game, 500, 200, 'wheelchair')
            this.game.add.existing(this.player)
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
            this.game.camera.atLimit.y = false
        }
        console.log(this.game.CHOSEN_CHARACTER)
    }

    collideRampa(player){
        if(player.name == "Wheelchair"){
            console.log('rampa')
        }
    }

    touchFlag(){
        console.log("Flag")
    }


    createTileMap() {
        // TODO implementar leitura do arquivo de tilemap e objetos
        this.map = this.game.add.tilemap('level1')
        this.map.addTilesetImage('spritesheet_ground')
        this.map.addTilesetImage('tileset')

        this.mapLayer = this.map.createLayer('Tiles Layer 1')
        this.map.setCollisionBetween(1, 66, true, 'Tiles Layer 1')
        this.map.setCollisionBetween(68, 128, true, 'Tiles Layer 1')
        this.map.setTileIndexCallback(67, this.collideRampa, this)
        this.map.setTileIndexCallback(270, this.touchFlag, this)

        this.mapLayer.resizeWorld()
        console.log("hello")
        
    }

    collideRamp(){
        //this.mage.body.velocity.x += 0.5
        this.mage.body.gravity.y = 0
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            this.mage.position.y = this.player.position.y - 6
        else
            this.mage.position.y = this.player.position.y + 6
    }

    update(){
        this.game.physics.arcade.collide(this.player, this.mapLayer);

        if(this.player.body.onFloor()){
            this.player.body.gravity.y = 750
        }
    }

    render(){
        this.debug()
    }

    debug(){
        this.game.debug.bodyInfo(this.player, 32, 32);
        this.game.debug.body(this.player);
        // this.game.physics.arcade.collide(this.wheelchair, this.mapLayer);
    }

}