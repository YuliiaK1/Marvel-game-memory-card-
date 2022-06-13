const cards = document.querySelectorAll('.marvel-card');
let stepInfo = document.querySelector('.step-info span');
let hasFlippedCard = false;
let firstCard, secondCard;
let boardLocked = false;

const flipCard = e => {
   if (boardLocked) return;
   const target = e.target.parentElement;
   
   if (target === firstCard) return;

   target.classList.add('flip');

   if(!hasFlippedCard) {
      //first click
      hasFlippedCard = true;
      firstCard = target;
   } else {
      //second click
      hasFlippedCard = false;
      secondCard = target;

      //check for match
      checkForMatch();
      styleCard();
   }
};

const checkForMatch = () => {
   if (firstCard.dataset.framework === secondCard.dataset.framework) {
      disableCards();
   } else {
      unflipCards();
   }
};


const disableCards = () => {
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);
   document.getElementById('win').play()
};

let newStep;
const unflipCards = () => {
   boardLocked = true;
   setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      boardLocked = false;
   }, 1000);
   newStep = stepInfo.innerHTML = parseInt(stepInfo.innerHTML) +1;
   document.getElementById('wrong').play()
};

cards.forEach(card=> {
   //add Event Listener to every card
   card.addEventListener('click',flipCard);
});


//welcome modal start
let close = document.querySelector('.modal-start');
let modalClose = document.querySelector('.wrapper');

let btnStart = document.getElementById('btn-start');
btnStart.addEventListener('click', () => {
    yourName = prompt('Enter Your Name:','Jeck');
    if(yourName == null || yourName == ""){
      document.querySelector('.result span').innerHTML = 'Anonym';
    }else{
      document.querySelector('.result span').innerHTML = yourName;
    }
    close.classList.add('hidden');
    modalClose.classList.remove('modal-close');
    timer();
});

//welcome modal close
const styleCard = () => {
   let cardsStyle = Array.from(cards);
   let allCards = cardsStyle.filter(cards => cards.classList.contains('flip'));
   if (allCards.length === 16) {
      stop();
      winModal();
   };
};

//Timer count
let sec = 0;
let min = 0;
let hrs = 0;
let t;
let gameTime;
let time = document.getElementsByClassName('timer')[0];

function tick(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}
function add() {
    tick();
    time.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
   gameTime = time.textContent;
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

let stop = function() {
   clearTimeout(t);
};


function formatTime(){
   let messageWin = document.querySelector('.message-win span');
   messageWin.innerHTML = "Your result: step - " + newStep + " time - "+ gameTime;
};


//Congratulatory window
function winModal(){
   let winHidden = document.querySelector('.message-win');
   formatTime()
   winHidden.classList.remove('win-hidden');
};

function winModalclose(){
   let winHidden = document.querySelector('.message-win');
   winHidden.classList.add('win-hidden');
};


//Restart game
let btnRestart = document.getElementById('btn-restart');
let stepRestart = document.getElementById('step-value');
btnRestart.addEventListener('click', () => {
   time.textContent = "00:00:00";
   sec = 0; min = 0; hrs = 0;
   stepInfo.textContent = 0;
   winModalclose();
   closeCard(); 
   timer();
   shuffleBlock();
});


let closeCard = () => {
   let cardsCss = Array.from(cards);
   let cardsAll = cardsCss.forEach(function(item){
      item.classList.remove('flip');
   });
   cards.forEach(card=> {
      //add Event Listener to every card
      card.addEventListener('click',flipCard);
   }); 
};   

function shuffleBlock(){
   const shuffle = document.querySelector('#carousel');
   shuffle.innerHTMl = '';
   [...shuffle.children]
   .sort(() => Math.random() - 0.5)
   .forEach(v => shuffle.append(v));
};
