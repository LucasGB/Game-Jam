class CharacterSelection extends GameState {

     preload() {
          this.game.load.image("red_ball", "assets/sprites/red_ball.png");
          this.game.load.image("blue_ball", "assets/sprites/blue_ball.png");
          this.game.load.image("purple_ball", "assets/sprites/purple_ball.png");
          this.game.load.image("transp", "assets/sprites/transp.png");
          this.game.load.image("button", "assets/sprites/next.png");
          this.game.load.image("play_button", "assets/sprites/botao_jogar.png");
          this.game.load.spritesheet('wheelchair', 'assets/sprites/rpg_wheelchair_without_background1.png', 35, 54)
          this.game.load.spritesheet('mage', 'assets/sprites/mage.png', 64, 64)
          this.game.load.spritesheet('blind', 'assets/sprites/blindguy.png', 56, 120)

          
     }

     create() {  
          this.level_name = ['LevelBlind','LevelWheelchair']
          this.game.levelAtual = this.game.levelAtual+1
          this.current_char = 0
          this.characters = ["wheelchair", 'blind'];
          this.char_sprite = this.game.add.sprite(this.game.width/2, this.game.height/2 - 50, this.characters[this.current_char])

          this.game.stage.backgroundColor = "#000044"; 
          this.game.add.text(this.game.width / 2, 50, "Selecione seu herói", {font: "18px Arial", fill: "#ffffff"}).anchor.set(0.5);

          // next character button
          this.next_button = this.game.add.sprite(this.game.width/2 + 200, this.game.height/2 + 100, 'button');
          this.next_button.scale.set(0.3)
          this.next_button.anchor.set(0.5)
          this.next_button.inputEnabled = true
          this.next_button.events.onInputDown.add(this.next_char, this)

          // previous character button
          this.previous_button = this.game.add.sprite(this.game.width/2 - 200, this.game.height/2 + 100, 'button');
          this.previous_button.scale.set(0.3)
          this.previous_button.scale.x *= -1
          this.previous_button.anchor.set(0.5)
          this.previous_button.inputEnabled = true
          this.previous_button.events.onInputDown.add(this.previous_char, this)


          // Character Name
          var style = { font: "32px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: this.game.width, align: "center" };

          this.char_name = this.game.add.text(this.game.width/2, this.game.height/2 + 100, this.characters[this.current_char], style);
          this.char_name.anchor.set(0.5);

          // Play button
          this.play_button = this.game.add.sprite(this.game.width/2, this.game.height/2 + 225, 'play_button');
          this.play_button.scale.set(0.8)
          this.play_button.anchor.set(0.5)
          this.play_button.inputEnabled = true
          this.play_button.events.onInputDown.add(this.play, this)

     }

     next_char(){
          if(this.current_char == this.characters.length - 1)
               this.current_char = 0
          else
               this.current_char += 1
     }

     previous_char(){
          if(this.current_char == 0)
               this.current_char = this.characters.length - 1 
          else
               this.current_char -= 1
     }

     play(){
          this.game.CHOSEN_CHARACTER = this.characters[this.current_char]
          // this.state.start('levelWheelchair')
          this.state.start(this.level_name[this.game.levelAtual])
     }

     render(){
          this.char_sprite.destroy()
          this.char_sprite = this.game.add.sprite(this.game.width/2, this.game.height/2 - 50, this.characters[this.current_char])
          this.char_name.setText(this.characters[this.current_char])
     }

     update() {
          this.render()
     }
}