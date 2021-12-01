//Game States

var PLAY = 1;
var END = 0;
var gameState = 1;

var gameOver;

var sword, swordImage;

var score = 0;

var fruitGroup, fruit, FY, fChoice, fruit1, fruit2, fruit3, fruit4;

var enemyGroup, enemy, EY, eChoice, enemy1, enemy2;

function preload(){
  swordImage = loadImage("sword.png");
 
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
 
  gameOver = loadImage("gameover.png");
 
  enemy1 = loadImage("alien1.png");
  enemy2 = loadImage("alien2.png");
}
  //load sound here



function setup() {
  createCanvas(600, 600);
  
  //creating sword
  sword = createSprite(250, 400, 30, 100);
  sword.addImage("sword", swordImage);
  sword.addImage("gameOver", gameOver);
  sword.scale = 0.7;
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  text("SCORE: "+score, 20, 20)

  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    sword.x = mouseX;
    sword.y = mouseY;
  
    // Increase score if sword touching fruit
    if(sword.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      score = score+1;
    }
   
    if(sword.isTouching(enemyGroup)){
      gameState = END;
    }
   
  } else if(gameState === END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
   
    fruitGroup.velocityY = 0;
    enemyGroup.velocityY = 0;
   
    sword.changeImage("gameOver", gameOver);
    sword.y = 250;
    sword.x = 250;
    sword.scale = 1;
  }
 
 
  fruits();
  enemies();
 
  drawSprites();
}


function fruits(){
  if(frameCount%80 === 0){
    FY = random(0, 500);
   
    fruit = createSprite(FY, -10, 30, 30);
    fruit.scale = 0.2;
   
    fChoice = Math.round(random(1, 4));
    switch(fChoice){
      case 1: fruit.addImage("fruit1", fruit1);
      break;
     
      case 2: fruit.addImage("fruit2", fruit2);
      break;
     
      case 3: fruit.addImage("fruit3", fruit3);
      break;
     
      case 4: fruit.addImage("fruit4", fruit4);
      break;
       
    }
   
    fruit.lifetime = 51;
    fruit.velocityY = 10;
   
    fruitGroup.add(fruit);
  }
}


function enemies(){
  if(frameCount%200 === 0){
    EY = random(0, 500);
   
    enemy = createSprite(EY, -10, 30, 30);
   
    eChoice = Math.round(random(1, 2));
   
    switch(eChoice){
      case 1: enemy.addImage("enemy1", enemy1);
        enemy.scale = 0.4;
      break;
     
      case 2: enemy.addImage("enemy2", enemy2);
        enemy.scale = 0.07;
      break;
    }
   
    enemy.velocityY = 10;
    enemy.lifetime = 51;
   
    enemyGroup.add(enemy);
  }
 
}