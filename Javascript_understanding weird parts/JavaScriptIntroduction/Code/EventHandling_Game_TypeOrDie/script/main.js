//Constants
const SUBSTRACTION_TIME = 0.01;
const SCORE_FACTOR = 10;
const INTERVAL_FACTOR = 10;
const LEVEL_FACTOR = 1000;
const UNITY_FACTOR = 1;
const BASE_FACTOR = 2;
//HTML Elements Javascrip Variables
let elementScore;
let elementInputWord;
let elementStartButton;
let elementRestartButton;
let elementLevel;
let elementCountDown;
let elementTitleWord
let elementRandomWord;
let elementMessage;
// Variables
let seconds = 0;
let cancel;
let option;
let level = 1;
let wordsCount = 0;
let remainingTime;
let score = 0;
let words = [
                'encapsulation', 'inheritance', 'normalization', 'polymorphism', 'refactoring',
                'variables',     'constants',   'objects',       'scope',        'pseudocode',
                'conditionals',  'expressions', 'loops',         'callback',     'functions', 
                'pattern',       'button',      'javascript',    'cascading',    'styles',
                'workflow',      'scrum',       'agile',         'default',      'event',
                'process',       'error',       'debug',         'sprint',       'backlog',
                'database',      'gygabytes',   'feedback',      'responsive',   'layout',
                'connection',    'controller',  'view',          'model',        'service',
                'queries',       'transaction', 'class',         'components',   'rollback',
                'parameters',    'arguments',   'abstraction',   'commit',       'script'
            ];           
let previousWords = [] ;   
let maxWords = words.length;         

function init(evt){ 
    elementScore = document.querySelector('#score'); 
    elementInputWord = document.querySelector('#inputWord');
    elementStartButton = document.querySelector('#startButton'); 
    elementLevel = document.querySelector('#level');  
    elementCountDown = document.querySelector('#countDown');  
    elementRestartButton = document.querySelector('#restartButton'); 
    elementTitleWord = document.querySelector('#titleWord');
    elementRandomWord = document.querySelector('#randomWord');
    elementMessage = document.querySelector('#message');
    elementStartButton.addEventListener('click', startGame);
    elementRestartButton.addEventListener('click', restartGame);    
    elementRestartButton.style.display = "block";
    elementRestartButton.style.visibility = "hidden";
}

function startGame(evt){   
    // if the wordsCount is multiple of maxWords (words.length), restart the previousWords array  
    if (wordsCount%maxWords === 0){
        previousWords.length = 0;        
    }
    // Iterate until to get a word that is not repeated, each words.length words
    do{      
        option = Math.floor(Math.random() * words.length) ;                
    }    
    while (previousWords.includes(words[option]));    

    hideHeaders();
    setItems();       
    setCountDown();
    elementScore.innerHTML = "Score: " + score;
    elementLevel.innerHTML = "Level: " + level;
    elementCountDown.classList.remove("progressBar");
    void elementCountDown.offsetWidth;  
    elementCountDown.classList.add("progressBar");
    elementCountDown.style.animationDuration = seconds + 0.5 + "s" 
    elementTitleWord.innerHTML = 'Type the Word: '; 
    elementRandomWord.innerHTML = words[option];
    elementRandomWord.style.color = "red";
    elementInputWord.addEventListener('input', validateWord);                           
    
}

function restartGame(evt){    
        level = 1;
        seconds = 0;
        remainingTime = 0;
        wordsCount = 0;
        score = 0;
        elementInputWord.disabled = false;    
        elementRestartButton.style.visibility = "hidden";
        elementMessage.innerHTML = '';
        startGame();
}

function hideHeaders(){
    document.querySelector('h1').style.display = "none";
    document.querySelector('h2').style.display = "none";
}

function setCountDown(evt){                  
    cancel = setInterval(function (){                
        remainingTime -= SUBSTRACTION_TIME;                  
         if (remainingTime <= 0){
            stopCountDown();
            elementMessage.innerHTML = 'GAME OVER';
            elementInputWord.value = '';
            elementInputWord.disabled = true;
            elementRestartButton.style.visibility = "visible";
         }                 
    }, INTERVAL_FACTOR);    
}

function setItems(){
    //My own formula to calculate the seconds for each word depending her length   
    seconds = words[option].length / (UNITY_FACTOR + ((level/SCORE_FACTOR)*BASE_FACTOR)); 
    remainingTime = seconds;     
    elementInputWord.style.display = "block";       
    elementInputWord.focus();
    elementStartButton.style.display = "none";
}

function stopCountDown()
{   
    clearInterval(cancel);    
}

function validateWord(evt){
    if (evt.target.value === words[option]){
        stopCountDown();
        wordsCount++;      
        score = Math.round(score + ((remainingTime + wordsCount) * SCORE_FACTOR))             
        if (score >= (level * LEVEL_FACTOR)){
            level++;
            elementLevel.innerHTML =  "Level: " + level;
        }                
        previousWords.push(words[option]);   
        console.log(previousWords);     
        elementScore.innerHTML = "Score: " + score;
        evt.target.value = '';
        startGame();
    }    
}

window.onload = init;