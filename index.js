//_________DOM DRAWING CANVAS AND BUTTONS___________________________
let canvas = document.getElementById("gamecanvas");
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
//the DOM pages selectors
let startPage = document.querySelector("#splashscreen-page"); //START SPLASH SCREEN
let gamePage = document.querySelector("#gameplay-page"); //CANVAS DIV
let gameOverPage = document.querySelector("#game-over-page"); //END PAGE
let finalScore = document.querySelector('#scoredisplay')
let myAudio = document.getElementById("music");


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

//let candieBottle = new Image();
//candiesBottle.src = "images/"; //candies 70x70

//_______________________SOUND EFX VARIABLES______________________________________

let catchingSoundEFX = new Audio()
catchingSoundEFX.src = './music/zapsplat_cartoon_imoact_hollow_plonk_003_50050.mp3'
catchingSoundEFX.volume = 0.3

let runSoundEFX = new Audio()
runSoundEFX.src = './music/zapsplat_cartoon_walking_care_free_happy_musical_002_18140.mp3'
runSoundEFX.volume = 0.03

let dropSoundEFX = new Audio()
dropSoundEFX.src = './music/zapsplat_cartoon_imoact_hollow_plonk_003_50050.mp3'
dropSoundEFX.volume = 0.3

let startSoundEFX = new Audio()
startSoundEFX.src = './music/human_voice_girl_2_years_says_yumyums.mp3'
startSoundEFX.volume = 0.2

let restartSoundEFX = new Audio()
restartSoundEFX.src = './music/zapsplat_human_child_girl_11_years_says_yay_001_19775.mp3'
restartSoundEFX.volume = 0.2


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
      candies[i].x > girlPosRight) {
      catchingSoundEFX.play()
      score += 10;
      candies[i].y = 2000;
      candies[i].x = 2000;
      //candiesSpeed = candies[i].y += 5
    }
  }
}

//_______________________MUSIC_____________________________________
function musicPlay() {
  
 
  if (myAudio.paused) {
    myAudio.play();
  } else {
    myAudio.pause();
  }
}

//____________________START FUNCTION_____________________________________  WORKS
function start() {
  startPage.style.display = 'none'
  gamePage.style.display = 'block'
  gameOverPage.style.display = 'none'
  animate()      
}

//______________________RESTART FUNCTION_____________________

function restart() {
  gameOverPage.style.display = 'none'
  startPage.style.display = 'block'
  isGameOver = false
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
    let gap = Math.random() + 300
     
    ctx.drawImage(candiesBlue,candies[i].x + gap , candies[i].y );
    ctx.drawImage(candiesPink, candies[i].x, candies[i].y);
    //ctx.drawImage(candiesBottle,candies[i].x + gap , candies[i].y );
    //ctx.drawImage(candiesBottle2,candies[i].x + gap , candies[i].y );

    candiesSpeed = candies[i].y += 1; // SPEED :)

    if (candies[i].y > canvas.height) {
      candies[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 4),
      };

      if (candies[i].x < canvas.width) {
        candies[i] = {
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 4),
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
    runSoundEFX.play();
  }
  if (isMovingLeft && girlPosRight > 0) {
    girlPosRight -= 20;
    runSoundEFX.play()
  }

  //______________________DRAWING FORGROUND AND SCORE _________________________
  ctx.drawImage(fg, 0, canvas.height - 60);
  ctx.fillStyle = "#EC6467";
  ctx.font = "22px Pacifico";
  ctx.fillText(`Score: ${score}`, 20, canvas.height - 20);

  //______________________DRAWING FORGROUND AND SCORE _________________________
  for (let i = 0; i < candies.length; i++) {
  if (candies[i].y + candiesPink.height > floorHieght) {
    isGameOver = true;
  }
 }

  //______________________REQUEST ANIMATION FRAME JS FUNCTION_________________________

  if (isGameOver) {
    //ENDS GAME
    cancelAnimationFrame(intervalId); // when the game is over
    gameOverPage.style.display = 'block'
    startPage.style.display = 'none'
    gamePage.style.display = 'none'
    finalscore.textContent = `Your score is: ${score}`

  } else {
    intervalId = requestAnimationFrame(animate); // playing game
    gameOverPage.style.display = "none"; // hide the game over page
  }
}

//_______________________EVENT LISNTERS________________________________
window.addEventListener("load", () => {
  myAudio.play()
  animate();
  girlMoving();
  gameOverPage.style.display = "none";
  startPage.style.display = 'block'
  gamePage.style.display = 'none'
  

  //_______________________CLICK TO RESTART________________________________
  startBtn.addEventListener("click", () => {
    start();
    startSoundEFX.play()
  });

  //_______________________CLICK TO RESTART________________________________
  restartBtn.addEventListener("click", () => {
    restart();
    restartSoundEFX.play()
  });

  //_______________________KEYDOWN MOVEMENT________________________________
  function girlMoving() {
    document.addEventListener("keydown", (arrowKeyPress) => {
      if (arrowKeyPress.code == "ArrowRight") {
        isMovingRight = true
        isMovingLeft = false
       
      }
      if (arrowKeyPress.code == "ArrowLeft") {
        isMovingRight = false
        isMovingLeft = true
      }
    })
  }

  //_______________________KEY UP STOP MOVEMENT________________________________
  document.addEventListener("keyup", () => {
    isMovingRight = false
    isMovingLeft = false
    runSoundEFX.pause()
  })
})
