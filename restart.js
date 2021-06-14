let canvas = document.getElementById("gameover"); // grabs the canvas from the html file
let startBtn = document.querySelector('#start');
let ctx = canvas.getContext("2d"); // tells us the canvas is 2d  for drawing
canvas.style.border = "2px solid black"; //border

// load all images
let bg = new Image();
bg.src = "./images/bgblur.png";


let girl = new Image();
girl.src = "./images/deadgirl.png";


let intervalId = 0;
let isGameOver = false;
let score = 0;

let girlPosRight = 0, girlPosDown = 599; // GIRL base position  START POSTITION



function animate() { 
  
  function start(){
    restartBtn.style.display = 'none'
    console.log(`${isgameOver}`);
    animate()
    //startAudio.play()
  }

   //60 FRAMES ANIMATION IF GAME IS IN PLAY  _ DONT MOVE THIS _ not sure why?  cant i put this in a function? HALP!!!
   if (isGameOver) {
    //ENDS GAME
    cancelAnimationFrame(intervalId);
  } 
  else {
    intervalId = requestAnimationFrame(animate); //HANDLING ANIMATION
    //60 frames a second calling the animate/draw function above
  }
  
  
  // getting called 60 per sec with the JS builtin function    ANIMATION
  ctx.drawImage(bg, 0, 0); // static bg

  ctx.drawImage(girl, 600, 300); //girl start pos RIGHT 0  DOWN 599


  // DRAWING FORGROUND LEAVE AT BOTTOM
  ctx.drawImage(fg, 0, canvas.height - 60); // FOREGROUND
  ctx.fillStyle = '#EC6467'
  ctx.font = "22px Pacifico";
  ctx.fillText(`Score: ${score}`, 20, canvas.height - 20);
      
}



function gamveOVer(){
  if (candies[i].x == floorHieght) {
    //GAME OVER  if candies touches floor  @ canvas.height - 60  change to isGameOver = true
    isGameOver == true;
    startBtn.style.display = 'none' // NO start buttong 
    console.log('isgameOver');
    console.log(`${isgameOver}`);
    return isGameOver
  }
} 


window.addEventListener("load", () => {


 

 
      
  })

  restartBtn.addEventListener('click', () => {
    // reset the values 
    // puts girl in her stating point
    isGameOver = false;
    console.log(`${isgameOver}`);
    start(); 
    })
}  );


