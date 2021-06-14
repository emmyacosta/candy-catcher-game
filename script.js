//______________BUTTONS____________
let startBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');
let soundOn = document.querySelector('#soundon');

//______________CANVAS____________
let canvas = document.getElementById("gamecanvas"); // grabs the canvas from the html file

let ctx = canvas.getContext("2d"); // tells us the canvas is 2d  for drawing
canvas.style.border = "2px solid black"; //border

//______________IMAGES____________
let bg = new Image();
bg.src = "./images/bg.png";

let fg = new Image();
fg.src = "./images/fg.png"; //1024 width

let girl = new Image();
girl.src = "./images/girl.png"; // GIRL 100x109

let candiesBlue = new Image();
candiesBlue.src = "./images/bluecandyheart.png"; //candies 70x70

//let candiesSpin = new Image();
//candiesSpin.src = "images/spin_rb_candy.gif"; //candies 70x70

let candiesPink = new Image();
candiesPink.src = "./images/pinkcandystar.png"; // candies images  70x70

const floorHieght = 708;
let intervalId = 0;
let isGameOver = false;
let score = 0;
let candiesSpeed = 0;
let candyCatch = 0;
let isMovingLeft = false; 
let isMovingRight = false;
let girlPosRight = 0, girlPosDown = 599; // GIRL base position  START POSTITION
let candiesPosY = 0;

let candies = [       // falling candies CANDIES ARRAY
  { x: Math.random()*canvas.width, y: Math.random()*canvas.height},
  { x: Math.random()*canvas.width, y: Math.random()*canvas.height},
  { x: Math.random()*canvas.width, y: Math.random()*canvas.height},
  { x: Math.random()*canvas.width, y: Math.random()*canvas.height},
];
//______________END VARIABLES_____________


//______________FUNCTIONS GAME_____________

//START GAME
function start(){
    restartBtn.style.display = 'none'
    console.log(`${isgameOver}`);
    animate()
    //startAudio.play()

}

//PLAY AUDIO
function bgVisual(){
    ctx.drawImage(bg, 0, 0); // static bg
    console.log('drawing bg');
}

//SCORING POINTS BY CATCHING
function girlCatching(){ 
    //We have candies falling down ( x,  DOWN) to the bottom of the screen to reach the floor 
 
   if (candies[i].height > floorHieght && // if the candie hieght is above the floor
     (candies[i].width > girlPosRight  //and if candies width  greater than girl postion
     || candies[i].width < girlPosRight+100)) {
     // if the candie in the array of candies 
     // is between the girl postion
     // the score will increase
     score += 10;
     // speed of the candies falling  will increase
     candiesSpeed+=5;
     console.log('Cathching Scoring');
     
     return score
 
   }
         //incrementing the score
        //if the the bottom of the candies (70x70) touch the girl head
}

//GIRL MOVEMENT 
function girlMoving() {  
    document.addEventListener('keydown', (arrowKeyPress) =>{
        if (arrowKeyPress.code == 'ArrowRight' && girlPosRight+100<canvas.width ) {
            girlPosRight += 25;
            isMovingRight = true
            isMovingLeft = false
            console.log("moving ->");
        }
        if (arrowKeyPress.code == 'ArrowLeft' && girlPosRight>0 ) {
            girlPosRight -= 25;
            isMovingRight = false
            isMovingLeft = true
            console.log("moving <-");
            }})
                 
   document.addEventListener('keyup', () =>{
              isMovingRight = false
              isMovingLeft = false 
          })
            

          return  girlPosRight
}
//CANDIES FALLING
function candiesFalling(){
    for (let i = 0; i < candies.length; i++) {
        ctx.drawImage(candiesBlue,candies[i].x, candies[i].y);
         // ctx.drawImage(candiesSpin,candies[i].x, candies[i].y);  GIF NOT ANIMATING 
        ctx.drawImage(candiesPink, candies[i].x, candies[i].y );
          candiesSpeed =  candies[i].y += 1; // SPEED :)
      
          if (candies[i].y > canvas.height) {
              candies[i] = {
                  x: Math.random()*canvas.width,
                  y: Math.random()*canvas.hieght
              }
            
            if(candies[i].x < canvas.width){ 
              candies[i] = {
                x: Math.random()*canvas.width,
                y: Math.random()*canvas.width
              } 
            }
        }
    }
    console.log('candies falling works')
}

//FORGROUND 
function floorVisual(){
    ctx.drawImage(fg, 0, canvas.height - 60); // FOREGROUND
    console.log('drawing fg');
}


//SCORE PRINTING 
function scoreBoard(){
  return ctx.fillText(`Score: ${score}`, 20, canvas.height - 20);
  console.log('drawing score');
}


//CHECKING IF GAME IS OVER FUNCTION
function gameOver(){  
  
   
    if (Candies[i].x == floorHieght) {
        //ENDS GAME
        cancelAnimationFrame(intervalId);
        restartBtn.style.display = 'none' // hidding the restart until users is game over 
        console.log('Game Ended');
        isGameOver = 
      } 
      else {
        intervalId = requestAnimationFrame(animate); //HANDLING ANIMATION
        //60 frames a second calling the animate/draw function above
        startBtn.style.display = 'none'  // hides the START BUTTON
        console.log('Game Still Going');
      }    
 
    console.log(`${isgameOver}`);

    return isGameOver
}



//______________FUNCTIONS ANIMATIONS_____________
function animate() { 
  //DRAW BG
  bgVisual()
  
  //DRAW GIRL
  ctx.drawImage(girl, girlPosRight, girlPosDown); //girl start pos RIGHT 0  DOWN 599

  //DRAW
  candiesFalling()

  //CALLING GIRL COLLECTING CANDIES SCORING
  girlCatching();

  //DRAW FOREGROUND
  floorVisual()

  //SCORE BOARD
  scoreBoard();

  //CHECKING IF THE GAME IS OVER
  gameOver();

}
//______________END ANIMATIONS_____________


window.addEventListener("load", () => {
    gameOver();
    

  startBtn.addEventListener('click', () => {
    // reset the values 
    girlPosRight = 0, girlPosDown = 599; // puts girl in her stating point
    isGameOver = false;
    score = 0;
    console.log(`${isgameOver}`);
    })


    
    
    //FUCNTION TO RESTART  once user clicks 
   function restart() {
        startBtn.style.display = 'none'
        restartBtn.addEventListener('click', () => {
            
            // puts girl in her stating point PENDING
            isGameOver = false;
            console.log(`${isgameOver}`);
            return score = 0  // reset the values
           
    })}

    animate();
    girlMoving();
    restart(); 

}  );


