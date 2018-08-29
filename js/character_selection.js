class CharacterSelection extends GameState {

     preload() {
          this.game.load.image("red_ball", "assets/sprites/red_ball.png");
          this.game.load.image("blue_ball", "assets/sprites/blue_ball.png");
          this.game.load.image("purple_ball", "assets/sprites/purple_ball.png");
          this.game.load.image("transp", "assets/sprites/transp.png");
          this.game.load.image("button", "assets/sprites/next.png");
     }

     create() {  
          this.current_char = 0
          this.characters = ["red_ball", "blue_ball", "purple_ball"];
          this.char_sprite = this.game.add.sprite(this.game.width/2, this.game.height/2 - 50, this.characters[this.current_char])

          this.game.stage.backgroundColor = "#000044"; 
          this.game.add.text(this.game.width / 2, 50, "Select your ball", {font: "18px Arial", fill: "#ffffff"}).anchor.set(0.5);

          // next character          
          this.next_button = this.game.add.sprite(this.game.width/2 + 200, this.game.height/2 + 100, 'button');
          this.next_button.scale.set(0.3)
          this.next_button.anchor.set(0.5)
          this.next_button.inputEnabled = true
          this.next_button.events.onInputDown.add(this.next_char, this)

          // previous character
          this.previous_button = this.game.add.sprite(this.game.width/2 - 200, this.game.height/2 + 100, 'button');
          this.previous_button.scale.set(0.3)
          this.previous_button.scale.x *= -1
          this.previous_button.anchor.set(0.5)
          this.previous_button.inputEnabled = true
          this.previous_button.events.onInputDown.add(this.previous_char, this)

     }

     next_char(){
          if(this.current_char == this.characters.length - 1)
               this.current_char = 0
          else
               this.current_char += 1
          console.log(this.characters[this.current_char])
     }

     previous_char(){
          if(this.current_char == 0)
               this.current_char = this.characters.length - 1 
          else
               this.current_char -= 1

//          console.log(this.characters[this.current_char])
     }

     render(){
          //this.char_sprite.parent.remove(this.char_sprite)
          console.log(this.characters[this.current_char])
          this.char_sprite.destroy()
          this.char_sprite = this.game.add.sprite(this.game.width/2, this.game.height/2 - 50, this.characters[this.current_char])
          //this.char_sprite.loadTexture(this.characters[this.current_char], 0)
     }

     update() {
          this.render()


     }
}