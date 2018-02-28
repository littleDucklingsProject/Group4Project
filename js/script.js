/** Group 4 Javascript
 * Comment out your section for code review/help
 */



// Devin Treichel Javascripts

$(document).ready();
  // Loop to create array of images
  var memoryArray = new Array();
  var i = 1;

  for (a = 0; a < 24; a++) {
    memoryArray[a] = new Image();
    memoryArray[a].src = '../images/memory/' + i + '.png';
    i += 1;
    if (i === 13) {
      i = 1;
    }
  }
  // placeholders
  var memoryValues = [];
  var memoryCardIds = [];
  var cardsFlipped = 0;

Array.prototype.memoryCardShuffle = function() {
    var i = this.length, randomIndex, tempValue;
    while (--i > 0) {
        randomIndex = Math.floor(Math.random() * (i + 1));
        tempValue = this[randomIndex];
        this[randomIndex] = this[i];
        this[i] = tempValue;
    }
}

function newBoard() {
	cardsFlipped = 0;
  turns = 0;

    memoryArray.memoryCardShuffle();
	for (var i = 0; i < memoryArray.length; i++) {
    $('#board').append('<div class="card" style="background-image: url(../images/memory/card-background.png); background-repeat: no-repeat;" onclick="memoryCardFlip(this,\'' + memoryArray[i].src + '\')"></div>');
	}
}

function memoryCardFlip(card,value) {
	if (card.innerHTML == "" && memoryValues.length < 2) {
    $(card).css({
      'background': 'url(' + value + ') no-repeat',
      'transform': 'rotateX(360deg)'
    });
    turns += 1;
		if (memoryValues.length == 0){
			memoryValues.push(value);
			memoryCardIds.push(card);
		} else if (memoryValues.length == 1) {
			memoryValues.push(value);
			memoryCardIds.push(card);
			if (memoryValues[0] == memoryValues[1]) {
				cardsFlipped += 2;
				// Clear both arrays
				memoryValues = [];
        memoryCardIds = [];
				// Check to see if the whole board is cleared
				if (cardsFlipped == memoryArray.length) {
          turns /= 2;
          setTimeout(function() {
            $('.win').html('\
            <div class="overlay">\
              <div class="popup">\
                <p id="wintext">You rock!</p><p id="playagain">Your score was: ' + turns + ' <br>Would you like to play again?</p>\
                <div class="text-right">\
                  <button id="cancel">No Thanks</button>\
                  <button id="confirm">Yes!</button>\
                </div>\
              </div>\
            </div>').fadeIn(5000, function() {
              $('#cancel').click(function() {
                window.location = '../index.html';
              });
              $('#confirm').click(function() {
                $('#board').html('');
                $('.win').html('');
                newBoard();
              });
            });
        }, 2000);
				}
			} else {
        setTimeout(function() {
          $(memoryCardIds[0]).add(memoryCardIds[1]).css({
            'background': 'url(../images/memory/card-background.png) no-repeat',
            'transform': 'none'
          }).html('');
          memoryValues = [];
          memoryCardIds = [];
        }, 1500);
      }
		}
	}
}

// End Devin Treichel Script
