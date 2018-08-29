'use strict'

// APP DO JOGO ///////////////////////////////////////////////////////////////////
let GAME = null

class Game extends Phaser.Game {
    constructor () {        
        // Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig)
        super(800, 600, Phaser.CANVAS, 'game-container', null, false, false)

        // adiciona estados ao jogo        
        this.state.add('MainMenu', MainMenu, false)
        this.state.add('Options', Options, false)
        this.state.add('Credits', Credits, false)
        this.state.add('Gameover', Gameover, false)
        this.state.start('MainMenu')
        this.lives = 3;
        GAME = this
    }
}

// CLASSE GENERICA DE TELAS //////////////////////////////////////////////////////

class GameState extends Phaser.State {

    initFullScreenButtons() {
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //let fullScreenButton = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        //fullScreenButton.onDown.add(this.toggleFullScreen, this)    

        // full screen touch button
        let fullScreenIcon = this.game.add.sprite(this.game.width - 10, this.game.height - 10, 
            'fullscreen-button')
        fullScreenIcon.anchor.setTo(1, 1)
        fullScreenIcon.scale.setTo(0.75, 0.75)
        fullScreenIcon.inputEnabled = true
        fullScreenIcon.events.onInputDown.add(this.listener, this)        
        fullScreenIcon.fixedToCamera = true
    }

    listener(){
        this.toggleFullScreen();
    }

    toggleFullScreen() {
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        if (this.scale.isFullScreen) {
            this.scale.stopFullScreen();
        } else {
            this.scale.startFullScreen(false);
        }
    }
}

// wrapper para acesso pelo button html
function fullScreen() {
    GAME.state.states[GAME.state.current].toggleFullScreen()
}

// cria jogo
window.onload = function() {
    // funciona como singleton
    GAME = new Game()
}