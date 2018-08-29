class LevelTest extends GameState{
    preload() {
        this.game.load.image('spritesheet_ground','assets/tilemaps/newTilesets/spritesheet_ground1.png');
        this.game.load.image('tileset','assets/tilemaps/newTilesets/tileset-42x42.png');
        this.game.load.tilemap('level1', 'assets/tilemaps/newMaps/mapBlind.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet('mage', 'assets/sprites/mage.png', 64, 64)
        this.game.load.spritesheet('wheelchair', 'assets/sprites/rpg_wheelchair_without_background1.png', 35, 54)

        
        // this.game.load.video('Tiles Layer 1', 'assets/video/creditos.mp4');
    }
    
    create(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.createTileMap()
        // this.game.add.image(0,0,'tiles2')

        if(this.game.CHOSEN_CHARACTER == 'mage'){
            this.player = new Mage(this.game, 100, 100, 'mage')
            this.game.add.existing(this.player)
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
            this.game.camera.atLimit.y = false
        }else if(this.game.CHOSEN_CHARACTER == 'wheelchair'){
            this.player = new Wheelchair(this.game, 100, 100, 'wheelchair')
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
        // this.map.setTileIndexCallback(29, this.hitObstacle, this)
        // this.map.setTileIndexCallback(13, this.nextLevel, this)
        // this.map.setCollision(13,true, 'Tiles Layer 1')             

        
        // if(this.levelAtual == 1){
        // this.obstacles = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 45, 'saw', 0, true, true, this.obstacles, Saw)

        // this.coins = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 46, 'coin', 0, true, true, this.coins, Coin)

        // this.spiders = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 50, 'spider', 0, true, true, this.spiders, Spider)
        
        // this.bats = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 55, 'bats', 0, true, true, this.bats, Bat)

        // this.mapLayer.resizeWorld()
        // }

        // else if(this.levelAtual == 4){
        // this.obstacles = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 50, 'saw', 0, true, true, this.obstacles, Saw)

        // this.coins = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 51, 'coin', 0, true, true, this.coins, Coin)

        // this.spiders = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 45, 'spider', 0, true, true, this.spiders, Spider)
        
        // this.bats = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 52, 'bats', 0, true, true, this.bats, Bat)
        
        // this.goblins = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 45, 'goblin', 0, true, true, this.goblins, Goblin)
        
        // this.oneEyed = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 60, 'bats', 0, true, true, this.oneEyed, OneEyed)


        // this.mapLayer.resizeWorld()
        // }

        // else{
        // this.obstacles = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 50, 'saw', 0, true, true, this.obstacles, Saw)

        // this.coins = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 51, 'coin', 0, true, true, this.coins, Coin)

        // this.spiders = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 45, 'spider', 0, true, true, this.spiders, Spider)
        
        // this.bats = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 55, 'bats', 0, true, true, this.bats, Bat)
        
        // this.goblins = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 71, 'goblin', 0, true, true, this.goblins, Goblin)
        
        // this.oneEyed = this.game.add.group()
        // this.map.createFromObjects('Object Layer 1', 63, 'bats', 0, true, true, this.oneEyed, OneEyed)


        // this.mapLayer.resizeWorld()
        // }

        
    }

    update(){
        // this.game.physics.arcade.collide(this.mage, this.mapLayer);
        this.game.physics.arcade.collide(this.player, this.mapLayer);
    }

    render(){
        // this.game.debug.body(this.wheelchair)
    }
}