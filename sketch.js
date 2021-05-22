var bow , arrow,  scene;

var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;

var red_balloonGroup ,blue_balloonGroup ,pink_balloonGroup ,green_balloonGroup ,arrowsGroup ,gameOverSound;

var balloonSound,gameOverImage;


var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  
  bowImage = loadImage("bow0.png");
  
  red_balloonImage = loadImage("red_balloon0.png");

  green_balloonImage = loadImage("green_balloon0.png");
  
  pink_balloonImage = loadImage("pink_balloon0.png");
  
  blue_balloonImage = loadImage("blue_balloon0.png");
  
  gameOverImage = loadImage("PngItem_214429.png");
  
  balloonSound = loadSound("8d82b5_Balloon_Pops_Sound_Effect.mp3"); 
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0 
  
  arrowsGroup = new Group();
  red_balloonGroup = new Group();
  blue_balloonGroup = new Group();
  pink_balloonGroup = new Group();
  green_balloonGroup = new Group();
  
}

function draw() {
  background(0);
  
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.3;
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    
    // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
    // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
  }
    //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }  
  if(arrowsGroup.isTouching(red_balloonGroup)){
    red_balloonGroup.destroyEach();
    arrowsGroup.destroyEach();
    score = score+2;
    balloonSound.play();
  }
  if(arrowsGroup.isTouching(blue_balloonGroup)){
    blue_balloonGroup.destroyEach();
    arrowsGroup.destroyEach();
    score = score+4;
    balloonSound.play();
  }
  if(arrowsGroup.isTouching(green_balloonGroup)){
    green_balloonGroup.destroyEach();
    arrowsGroup.destroyEach();
    score = score+6;
    balloonSound.play();
  }
  if(arrowsGroup.isTouching(pink_balloonGroup)){
    pink_balloonGroup.destroyEach();
    arrowsGroup.destroyEach();
    score = score+8;
    balloonSound.play();

  }
   if(score >= 96){
     gameState = END;
   }
  } 
  else if(gameState === END){
    red_balloonGroup.setVelocityXEach(0);
    blue_balloonGroup.setVelocityXEach(0);
    green_balloonGroup.setVelocityXEach(0);
    pink_balloonGroup.setVelocityXEach(0);
    scene.velocityX = 0;
    gameOver.visible = true;
    
  }
  //moving bow
  bow.y = World.mouseY
    
  drawSprites();
  textSize(20);
  text("Score: "+ score, 300,50);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
   
  arrowsGroup.add(arrow);
}

function redBalloon() {
  var red_balloon = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red_balloon.addImage(red_balloonImage);
  red_balloon.velocityX = 5;
  red_balloon.lifetime = 150;
  red_balloon.scale = 0.1;
  
  red_balloonGroup.add(red_balloon);
}

function blueBalloon() {
  var blue_balloon = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue_balloon.addImage(blue_balloonImage);
  blue_balloon.velocityX = 5;
  blue_balloon.lifetime = 150;
  blue_balloon.scale = 0.1;
  
  blue_balloonGroup.add(blue_balloon);
}

function greenBalloon() {
  var green_balloon = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green_balloon.addImage(green_balloonImage);
  green_balloon.velocityX = 5;
  green_balloon.lifetime = 150;
  green_balloon.scale = 0.1;
  
  green_balloonGroup.add(green_balloon);
  
}

function pinkBalloon() {
  var pink_balloon = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink_balloon.addImage(pink_balloonImage);
  pink_balloon.velocityX = 5;
  pink_balloon.lifetime = 150;
  pink_balloon.scale = 1.4;
  
  pink_balloonGroup.add(pink_balloon);
  
}
