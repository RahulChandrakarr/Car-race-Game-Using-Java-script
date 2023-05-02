

const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea')


startScreen.addEventListener("click", start);

let player = { speed: 9, score: 0 };


let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();   //for grap what key is pressd 
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    // console.log(e.key);
    keys[e.key] = false;

}

function isCollide(a, b) {
    aRact = a.getBoundingClientRect();
    bRact = b.getBoundingClientRect();

    return !((aRact.bottom < bRact.top) || (aRact.top > bRact.bottom) || (aRact.right < bRact.left) || (aRact.left > bRact.right));
}
function moveLines() {

    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {

        if (item.y >= 700) {
            item.y -= 750;

        }
        item.y += player.speed;
        item.style.top = item.y + "px";

    })

}
function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');

}
function moveEnemy(car) {

    let enemy = document.querySelectorAll('.enemy ');

    enemy.forEach(function (item) {

        if (isCollide(car, item)) {
            endGame();
            //console.log("boom");
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";

        }
        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}
function gamePlay() {
    // console.log("hey i am clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if (player.start) {

        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > road.top + 80) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 80)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);
        player.score++;
        score.innerText = "Score: " + player.score;


    }
}
var audio = new Audio('car.mp3');

function ringBell() {
    audio.play();
};
//   function speedBoost(){
//     for(let i = 1;player.speed=8;i++){
//          setTimeout(() => {
//             player.speed+=1;
//             console.log(player.speed);
//          }, 5000);
//         }
//  }
function start() {
    gameArea.classList.remove('hide');
    // speedBoost();
    ringBell()
    startScreen.classList.add('hide');
    gameArea.innerHTML = " ";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = (x * 150) + "px";
        gameArea.appendChild(roadLine);
    }
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText= "hey i am your car";
    gameArea.appendChild(car);



    player.x = car.offsetLeft;
    player.y = car.offsetTop;


    for (x = 0; x < 4; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = (x * 150) + "px";
        // enemyCar.style.backgroundColor = "blue";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
    player.speed = 1;
}