let gamePattern = []
let userClickedPattern = []
let buttonColors = ['red','blue','green','yellow']
let started = 0;
let level = 0;

//--------KeyPress
$(document).on('keypress', function(){
if(!started){
  $('h1').text('Level '+level)
  nextSequence();

  started = true
}

})

//-----------------CLICK--------------
$('.btn').click(function(event){
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour)

  playSound(userChosenColour)
  animateClass(userChosenColour)

  checkAnswer(userClickedPattern.length-1)

})
//-----------------------------nextSequence
function nextSequence(){
  userClickedPattern = [];
  level++

  randomNumber = Math.floor(Math.random()* 4)
  let randomChosenColour = buttonColors[randomNumber]
  gamePattern.push(randomChosenColour)

  $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)

  $('h1').text('Level '+level)
}
//----------------------------
function playSound(name){
  let audio = new Audio('sounds/'+name+'.mp3')
  audio.play()
}

function animateClass(name){
  $('#'+name).addClass('pressed')
  setTimeout(function(){
  $('#'+name).removeClass('pressed')
  },100)
}
//-----------------------------checkAnswer
function checkAnswer(currentLevel){

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      $('body').addClass('game-over')
      setTimeout(function(){
      $('body').removeClass('game-over')
    },200)

    $('h1').text('Game Over, Press Any Key to Restart')
    let audio = new Audio('sounds/wrong.mp3')
      audio.play()
      startOver()

    }
  }

  function startOver(){
    started = false;
    level = 0;
    gamePattern = []
    userClickedPattern = []
  }
