var dog, happydog
var database
var foodS, foodStock
var happydogimg,dogimg1
var petFOOD
var fedTime,lastFed
var feed,addFood

function preload()
{
	happydogImg=loadImage("images/happydog.png")
  dog1Img=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  
  
    foodObj = new Food();
  
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);
    
    dog=createSprite(800,200,150,150);
    dog.addImage(sadDog);
    dog.scale=0.15;
    
    feed=createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);
  
    addFood=createButton("addFood");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);
  
  }
    
function draw() { 

background(46,139,87)
if(keyWentDown(UP_ARROW)){
 
  console.log(foodS)
  writeStock(foodS)
  
  dog.addImage(happydogImg)
  }
   

  textSize(25);
  fill("black");
  text("food remaining:"+ foodS,170,80);
  text("press space to feed the dog!" ,170 , 120 )

if(lastFed>=12){
  text("Last Feed:"+lastFed%12 +"PM",350,30)
}
else if(lastfed===0){
  text("Last Feed:12 AM",350,30)

}
else{
  text("Last Feed:"+lastFed+"AM",350,30)
}

drawSprites();


}
function writeStock(petFOOD){
  if(petFOOD<=0){
      petFOOD=0
  }
  else{
      petFOOD=petFOOD-1;
  }
  console.log(petFOOD)

  database.ref('/').update({
      food:petFOOD
  })
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

