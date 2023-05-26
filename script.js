let gameOver = false, score = 0;
let GAME_TIME = 30000;
let level = 0;
const plates = Array.from(document.querySelectorAll('.plate'));
const wrongAudio = new Audio('./assets/wrong.mp3');
const correctAudio = new Audio('./assets/correct.wav');
const OBJECTS = [{type: "color",value: "red",score: -10},{type: "color",value: "blue",score: 10},{type: "color",value: "green",score: 20},{type: "color",value: "yellow",score: 5}]
const getRandomObject = () => {return OBJECTS[Math.floor(Math.random() * OBJECTS.length)];}
const getRandomTime = (level) => {return Math.floor(Math.random() * 1000) + 1000 - (level * 200);}
const getRandomPlate = () => {return plates[Math.floor(Math.random() * plates.length)];}
const handlePlateClick = (event) => {
    const plate = event.target;
    if(plate.classList.contains('color')){score += parseInt(plate.dataset.score);
        if(plate.dataset.score > 0){
            correctAudio.play();
        }else{
            wrongAudio.play();
        }
        document.querySelector('.score').textContent = score; 
    }else{
        score -= 5;
        document.querySelector('.score').textContent = score;
        wrongAudio.play();
    }
}
const showObject = () => {
    const object = getRandomObject();
    const plate = getRandomPlate();
    plate.classList.add(object.type);
    plate.style = "--color: "+object.value;
    plate.dataset.score = object.score;
    setTimeout(() => {
        plate.classList.remove(object.type);
        if (!gameOver){
            showObject();
        }
        correctAudio.currentTime = 0;correctAudio.pause();

    }, getRandomTime(level));
}
const startGame = () => {
    gameOver = false;
    GAME_TIME = 30000;
    document.querySelector('.store').classList.remove('hide');document.querySelector('.home').classList.add('hide');document.querySelector(".gameOver").classList.add("hide");
    score = 0;
    level = document.querySelector('input[name="level"]:checked').value || 0;
    showObject();
    let i = setInterval(() => {
        if (GAME_TIME <= 0){
            gameOver = true;
            clearInterval(i);
            document.querySelector('.store').classList.add('hide');document.querySelector(".gameOver").classList.remove("hide");document.querySelector(".finalScore").textContent = score;
        }
        GAME_TIME -= 1000;
        document.querySelector('.timeLeft').textContent = GAME_TIME/1000;
    }, 1000);}
plates.forEach(plate => {
    plate.addEventListener('click', handlePlateClick);
});