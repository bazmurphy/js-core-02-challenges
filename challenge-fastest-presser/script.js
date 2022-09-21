function startGame() {
  time = (document.getElementById("game-length-input").value) * 1000;
  playerOneCount = 0;
  playerTwoCount = 0;
  preGameMessagesArray = ["Get Ready!", "3", "2", "1", "Go!"];
  keyPressAllowed = false;

  document.getElementById("game-countdown-timer").textContent = "";
  document.getElementById("game-result-message").textContent = "";

  document.getElementById("game-player-one-screen").classList.remove("player-winner");
  document.getElementById("game-player-two-screen").classList.remove("player-winner");

  document.getElementById("game-player-one-count").textContent = playerOneCount;
  document.getElementById("game-player-two-count").textContent = playerTwoCount;

  if (time > 0) {
    // preGameMessageFunction();
    intervalIdCountDown = setInterval(countDownTime, 1000);
  }

}

function preGameMessageFunction() {
  if (preGameMessagesArray.length) {
    let message = preGameMessagesArray.splice(0, 1)[0];
    document.getElementById("game-countdown-timer").textContent = message;
    setTimeout(preGameMessageFunction, 700);
  } 
  
  // else {
  //   countDownTime();  
  // }
}

function countDownTime() {
  if (time > 0) {
    keyPressAllowed = true;
    document.getElementById("game-countdown-timer").textContent = `Time Left: ${time / 1000}`;
    time -= 1000;
  } else {
    keyPressAllowed = false;
    document.getElementById("game-countdown-timer").textContent = `Time is Up!`;
    clearInterval(intervalIdCountDown);
    if (playerOneCount > playerTwoCount) {
      document.getElementById("game-result-message").textContent = `Player 1 wins with ${playerOneCount}!`;
      document.getElementById("game-player-one-screen").classList.add("player-winner");
    } else if (playerTwoCount > playerOneCount) {
      document.getElementById("game-result-message").textContent = `Player 2 wins with ${playerTwoCount}!`;
      document.getElementById("game-player-two-screen").classList.add("player-winner");
    } else if (playerOneCount === playerTwoCount) {
      document.getElementById("game-result-message").textContent = `Its a Draw!`;
    }
  }
}

function keyPressEvents(event) {
  if (time > 0 && keyPressAllowed === true) { 
    if (event.keyCode === 115) {
      playerOneCount ++;
      document.getElementById("game-player-one-count").textContent = playerOneCount;
    } else if (event.keyCode === 108) {
      playerTwoCount ++;
      document.getElementById("game-player-two-count").textContent = playerTwoCount;
    }
  }
}

function keyUpEvents(event) {
  if (time > 0 && keyPressAllowed === true) {
    if (event.keyCode === 83) {
      document.getElementById("game-player-one-screen").classList.add("player-one-button-pressed");
    } else if (event.keyCode === 76) {
      document.getElementById("game-player-two-screen").classList.add("player-two-button-pressed");
    }
  } else if (time === 0) {
    document.getElementById("game-player-one-screen").classList.remove("player-one-button-pressed");
    document.getElementById("game-player-two-screen").classList.remove("player-two-button-pressed");
  }
}

function keyDownEvents(event) {
  if (time > 0 && keyPressAllowed === true) {
    if (event.keyCode === 83) {
      document.getElementById("game-player-one-screen").classList.remove("player-one-button-pressed");
    } else if (event.keyCode === 76) {
      document.getElementById("game-player-two-screen").classList.remove("player-two-button-pressed");
    }
  }
}

let time;
let playerOneCount;
let playerTwoCount;
let intervalIdCountDown;
let preGameMessagesArray;
let keyPressAllowed;

document.getElementById("game-start-button").addEventListener("click", startGame);
document.addEventListener("keypress", keyPressEvents);
document.addEventListener("keyup", keyUpEvents);
document.addEventListener("keydown", keyDownEvents);