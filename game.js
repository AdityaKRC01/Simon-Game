let colors = ['red', 'blue', 'green', 'yellow'];
let gameStart = false;
let level = 0

let curSequence = [];
let playerPattern = [];

function nextSequence() {
    playerPattern = [];
    ++level;
    $('#level-title').text('Level ' + level);

    let rand = Math.floor(Math.random() * 4);
    let randomColor = colors[rand];
    curSequence.push(randomColor);

    $('#' + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);

    
}

function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play(); 
}

function animatePress(color) {
    $('#' + color).addClass('pressed');
    setTimeout(function() {
        $('#' + color).removeClass('pressed');
    },100)
}

function reStart() {
    level = 0;
    gameStart = false;
    curSequence = [];
}

function checkValid(curIndex) {
    if(playerPattern[curIndex] !== curSequence[curIndex]) {
        playSound('wrong');
        
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        },200);

        $('#level-title').text('Game Over, Press Any Key to Restart');

        reStart();

    } else {
        if(playerPattern.length === curSequence.length) {
            setTimeout(nextSequence, 1000);
        }
    }
}

$('.btn').click(
    function() {
        playerChoice = $(this).attr('id');
        playerPattern.push(playerChoice);
        playSound(playerChoice);
        animatePress(playerChoice);
        checkValid(playerPattern.length - 1);
    }
)

$(document).keypress(
    function(event)  {
        if (!gameStart) {
            nextSequence();
            gameStart = true;
        }
    }
)




// $('#' + randomColor).click(
//     function() {
//         $('#' + randomColor).fadeOut(100).fadeIn(100);
//         let audio = new Audio('sounds/' + randomColor + '.mp3');
//         audio.play();
//     }
// )

