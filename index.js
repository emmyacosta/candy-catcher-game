//_________DOM DRAWING CANVAS AND BUTTONS___________________________
let canvas = document.getElementById("gamecanvas");
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
//the DOM pages selectors
let startPage = document.querySelector("#splashscreen-page"); //START SPLASH SCREEN
let gamePage = document.querySelector("#gameplay-page"); //CANVAS DIV
let gameOverPage = document.querySelector("#game-over-page"); //END PAGE

let ctx = canvas.getContext("2d");

//___________________________IMAGES______________________________
let bg = new Image();
bg.src = "./images/bg.png";

let bgblur = new Image();
bgblur.src = "/images/bgblur.png";

let fg = new Image();
fg.src = "./images/fg.png"; //1024 width X  768 hieght 

let candiesBlue = new Image();
candiesBlue.src = "./images/bluecandyheart.png"; //candies 70x70

let candiesPink = new Image();
candiesPink.src = "./images/pinkcandystar.png"; // candies images  70x70

let girl = new Image();
girl.src = "./images/girl.png"; // GIRL 100x109

//let candiesSpin = new Image();
//candiesSpin.src = "images/spin_rb_candy.gif"; //candies 70x70

//_______________________SOUND EFX VARIABLES______________________________________

let catchingSoundEFX = new Audio()
catchingSoundEFX.src = './music/zapsplat_cartoon_imoact_hollow_plonk_003_50050.mp3'

let runSoundEFX = new Audio()
runSoundEFX.src = './music/zapsplat_cartoon_walking_care_free_happy_musical_002_18140.mp3'

let dropSoundEFX = new Audio()
dropSoundEFX.src = './music/zapsplat_cartoon_imoact_hollow_plonk_003_50050.mp3'

let startSoundEFX = new Audio()
startSoundEFX.src = './music/human_voice_girl_2_years_says_yumyums.mp3'

let restartSoundEFX = new Audio()
restartSoundEFX.src = './music/zapsplat_human_child_girl_11_years_says_yay_001_19775.mp3'


//_______________________VARIABLES______________________________________
const floorHieght = 708;
let intervalId = 0;
let isGameOver = false;
let score = 0;
let candiesSpeed = 0;
let candyCatch = 0;
let isMovingLeft = false;
let isMovingRight = false;
let girlPosRight = 0, girlPosDown = 599; // GIRL base position  START POSTITIO

let candies = [
  // falling candies CANDIES ARRAY
  {
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height / 3),
    width: 70,
    height: 70,
  },
  {
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height / 3),
    width: 70,
    height: 70,
  },
  {
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height / 3),
    width: 70,
    height: 70,
  },
];

//_______________________GIRL CATCHING FUNCTION______________________________________
function girlCatching() {
  for (let i = 0; i < candies.length; i++) {
    //console.log("Get points");

    if (
      candies[i].y + candies[i].height >= girl.y &&
      candies[i].x + candies[i].width < girlPosRight + girl.width &&
      candies[i].x > girlPosRight 
    ) {
      // console.log("Get points 2");
      score += 10;
      candies[i].y = 2000;
      candies[i].x = 2000;
      //candiesSpeed = candies[i].y += 5
    } else if (candies[i].x > floorHieght) {
      isGameOver == true;
    }
  }
}

//_______________________MUSIC_____________________________________
function musicPlay() {
  //ONE BUTTON FOR BOTH
  let myAudio = document.getElementById("music");
  if (myAudio.paused) {
    myAudio.play();
  } else {
    myAudio.pause();
  }
}

//____________________START FUNCTION_____________________________________  WORKS
function start() {
  startPage.style.display = "none";
  gameOverPage.style.display = "none";
  isGameOver = false;
}

//______________________RESTART FUNCTION_____________________

function restart() {
  gamePage.style.display = "none";
  isGameOver = false;
  girlPosRight = 0;
  girlPosDown = 599; // GIRL base position  START POSTITIO
  score = 0;
  start();
}


   
  
//_______________________ANIMATION_____________________________________
function animate() {
  //_______________________BG VISUAL_____________________________________
  ctx.drawImage(bg, 0, 0); // static bg

  //_______________________CANDIES FALLING_____________________________________
  for (let i = 0; i < candies.length; i++) {
    //ctx.drawImage(candiesBlue,candies[2].x + Math.random()*1024, candies[i].y );
    //ctx.drawImage(candiesSpin,candies[i].x, candies[i].y);  //GIF NOT ANIMATING
    ctx.drawImage(candiesPink, candies[i].x, candies[i].y);

    candiesSpeed = candies[i].y += 2; // SPEED :)

    if (candies[i].y > canvas.height) {
      candies[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3),
      };

      if (candies[i].x < canvas.width) {
        candies[i] = {
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 3),
        };
      }
    }
  }

  //_______________________CHARACTER DRAWING_____________________________________
  ctx.drawImage(girl, girlPosRight, girlPosDown); //girl start pos RIGHT 0  DOWN 599

  //_______________________CALLING FUNCTION FOR GIRL CATCHING_________________________

  girlCatching();

  //_______________________MOVEMENT OF THE GIRL_________________________
  if (isMovingRight && girlPosRight + girl.width < canvas.width) {
    girlPosRight += 20;
  }
  if (isMovingLeft && girlPosRight > 0) {
    girlPosRight -= 20;
  }

  //______________________DRAWING FORGROUND AND SCORE _________________________
  ctx.drawImage(fg, 0, canvas.height - 60);
  ctx.fillStyle = "#EC6467";
  ctx.font = "22px Pacifico";
  ctx.fillText(`Score: ${score}`, 20, canvas.height - 20);

  if (candies.x == floorHieght) {
    isGameOver == true;
  }

  //______________________REQUEST ANIMATION FRAME JS FUNCTION_________________________

  if (isGameOver) {
    //ENDS GAME
    cancelAnimationFrame(intervalId); // when the game is over
    ctx.fillText(`Your Score is : ${score}`, 20, canvas.height - 20); //Show Score
    startPage.style.display = "none"; //hide the start page
    gamePage.style.display = "none"; //hide the game page
  } else {
    intervalId = requestAnimationFrame(animate); // playing game
    gameOverPage.style.display = "none"; // hide the game over page
  }
}

//_______________________EVENT LISNTERS________________________________
window.addEventListener("load", () => {
  animate();
  girlMoving();
  gameOverPage.style.display = "none";

  //_______________________CLICK TO RESTART________________________________
  startBtn.addEventListener("click", () => {
    start();
  });

  //_______________________CLICK TO RESTART________________________________
  restartBtn.addEventListener("click", () => {
    restart();
  });

  //_______________________KEYDOWN MOVEMENT________________________________
  function girlMoving() {
    document.addEventListener("keydown", (arrowKeyPress) => {
      if (arrowKeyPress.code == "ArrowRight") {
        isMovingRight = true;
        isMovingLeft = false;
        console.log("moving ->");
      }
      if (arrowKeyPress.code == "ArrowLeft") {
        isMovingRight = false;
        isMovingLeft = true;
        console.log("moving <-");
      }
    });
  }

  //_______________________KEY UP STOP MOVEMENT________________________________
  document.addEventListener("keyup", () => {
    isMovingRight = false;
    isMovingLeft = false;
  });
});
