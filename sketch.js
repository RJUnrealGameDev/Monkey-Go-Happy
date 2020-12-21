
var monkey, monkey_running
var food, foodImage, obstacle, obstacleImage
var mainGround, bounceBar, invisibleGround;
var obsGroup, foodGroup, obstacleGroup;
var score;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  foodImage = loadImage("banana.png");
 
}

function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(60,350);
  mainGround = createSprite(300,415,600,10);
  obstacles = createSprite(550,370,100,100);
  food = createSprite(550,160,100,100);
  bounceBar = createSprite(250,110,500,10);
  invisibleGround = createSprite(300,420,600,10);
  
  monkey.addAnimation("monkey", monkey_running);
  obstacles.addImage("obstacles", obstacleImage);
  food.addImage("food", foodImage);
  
  obsGroup = new Group()
  foodGroup = new Group();
  
  bounceBar.visible = false;
  
  score = 0;
  
  if (monkey.isTouching(food)){
    foodGroup.destroyEach();
    score = score + 1;
  }
}

function draw() {
  
  background("lightBlue");

  monkey.scale = 0.2;
  obstacles.scale = 0.27;
  food.scale = 0.1;
  
  obstacles.velocityX = - 5;
  food.velocityX = -3;
  
  if (frameCount % 160 === 0){
    spawnObs();
  }
  else if (frameCount % 150 === 0){
    spawnFood();  
  }
  
  if (monkey.isTouching(food)){
    score = score + 1;
    foodGroup.destroyEach();
  }
  
  if (keyDown("space")){
    monkey.velocityY = -4;
  }
  
  monkey.collide(obsGroup);
  monkey.collide(obstacles);
  
  monkey.depth = food.depth;
  monkey.depth = obstacles.depth;
  
  monkey.setCollider("rectangle",0,0,450,550);
  obstacles.setCollider("circle",0,0,190);
  
  monkey.bounceOff(bounceBar);
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  text("Score: ",425,50);
  text(score,465,50);
}

function spawnObs(){
  obstacles = createSprite(600,370,100,100);
  obstacles.addImage("obstacles", obstacleImage);
  obstacles.scale = 0.01;
  obstacles.lifetime = 160;
  obsGroup.add(obstacles);
}

function spawnFood(){
  food = createSprite(600,160,100,100);
  food.addImage("food", foodImage);
  food.scale = 0.1;
  food.lifetime = 220;
  foodGroup.add(food);
}


  

