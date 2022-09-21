let randomNumber = Math.floor(Math.random() * 100 + 1);
let triesMax = 5;
let triesTaken = 0;

function guessNumber() {
  let guess = Number(document.querySelector(".input-guess").value);
  //Collect input from the user

  if (triesTaken === triesMax) {
    document.querySelector(".button-guess").removeEventListener("click", guessNumber);
    document.querySelector(".output-error").textContent = "Sorry, You ran out of tries! 😭";
  } else if (guess <= 0 || guess > 100) {
    //If the user inputs a bad input ie 0, empty string, number greater that 100, number less than zero Print "Please enter a number between 1 and 100"
    document.querySelector(".output-error").textContent = "Enter a number between 1 and 100! 🤨";
  } else if (guess > randomNumber) {
    //If the users guess is higher than the random number print Number is too high, try again (hint use .final-out class to print)
    triesTaken++;
    document.querySelector(".output-error").value = "";
    document.querySelector(".output-info").textContent = "Your guess was too high 😬, try again! 👇";
    document.querySelector(".output-tries").textContent = `${triesTaken} of ${triesMax} Tries`
  } else if (guess < randomNumber) {
    //If the users guess is lower than the random number print Number is too low, try again  (hint use .final-out class to print)
    triesTaken++;
    document.querySelector(".output-error").value = "";
    document.querySelector(".output-info").textContent = "Your guess was too low 😬, try again! ☝️";
    document.querySelector(".output-tries").textContent = `${triesTaken} of ${triesMax} Tries`
  } else if (guess === randomNumber) {
    //If the user has guessed the random number correctly print out the randomNumber with a message "Guess is correct. You win!"
    document.querySelector(".button-guess").removeEventListener("click", guessNumber);
    document.querySelector(".output-error").textContent = "";
    document.querySelector(".output-tries").textContent = `${triesTaken} of ${triesMax} Tries`
    document.querySelector(".output-info").textContent = "Your guess was correct! You win!! 😮😁";
  }
  console.log(`CURRENT GAME\nrandomNumber: ${randomNumber}\ntriesMax:${triesMax}\ntriesTaken:${triesTaken}`)
  // for debugging
}

// For this task we will be making a "New Game" button function which will reset our game,
// Once the user clicks on this button the user will have new random number to guess
// 1. Reset the values inside the body of the function
// 2. Attach our new game button using an event listener to the .btnNewGame button
function newGame() {
  randomNumber = Math.floor(Math.random() * 100 + 1);
  //Reset randomNumber

  triesMax = 5;
  triesTaken = 0;
  //Reset tries, and triesTaken by the user

  document.querySelector(".input-guess").value = "";
  //Reset users input field

  document.querySelector(".output-error").value = "";
  document.querySelector(".output-info").value = "";
  document.querySelector(".output-tries").innerHTML = `${triesTaken} of ${triesMax} Tries`
  
  document.querySelector(".button-guess").addEventListener("click", guessNumber);

  console.log(`NEW GAME\nrandomNumber: ${randomNumber}\ntriesMax:${triesMax}\ntriesTaken:${triesTaken}`)
}

//keyboard exception
function keyBoardEvents(e) {
  if (e.keyCode === 13) {
    guessNumber();
  }
}

document.querySelector(".output-tries").innerHTML = `${triesTaken} of ${triesMax} Tries`;
document.querySelector(".button-new-game").addEventListener("click", newGame);
document.querySelector(".button-guess").addEventListener("click", guessNumber);
document.addEventListener("keypress", keyBoardEvents);