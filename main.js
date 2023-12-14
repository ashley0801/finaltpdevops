let lastCard;
let compteurGagner;
compteurGagner=0;
let compteurPerdre;
compteurPerdre=0;
let clickCounter = 0;
let coupsRestants = 10;
let clickedCards = [];
let level = 1;
let maxClicks = 10;
let nombre_niveau=1;
let lockBoard =0;
let compteurReset=0;

let timer;

const displayTime = document.querySelector('#time');

function resetTimer() {
  if (level == 1) {
    timer = 90;
  } else if (level == 2) {
    timer = 70;
  } else if (level == 3) {
    timer = 50;
  }
  displayTime.textContent = timer;
  intervalId = setInterval(() => {
    timer--;
    displayTime.textContent = timer;
    if (timer === 0 && compteurGagner!=4) {
      setTimeout(()=>{
      alert("Temps écoulé! Vous êtes sur le point de recommencer le niveau "+  nombre_niveau + " :)");
      clearInterval(intervalId);
      resetGame();
    },200); 
    }
  }, 1000);
}

if (compteurReset<1){
  resetTimer();
  compteurReset++;
}

document.getElementById('niveau').innerHTML = nombre_niveau;
document.getElementById('couprestant').innerHTML = coupsRestants;
document.getElementById('paires').innerHTML = compteurGagner + "/4";

console.log('start');
let boxes = document.querySelectorAll('.box'); 
console.log(boxes);

let images = ['cerf.png', 'santaclaus.png', 'chemine.png', 'maison.png', 'cerf.png', 'santaclaus.png', 'chemine.png', 'maison.png'];
images = images.sort((a, b) => 0.5 - Math.random());

boxes.forEach((box, key) => {
  console.log(box, key);
  let img = document.createElement('img');
  img.src = images[key];
  img.style.width = "150px";
  img.style.height = "150px";
  img.style.borderRadius="25px";
  img.style.display="none";
  box.appendChild(img);
  box.addEventListener('click', (event) => {
    console.log("Clique sur image!", event.target.innerHTML);
    console.log(event.target.classList);
    if(lockBoard==0){
    event.target.firstElementChild.style.display = "block";
    }
    else{
      return;
    }
  });
});


function resetGame() {
  compteurGagner = 0;
  compteurPerdre = 0;
  clickCounter = 0;
  clickedCards = [];
  lockBoard=0;
  lastCard=0;
  resetTimer();
  boxes.forEach((box, key) => {
    box.firstElementChild.style.display = "none";
    box.classList.remove("match");
  });

  document.getElementById('paires').innerHTML = "0/4";
  document.getElementById('couprestant').innerHTML = maxClicks;
  images = images.sort((a, b) => 0.5 - Math.random());
   boxes.forEach((box, key) => {
  box.firstElementChild.src = images[key];
  document.getElementById('niveau').innerHTML = nombre_niveau;
});
} 

const cards = document.querySelectorAll('.box');
cards.forEach(card => {
  card.addEventListener('click', function(){
    if(lockBoard==1){
      return;
    }
    if(this.classList.contains("match")){
      alert("Vous ne pouvez pas cliquer sur une des paires déja trouvées !");
      return;
    }
    if (this === lastCard) {
      clickCounter++;
    } else {
      clickCounter = 0;
    }
    if (clickCounter >= 1) {
      alert("Vous ne pouvez pas cliquer plusieurs fois d'affiler sur la même carte !");
      return;
    }
    if(clickedCards.length < 2){
      clickedCards.push(this);
      lastCard = this;
    }
    if(clickedCards.length === 2){
      if(clickedCards[0].querySelector('img').src === clickedCards[1].querySelector('img').src){
        compteurPerdre++;
        clickedCards[0].classList.add("match");
        clickedCards[1].classList.add("match");
        clickedCards = [];
        compteurGagner++;
        document.getElementById('paires').innerHTML = compteurGagner + "/4";
        if (compteurGagner == 4 && timer >0 && coupsRestants>0){
          if (level == 1) {
            level = 2;
            lockBoard = 1;
            clickCounter = 0;
            setTimeout(()=>{
              timer=90-timer;
              alert('Félicitation vous avez gagner le niveau ' + nombre_niveau +' en '+ compteurPerdre + ' coups et en ' + timer + ' secondes.');
              maxClicks = 8;
              lockBoard = 0;
              nombre_niveau=2;
              alert(" Vous allez passer au niveau "+ nombre_niveau +" :)");
            },400); 
          } else if (level == 2) {
            level = 3;
            lockBoard = 1;
            clickCounter = 0;
            setTimeout(()=>{
              timer=70-timer;
              alert('Félicitation vous avez gagner le niveau ' + nombre_niveau +' en '+ compteurPerdre + ' coups et en ' + timer + ' secondes.');
            nombre_niveau=3;
            maxClicks = 6;
            lockBoard = 0;
            alert(" Vous allez passer au niveau "+ nombre_niveau +" :)");
          },400);     
          } else {
            setTimeout(()=>{
            alert("Félicitation, vous avez terminé tous les niveaux !");
            alert(" Vous êtes sur le point de recommencer à 0 :)");
            window.location.reload();
            return;
          },400);  
          }
          setTimeout(()=>{
            resetGame();
          },400); 
          }       
      }else{
        compteurPerdre++;
        lastCard=0;
        lockBoard = 1;
            setTimeout(()=>{
              clickedCards[0].firstElementChild.style.display = "none";
              clickedCards[1].firstElementChild.style.display = "none";
              clickedCards = []; 
              clickCounter=0;
              lockBoard = 0;
            },700);
      }
    }
    coupsRestants = maxClicks - compteurPerdre;
    document.getElementById('couprestant').innerHTML = coupsRestants;
    if(compteurPerdre==maxClicks){
      if(compteurGagner == 4){
        return;
      } else if (level == 1) {
        level = 1;
        maxClicks = 10;
        nombre_niveau=1;
        lockBoard=1;
        clickCounter = 0;
        setTimeout(() =>{
          alert("Nombre de coups atteint ! Vous êtes sur le point de recommencer le niveau "+  nombre_niveau + " :)");
          lockBoard = 0;
        },400);
      } else if (level == 2) {
        level = 2;
        maxClicks = 8;
        nombre_niveau=2;
        lockBoard=1;
        clickCounter = 0;
        setTimeout(() =>{
          alert("Nombre de coups atteint ! Vous êtes sur le point de recommencer le niveau "+  nombre_niveau + " :)");
          lockBoard = 0;
        },400);
      } else if (level == 3) {
        level = 3;
        maxClicks = 6;
        nombre_niveau=3;
        lockBoard=1;
        clickCounter = 0;
        setTimeout(() =>{
          alert("Nombre de coups atteint ! Vous êtes sur le point de recommencer le niveau "+  nombre_niveau + " :)");
          lockBoard = 0;
        },400);
      }
      setTimeout(() =>{
        resetGame();
        return;
      },400);
    }
  });
});






