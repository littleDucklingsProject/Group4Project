/**
 * Created by Elham Amouhadi on 2/25/2018.
 */
/**
 * Constructor to create flash cards objects
 * @param picture {image address} the image of the flash card
 * @param letter {String} the letter of the flash card
 * @param word {String} the word of the flash card
 * @param voice {audio address} the voice reading from the flash card
 * @constructor
 * @author Elham Amouhadi
 */
function FlashCards(picture, letter, word, voice){
    this.picture=picture;   //url for saving image of flashcards
    this.letter=letter;     //upper case of flashcards
    this.word=word;         //word of flashcard
    this.voice=voice;       //url saving audio of flashcards
}
//keep the url of the images and voices folder in a variable
var img="../images/flash-cards/";
var voice="../voices/";

//constant array for saving flashcards object
const cards=[];
var i=0, c=65;
//An array of the the words of the flashcards in order to save to the object
var word=['Apple', 'Bee', 'Cat', 'Dog', 'Egg', 'Flower', 'Goose'
    ,'Hat', 'Ice Cream', 'Jaguar', 'Kite', 'Lion', 'Mouse'
    ,'Nest', 'Orange', 'Peas', 'Queen', 'Rabbit', 'Snake'
    ,'Tree', 'Umbrella', 'Violin', 'Whale', 'Xylophone'
    ,'Yacht', 'Zebra'];
//generate an array of FlashCards object to hold the image url, letters, words and audios
while(i<26){
    cards[i]=new FlashCards(img+String.fromCharCode(c).toLowerCase()+".png",
        String.fromCharCode(c), word[i], voice+String.fromCharCode(c).toLowerCase()+".mp3");
    i++; c++;
}


$(document).ready(function() {
    //................................ ABC Flash Cards ............................
    //to hold index of the cards
    var counter = 0;
    $('#header').html("ABC Flash Cards");
    //set a random color for letter and word
    //show the first flashCard in the screen
    showFlashCard(counter);
    //slide down animation event for bottom button "ABC Flash Cards"
    $("#clickABC").click(function () {
        $("#containerABC").slideDown("slow").css("display", "flex");
        $("#containerQuiz").fadeOut().css("display", "none");
        showFlashCard(counter);
    });
    //event for NExt Button
    $("#next").click(function () {
        //show the next flash card if it is less than 25
        if (counter < 25) {
            counter++;
            showFlashCard(counter);

        }
        //if the counter reached end of the array, set the counter to 0 and show the flash card
        else {
            counter = 0;
            showFlashCard(counter);
        }
    });
    //event for back button
    $("#back").click(function () {
        //if the index of the array is greater than 0 show the previous flash card
        if (counter > 0) {
            counter--;
            showFlashCard(counter);
        }
        //if the counter reached at the beginning of the array, set the counter to 25
        else {
            counter = 25;
            showFlashCard(counter);
        }
    });
    //event for shuffle button
    var currentCounter = counter;
    $("#shuffle").click(function () {
        //create a random index until it is not same as the current index
        do {
            counter = randomIndex();
            showFlashCard(counter);
        } while (currentCounter === counter);
        currentCounter = counter;
    });
    //event for read button
    $("#read").click(function () {
        //play the audio of the flash card
        playCard(cards[counter].voice);

    });
});
    //................................ ABC Quizzes ............................
