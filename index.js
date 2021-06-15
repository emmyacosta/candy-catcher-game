let canvas = document.getElementById("gamecanvas"); // grabs the canvas from the html file
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");

let ctx = canvas.getContext("2d"); // tells us the canvas is 2d  for drawing

// load all images
let bg = new Image();
bg.src = "./images/bg.png";

let bgblur = new Image();
bgblur.src = "/images/bgblur.png";

let fg = new Image();
fg.src = "./images/fg.png"; //1024 width

let candiesBlue = new Image();
candiesBlue.src = "./images/bluecandyheart.png"; //candies 70x70

let candiesPink = new Image();
candiesPink.src = "./images/pinkcandystar.png"; // candies images  70x70

let girl = new Image();
girl.src = "./images/girl.png"; // GIRL 100x109

//let candiesSpin = new Image();
//candiesSpin.src = "images/spin_rb_candy.gif"; //candies 70x70

const floorHieght = 708;
let intervalId = 0;
let isGameOver = false;
let score = 0;
let candiesSpeed = 0;
let candyCatch = 0;
let isMovingLeft = false;
let isMovingRight = false;
let girlPosRight = 0,
  girlPosDown = 599; // GIRL base position  START POSTITION

let candies = [
  // falling candies CANDIES ARRAY
  {
    x: Math.random() * canvas.width,
    y: Math.random() * 300,
    width: 70,
    height: 70,
  },
  {
    x: Math.random() * canvas.width,
    y: Math.random() * 300,
    width: 70,
    height: 70,
  }
  
];


function girlCatching() {
  console.log("Get score");
  for (let i = 0; i < candies.length; i++) {
    //console.log("Get points");

    if ( candies[i].y + candies[i].height >= girl.y
      && candies[i].x+candies[i].width < girlPosRight + girl.width 
      && candies[i].x > girlPosRight )
    {
     // console.log("Get points 2");
       score+=10
        candies[i].y = 2000
        candies[i].x =  2000
      //candiesSpeed = candies[i].y += 5
    }
    else if (candies[i].y > floorHieght){
      isGameOver = true
      console.log(isGameOver);
      
    }

  }
}

function start() {
  restartBtn.style.display = "none";
  console.log(`${isgameOver}`);
  animate();
  //startAudio.play()
}

function animate() {
  

  

  // getting called 60 per sec with the JS builtin function    ANIMATION
  ctx.drawImage(bg, 0, 0); // static bg

  //INITIAL CANDY SPEED & POSITION
  for (let i = 0; i < candies.length; i++) {
    //ctx.drawImage(candiesBlue,candies[i].x + Math.random()*1024, candies[i].y );
    //ctx.drawImage(candiesSpin,candies[i].x, candies[i].y);  //GIF NOT ANIMATING
    ctx.drawImage(candiesPink, candies[i].x, candies[i].y);
    candiesSpeed = candies[i].y += 2 // SPEED :)

    if (candies[i].y > canvas.height) {
      candies[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * 250,
      };

      if (candies[i].x < canvas.width) {
        candies[i] = {
          x: Math.random() * canvas.width,
          y: Math.random() * 250,
        };
      }
    }
  }

  ctx.drawImage(girl, girlPosRight, girlPosDown); //girl start pos RIGHT 0  DOWN 599

  girlCatching();

  if (isMovingRight && girl.width<canvas.width) {
      girlPosRight += 20
  }
  if (isMovingLeft) {
    girlPosRight -= 20

  }
  console.log(girlPosRight)
  // DRAWING FORGROUND LEAVE AT BOTTOM
  ctx.drawImage(fg, 0, canvas.height - 60); // FOREGROUND
  ctx.fillStyle = "#EC6467";
  ctx.font = "22px Pacifico";
  ctx.fillText(`Score: ${score}`, 20, canvas.height - 20);


  gameOver() 

  //60 FRAMES ANIMATION IF GAME IS IN PLAY  _ DONT MOVE THIS _ not sure why?  cant i put this in a function? HALP!!!
  if (isGameOver) {
    //ENDS GAME
    cancelAnimationFrame(intervalId);
  } else {
    intervalId = requestAnimationFrame(animate); //HANDLING ANIMATION
    //60 frames a second calling the animate/draw function above
  }


}

function gameOver(bg) {
  if (isGameOver) {
    isGameOver == true;
    startBtn.style.display = "none"; // NO start buttong
    console.log("isgameOver");
    console.log(`${isgameOver}`);
    return isGameOver;
  }
}

window.addEventListener("load", () => {
  animate();
  girlMoving();

  startBtn.style.display = "none"; // showing no game canvas

  startBtn.addEventListener("click", () => {
    // reset the values
    (girlPosRight = 0), (girlPosDown = 599); // puts girl in her stating point
    isGameOver = false;
    score = 0;
   


  });

  // MOVMENT OF THE GIRL
  function girlMoving() {
    document.addEventListener("keydown", (arrowKeyPress) => {
      if (
        arrowKeyPress.code == "ArrowRight" 
        
      ) {
       
        isMovingRight = true;
        isMovingLeft = false;
        console.log("moving ->");
      }
      if (arrowKeyPress.code == "ArrowLeft" ) {
       
        isMovingRight = false;
        isMovingLeft = true;
        console.log("moving <-");
      }
    });

  }

  document.addEventListener("keyup", () => {
    isMovingRight = false;
    isMovingLeft = false;
  });

  restartBtn.addEventListener("click", () => {
    // reset the values
    // puts girl in her stating point
    isGameOver = false;
    console.log(`${isgameOver}`);
    start();
  });
});
