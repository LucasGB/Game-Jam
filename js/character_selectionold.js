class CharacterSelection extends GameState {

     preload() {
          this.game.load.image("red_ball", "assets/sprites/red_ball.png");
          this.game.load.image("blue_ball", "assets/sprites/red_ball.png");
          this.game.load.image("purple_ball", "assets/sprites/red_ball.png");
          this.game.load.image("transp", "assets/sprites/transp.png");
     }

     create() {  
          var balls = ["red_ball", "blue_ball", "purple_ball"];

          this.game.stage.backgroundColor = "#000044"; 
          this.game.add.text(this.game.width / 2, 50, "Select your ball", {font: "18px Arial", fill: "#ffffff"}).anchor.set(0.5);
          this.scrollingMap = this.game.add.tileSprite(0, 0, this.game.width / 2 + balls.length * 90 + 64, this.game.height, "transp");
          this.scrollingMap.inputEnabled = true;
          this.scrollingMap.input.enableDrag(false);
          this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
          this.scrollingMap.isBeingDragged = false; 
          this.scrollingMap.movingSpeed = 0; 
          this.scrollingMap.input.allowVerticalDrag = false;
          this.scrollingMap.input.boundsRect = new Phaser.Rectangle(this.game.width - this.scrollingMap.width, this.game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - this.game.width, this.scrollingMap.height * 2 - this.game.height);
          
          for(var i = 0; i < 3; i++){
               console.log(balls[i])
               var ball = this.game.add.image(this.game.width / 2 + i * 90, this.game.height / 2, balls[i]);
               ball.anchor.set(0.5);
               this.scrollingMap.addChild(ball)
          }

          this.scrollingMap.events.onDragStart.add(function(){
               this.scrollingMap.isBeingDragged = true;
               this.scrollingMap.movingSpeed = 0;
          }, this);
          this.scrollingMap.events.onDragStop.add(function(){
               this.scrollingMap.isBeingDragged = false;
          }, this);
     }

     update() {
          var zoomed = false;
          for(var i = 0; i < this.scrollingMap.children.length; i++){
               if(Math.abs(this.scrollingMap.children[i].world.x - this.game.width / 2) < 46 && !zoomed){
                    this.scrollingMap.getChildAt(i).scale.setTo(1.5);
                    zoomed = true;
               }
               else{
                    this.scrollingMap.getChildAt(i).scale.setTo(1);   
               }
          }
          if(this.scrollingMap.isBeingDragged){
               this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
          }
          else{
               if(this.scrollingMap.movingSpeed > 1){
                    this.scrollingMap.x += this.scrollingMap.movingSpeed * Math.cos(this.scrollingMap.movingangle);
                    if(this.scrollingMap.x < this.game.width - this.scrollingMap.width){
                         this.scrollingMap.x = this.game.width - this.scrollingMap.width;
                         this.scrollingMap.movingSpeed *= 0.5;
                         this.scrollingMap.movingangle += Math.PI;
                         
                    }
                    if(this.scrollingMap.x > 0){
                         this.scrollingMap.x = 0;
                         this.scrollingMap.movingSpeed *= 0.5;
                         this.scrollingMap.movingangle += Math.PI;
                    }
                    this.scrollingMap.movingSpeed *= 0.99; // friction
                    this.scrollingMap.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
               } else {
                    var distance = this.scrollingMap.savedPosition.distance(this.scrollingMap.position);
                    var angle = this.scrollingMap.savedPosition.angle(this.scrollingMap.position);
                    if(distance > 4){
                         this.scrollingMap.movingSpeed = distance * 0.7; //  Speed Mult
                         this.scrollingMap.movingangle = angle;
                    }
               }
          }
     }
}