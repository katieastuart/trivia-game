//variable that calls the question area
var screen = $("#question-area");
var radioButton = $(".radio");

//object that holds the questions and answers
var questions = [{
    question: "Which Founding Father currently has over $300,000 in overdue library fines?",
    answers: ["Thomas Jefferson","Aaron Burr","George Washington","John Hancock"],
    correctAnswer: "George Washington",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Gilbert_Stuart%2C_George_Washington_%28Lansdowne_portrait%2C_1796%29.jpg/300px-Gilbert_Stuart%2C_George_Washington_%28Lansdowne_portrait%2C_1796%29.jpg",
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

//click event
$("#start").on("click", function() {
    loadQuestion(0);
    //hide start button
    $("#start").hide();
});

$(document).on('click', '.radio', function() {
    pickAnswer(0);
})



//function to load first question. WORK ON SIMPLIFYING THIS
function loadQuestion(index) {
    
    $("#question").append(questions[index].question);

    for(var i = 0; i < questions[index].answers.length; i++) {
        $("#answers").append('<div class="radio" id="radioAnswer" data-name="' + questions[index].answers[i] + '"><label><input type="radio" name="optradio">' + questions[index].answers[i] + '</label></div>');
    }
    // console.log(answerValue);

    //mark question as answered
    questions[index].answered = true;
}

function pickAnswer(index) {
    console.log("corectAnswer: " + questions[index].correctAnswer);
    console.log($(".radio").attr("data-name"));
    
    if ($(".radio").attr("data-name") === questions[index].correctAnswer) {
        console.log("CORRECT")
    }
    else {
        console.log("WRONG");
    }
}

