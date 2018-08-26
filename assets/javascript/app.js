//variable that calls the question area
var screen = $("#question-area");
var radioButton = $(".radio");
var correctAnswers = 0;
var wrongAnswers = 0;
var notAnswered = 0;
var currentQuestion = 0;
var countStartNumber = 10;
var intervalID;

//object that holds the questions and answers
var questions = [{
    question: "Which Founding Father currently has over $300,000 in overdue library fines?",
    answers: ["Thomas Jefferson","Aaron Burr","George Washington","John Hancock"],
    correctAnswer: "George Washington",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Gilbert_Stuart%2C_George_Washington_%28Lansdowne_portrait%2C_1796%29.jpg/300px-Gilbert_Stuart%2C_George_Washington_%28Lansdowne_portrait%2C_1796%29.jpg",
    image1: "../images/george_washington.jpg",
    answered: false
}, {
    question: "What river did Washington cross with the Continental Army on Christmas Day 1776?",
    answers: ["Hudson","East","Kennebec","Delaware"],
    correctAnswer: "Delaware",
    image: "http://s3.amazonaws.com/mtv-main-assets/files/resources/large_crossing-the-delaware-met-museum.jpg",
    answered: false
}, {
    question: "What was Benjamin Franklin's pen name when he published in the New England Courant?",
    answers: ["Silence Dogood","Richard Saunders","Frank Smith","Polly Baker"],
    correctAnswer: "Silence Dogood",
    image: "https://thumbs-prod.si-cdn.com/S688lYwrKJhKQ4vFdBrOFvq6TEw=/800x600/filters:no_upscale()/https://public-media.smithsonianmag.com/filer/20110520090044benjamin-franklin-520.jpg",
    answered: false
}, {
    question: "Which Founding Father had two grizzly bears as pets in the White House?",
    answers: ["John Adams","James Monroe","Thomas Jefferson","James Madison"],
    correctAnswer: "Thomas Jefferson",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/T_Jefferson_by_Charles_Willson_Peale_1791_2.jpg/200px-T_Jefferson_by_Charles_Willson_Peale_1791_2.jpg",
    answered: false
}, {
    question: "Who is the $10 Founding Father?",
    answers: ["George Washington","Alexander Hamilton","Thomas Jefferson","Benjamin Frankilin"],
    correctAnswer: "Alexander Hamilton",
    image: "https://assets.change.org/photos/6/gr/eh/LPGrEHTtpQdodlu-1600x900-noPad.jpg?1524360368",
    answered: false
}]

//click events and functions
//start game
$("#start").on("click", function() {
    loadQuestion(currentQuestion);
    //hide start button
    $("#start").hide();
    $('#timer').prepend('<h2>Time Remaining: <span id="counter-number">10</span> Seconds</h2>');
});

//selected an answer
$(document).on('click', 'input[type="radio"]', function() {
    //grab the value of the button
    var selectedAnswer = $(this).val();
    //pass the value into the pickAnswer function
    pickAnswer(currentQuestion, selectedAnswer);
})

//restart game
$(document).on("click", "#restart", function() {
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    notAnswered = 0;
    countStartNumber = 10;
    $("#score").hide();
    $("#timer").show();
    $("#question").show();
    $("#answers").show();
    loadQuestion(currentQuestion);
});

//loads next question
function nextQuestion() {
    countStartNumber = 10;
    currentQuestion++;
    $("#timer").show();
    $("#question").show();
    $("#answers").show();
    $("#results").hide();
    loadQuestion(currentQuestion);
}

//loads results when game is over
function results() {
    $("#results").hide();
    $("#timer").hide();
    $("#score").html("<h2>Game Over!</h2>")
    $("#score").append("<h3>Correct Answers: " + correctAnswers)
    $("#score").append("<h3>Incorrect Answers: " + wrongAnswers)
    $("#score").append("<h3>Unanswered: " + notAnswered)
    $("#score").append("<button id='restart'>Restart</button>")
}

//hides question and answers divs, shows the results div, handles the logic to either show the next question or the results
function displayAnswer() {
    $("#results").show();
    $("#question").hide();
    $("#answers").hide();
    $("#timer").hide();
    $("#results").append("<img src='" + questions[currentQuestion].image + "'/>")
        if (currentQuestion === questions.length - 1){
            setTimeout(results, 2 * 1000);
          } else {
            setTimeout(nextQuestion, 2 * 1000);
          }
}

//start timer function
function startTimer() {
    clearInterval(intervalID);
    intervalID = setInterval(countdown, 1000);
}

//timer function
function countdown() {
    countStartNumber--;
    $("#counter-number").html(countStartNumber);
    if (countStartNumber === 0) {
        console.log("TIME UP")
        timeUp();
    }
}

//displays time up message and correct answer if time runs out
function timeUp() {
    clearInterval(intervalID);
    countStartNumber = 10;
    notAnswered++;
    $("#results").html("<h2>Times Up!</h2>")
    $("#results").append("<p>The correct answer was <strong>" + questions[currentQuestion].correctAnswer + "</strong>.")
    displayAnswer();
}

//function to load first question
function loadQuestion(currentQuestion) {

    //starts timer
    startTimer();

    // timer = setInterval(countdownTimer, 1000);
    
    //add question to screen
    $("#question").html(questions[currentQuestion].question);

    //empties answers if present from previous question
    $("#answers").empty();

    //adds answer options to screen
    for(var i = 0; i < questions[currentQuestion].answers.length; i++) {
        $("#answers").append('<div class="radio" id="radioAnswer" data-name="'
        + questions[currentQuestion].answers[i] + '"><label><input type="radio" name="optradio" value="'
        + questions[currentQuestion].answers[i] + '">' + questions[currentQuestion].answers[i] + '</label></div>');
    }

    //mark question as answered
    questions[currentQuestion].answered = true;
}

//function to determine if correct answer was picked and display on screen
function pickAnswer(currentQuestion, selectedAnswer) {

    //correct answer selected
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        correctAnswers++;
        $("#results").html("<h2>Correct!</h2>")
        displayAnswer();
    }
    //wrong answer selected
    else {
        wrongAnswers++;
        $("#results").html("<h2>Nope!</h2>")
        $("#results").append("<p>The correct answer was <strong>" + questions[currentQuestion].correctAnswer + "</strong>.")
        displayAnswer();

    }
}


//FIX TIMER SO IT ACTUALLY RESETS TO 10