//Game constants & Variables

let inputDir ={x:0,y:0};
const foodSound = new Audio('music/food.mp3');
const  moveSound = new Audio('music/move.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let score =0;
let snakeArr =[
    {x:13,y:15}
] 
food = {x:6,y:7};


//Game functions are here
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for(let i=1; i < snakeArr.length; i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y>=18 || snake[0].y <=0){
        return true;
    }
    return false
  
}

function gameEngine(){
    //part1=updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("GAME OVER. PRESS ANY KEY TO START NEW GAME");
        snakeArr = [{x:13,y:15}];
        musicSound.play();
        score=0;
    }
    //if snake eaten the food, increment the score and regenarte the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score += 1;
        if(score>Hiscoreval){
            Hiscoreval=score;
            localStorage.setItem("Hiscore",JSON.stringify(Hiscoreval))
            Hiscore.innerHTML="Hiscore" + Hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a =2;
        let b =16;
        food ={x:Math.round(a + (b-a)*Math.random()), y: Math.round(a+ (b-a)*Math.random())}
    }

    //Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //part 2=Display the snake and food

    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
    
}



//main logic is here

// The line of code window.requestAnimationFrame(main); is commonly used in JavaScript for creating smooth and efficient animations in web applications. 
// It's part of the Web API provided by browsers and is used to schedule a function to be called before the next repaint of the web page, typically at the screen's refresh rate, which is usually 60 times per second.
let Hiscore = localStorage.getItem("Highscore");
if(Hiscore===null){
    Hiscoreval = 0;
    localStorage.setItem("Highscore",JSON.stringify(Hiscoreval))
}else{
    Hiscoreval=JSON.parse(Hiscore);
    Hiscore.innerHTML="Highscore :"+Hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1} //start the game
    moveSound.play();
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
    
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})