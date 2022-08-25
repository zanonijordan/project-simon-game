let gamePattern = []
let userClickedPattern = []
let buttonColors = ['red','blue','green','yellow']
let started = 0;
let level = 0;

//--------KeyPress-------
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
//-----------------------------nextSequence-----
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
//-------------------playSound----animate-----
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
//-----------------------------checkAnswer------------
function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length){

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
// -----------startOver-----------
  function startOver(){
    started = false;
    level = 0;
    gamePattern = []
    userClickedPattern = []
  }
