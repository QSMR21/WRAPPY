let randomNumber = Math.floor(Math.random()*100)+1;

const guess = document.querySelector(".test");
const guesses = document.querySelector(".guesses");
const loworhigh = document.querySelector(".loworhigh");


const guessField = document.querySelector(".guessField");

let guessCount=1;
let resetButton; 

export const guessSubmit = document.querySelector(".game");
//guessSubmit.addEventListener('click',checkGuess);

export function checkGuess(){
  const userguess = Number(guessField.value);

  if(guessCount===1){
    guesses.textContent = "Previous guesses :";
  }

  guesses.textContent = `${guesses.textContent} ${userguess}`;

  
  if(userguess === randomNumber){
    guess.textContent = `Congratulations, number was ${randomNumber}`;
    loworhigh.textContent = "";

    setGameOver();
  } else if(guessCount === 10){
    guess.textContent = `GAME OVER, limit reached number was ${randomNumber}`;
    loworhigh.textContent = "";
    setGameOver();
  }
  
  else {
    guess.textContent = "Not that";

    if (userguess > randomNumber){
      loworhigh.textContent = "Too high"
    } else if (userguess < randomNumber){
      loworhigh.textContent = "Too low"
    }
  }
  guessCount++;

}

function setGameOver(){
  let div = document.getElementById("reset");
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = "New game";
  resetButton.className ='form';
  resetButton.style.marginBottom = "20px";
  div.append(resetButton);
  resetButton.addEventListener('click',resetGame);
}

function resetGame(){
  guessCount=1;
  guess.textContent = "";
  guesses.textContent = "Previous guesses :";
  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  randomNumber = Math.floor(Math.random()*100)+1;

}

