let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStart = false;
let currentLevel = 0;

$(document).keypress(function () {
  if (!gameStart) {
    gameStart = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    currentLevel = 0;
    nextSequence();
  }
});
function nextSequence() {
  userClickedPattern = []; // Reset user input
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}
$(".btn").click(function () {
  if (gameStart) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    if (checkAnswer(userClickedPattern.length - 1)) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 1000);
      }
    } else {
      startOver();
    }
  }
});

function checkAnswer(index) {
  return userClickedPattern[index] === gamePattern[index];
}
function playSound(color) {
  let audio = new Audio(`../sounds/${color}.mp3`);
  audio.play();
}
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
function startOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  gameStart = false;
}