//set the score to zero for keeping score for ABC Quiz and left to 26 to keep the remaining questions
var score=0, left=26;
//create newCard array to keep the shuffle array of the flashcards for quiz
var newCard=[];
//keep the current index of the array in order to show the current question in newCard array
var index=0;
$(document).ready(function(){
    //slide down animation event for bottom button when click "ABC Quizzes"
    $("#clickQuiz").click(function(){
        $('#header').html("ABC Quizzes");
        //reset the score and left when user clicks on ABC Quizzes
        score=0;
        left=26;
        //slide down animation event for bottom button "ABC Quizzes"
        $("#containerQuiz").slideDown("slow").css("display", "flex");
        $("#containerABC").fadeOut().css("display", "none");
        //shuffle the FlashCards array object(cards) at the beginning
        // of the game and store in the new array and return it
        if(index === 0){
            newCard = shuffleCardArray();
            createAnswers(index, newCard);
            $("#score span").text(score);
            $("#left span").text(left);
        }
    });
    //events for 4 options of answers when it's clicked and call
    // the checkAnswer() function to check if the correct option is chosen
    $('#answer1').click(function () {
        checkAnswer("#answer1", newCard, index);

    });
    $('#answer2').click(function () {
        checkAnswer("#answer2");

    });
    $('#answer3').click(function () {
        checkAnswer("#answer3");

    });
    $('#answer4').click(function () {
        checkAnswer("#answer4");

    });
    //create the index and counter for hint button to give 3 hint if its clicked
    var i=1, c=0;
    //and index to keep the index of array in order to check what current question is
    var prevIndex = index;
    $("#hint").click(function () {
        var id="#answer";
        if(index<26) {
            //if the prevIndex is less than current index it shows c and i are set for the
            // previous question and we need to reset the i and c
            if (prevIndex !== index) {
                prevIndex = index;
                c = 0;
                i = 1;
            }
            //check if already 3 hints is given
            if (c < 3 && i < 4) {
                //if the current option is not the answer, the element will be explode
                if ($(id + i).text() !== newCard[index].letter) {
                    $(id + i).toggle("explode");
                    i++;
                    c++;
                }
                //if the current option is the answer the next option will be explode and remove from the screen
                else {
                    i++;
                    $(id + i).toggle("explode");
                }
            }
        }
    });
    $("#skip").click(function () {
        //if the current index is less than 26 and
        // it is not at the end of the newCard array the next question will be show
        if(index<26) {
            index++;
            createAnswers();
            $("#left span").text(--left);
        }
    });
    $("#listen").click(function () {
        //play the audio of the current question when the listen button is clicked
        playCard(newCard[index].voice);
    });


});

//......................................... Functions ..................................................
/**
 * This function displays the flashCards items in the screen
 * @author Elham Amouhadi
 * @param counter {Integer} index of current alphabet
 */
function showFlashCard(counter) {
        $("#flashCardImage img").attr("src", cards[counter].picture);
        $("#flashCardLetter").text(cards[counter].letter+ "  "+ cards[counter].letter.toLowerCase());
        $("#flashCardWord").text(cards[counter].word);
        //set a random color for alphabet and word
        setRandomColor($('#flashCardLetter'));
        setRandomColor($('#flashCardWord'));
}
/**
 * The playCard function plays the audio of the url that is given
 * @param voice {string} url of the audio saved in voices folder
 * @author Elham Amouhadi
 */
function playCard(voice){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', voice);
    audioElement.play();
}
/**
 * The createAnswer function generate 3 random index and call the shuffleAnswer function
 * to shuffle the correct answer between the other options and return an array of the indexes
 * and then call the showQuestion function to show the question in the screen and play
 * the audio of the question
 * @author Elham Amouhadi
 */
function createAnswers() {
    var opt1, opt2, opt3;
    //show the answers in case if the user used the hint for previous question and now are hide
    $("#answer1").show();
    $("#answer2").show();
    $("#answer3").show();
    $("#answer4").show();
    //create 3 random unique index to show in the answers boxes
    if(index<26) {
        do {
            opt1 = randomIndex();
            opt2 = randomIndex();
            opt3 = randomIndex();
            //create a new set of random indexes and check if they are same
            // (if there is any repeatative, the length of the set will be less than 4)
        } while (new Set([opt1, opt2, opt3, index]).size !== 4);
        var shuffleArr = shuffleAnswers(opt1, opt2, opt3, index);
        showQuestion(shuffleArr);
        playCard(newCard[index].voice);
    }

}

/**
 * The shuffleAnswers functions shuffles the answer between chosen random indexes
 * @param ans1 {integer} a random index of newCard array
 * @param ans2 {integer} a random index of newCard array
 * @param ans3 {integer} a random index of newCard array
 * @param ans4 {integer} the index of the answer
 * @returns {*[]} an array of integer
 * @author Elham Amouhadi
 */
function shuffleAnswers(ans1, ans2, ans3, ans4){
    var arr=[ans1, ans2, ans3, ans4];
    var  i, j;
    for(i=arr.length-1; i>0; i--){
        j=Math.floor(Math.random()*(i+1));
        //change the value of two variable in ES6
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * The checkAnswer function checks if the chosen option is the correct answer
 * @param answer {string} the chosen option id
 * @author Elham Amouhadi
 */
function checkAnswer(answer){
    //if the questions are not done yet call the isCorrect function
    if(index< 25) {
        isCorrect(answer);
    }
    //if this is the last question call the isCorrect
    // function and popup the congratulation window
    else if(index===25){
        isCorrect(answer);
        popUpWin();
    }
    //if the questions are down and user still choose an option popup the congratulation window
    else{
        popUpWin();
    }
}

/**
 * The isCorrect function checks if the user chose the correct option and go to
 * the next question if it is correct otherwise shake the wrong option and pay an audio
 * @param answer {String} the chosen option id
 * @author Elham Amouhadi
 */
function isCorrect(answer){
    if ($(answer).text() === newCard[index].letter) {
        playCard("../voices/correct.mp3");
        if(index<26) {
            index++;
            $(answer).effect('highlight', 'toggle');
            //show the score and left to the span and increase the score and decrease the left
            $("#score span").text(++score);
            $("#left span").text(--left);
            //call the creatAnswers after a delay of 1.2 seconds
            setTimeout(function(){
                createAnswers();
            }, 1200);
        }

    }
    //if the chosen option is wrong set a shake effect and play an error audio
    else {
        $(answer).effect('shake', 'toggle');
        playCard("../voices/error.mp3");
    }
}

/**
 * This function shows the question and answers with new values
 * in the screen and set a random color for the text
 * @param arr {Integer[]} and array of random indexes and answer index
 */
function showQuestion(arr) {
    if(index<26) {
            $("#qst img").attr("src", newCard[index].picture);
            setRandomColor($('#answer1'));
            $('#answer1').text(newCard[arr[0]].letter);

            setRandomColor($('#answer2'));
            $('#answer2').text(newCard[arr[1]].letter);

            setRandomColor($('#answer3'));
            $('#answer3').text(newCard[arr[2]].letter);

            setRandomColor($('#answer4'));
            $('#answer4').text(newCard[arr[3]].letter);
    }
}

/**
 * This function creates the random number between 0-25
 * @returns {number} the random integer number
 */
function randomIndex(){
    return Math.floor(Math.random() * 26);
}
/**
 * This function shuffles the cards array and keep it in a new array in order to create questions
 * @returns {Array} a random array of shuffle card object
 */
function shuffleCardArray(){
    var shuffleCard=[], i, randIndex;
    //deep copy the cards array in the shuffleArray
    for(i=0; i<cards.length; i++){
        shuffleCard[i] = new FlashCards(cards[i].picture, cards[i].letter, cards[i].word, cards[i].voice);
    }
    //create unique random index and shuffle with the current index
    for (i= shuffleCard.length-1; i>0; i--) {
        randIndex = Math.floor(Math.random() * (i + 1));
        [shuffleCard[i], shuffleCard[randIndex]] = [shuffleCard[randIndex], shuffleCard[i]];

    }
    return shuffleCard;
}

/**
 * This Function creates a popup window after the quiz is done
 * @author Elham Amouhadi
 */
function popUpWin(){
    $('.win').html(
        "<div class='modal'>" +
            "<div class='modal-content'>" +
                "<p class='blueTxt'>Well Done!<br>Do You Want to Play Again?</p>" +
                "<img src='../images/flash-cards/f.png'/>" +
                "<div class='button-popup-wrap'>" +
                    "<button class='button greenBtn' id='ok'>Play Again</button>" +
                    "<button class='button greenBtn' id='cancel'>Cancel</button>" +
                "</div>" +
            "</div> " +
        "</div>").fadeIn(2000, function () {
            $('#ok').click(function () {
                //if the user clicks on play again reset the variables to generate new questions
                score=0;
                left=26;
                index=0;
                //shuffle the cards array and store in newCard
                newCard = shuffleCardArray();
                createAnswers();
                $("#score span").text(score);
                $("#left span").text(left);
                $('.win').fadeOut();
            });
            $('#cancel').click(function () {
                $('.win').fadeOut();
            });
    });
}
/**
 * This function generates a random color
 * @returns {string} the hex code of the color
 * @author Elham Amouhadi
 */
function getRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for(i=0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

/**
 * This function sets the color of a element
 * @param element the id of the element
 * @author Elham Amouhadi
 */
function setRandomColor(element) {
    element.css("color", getRandomColor());
}