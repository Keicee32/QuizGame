
const options = document.querySelector(".quiz-options").children;
const answerContainer = document.querySelector(".quiz-answer");
const quizNumber = document.querySelector(".question-value");
const totalSpan = document.querySelector(".total");
const correctAnswerSpan = document.querySelector(".correct-answers");
const totalQuestionSpan = document.querySelector(".total-questions2");
const question = document.querySelector(".quiz-questions")
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");
let quizIndex;
let index = 0;
let myArr = [];
let myArray = [];
let score = 0;

// This Displays the questions and the answer
const questions =[
    {
        quest:"The reuslt of 10//3 is?",
        options:['3.33333','3','3.4','2'],
        answer:1
    },
    {
        quest:"The reuslt of 10**3 is?",
        options:['1000','30','100','10000'],
        answer:0
    },
    {
        quest:"The input() in Python does what?",
        options:['Prints the input','what\'s input()','Shows result','Accepts input'],
        answer:3
    },
    {
        quest:"The reuslt of 10/3 is?",
        options:['3.4','3','3.33333','2'],
        answer:2
    },
    {
        quest:"How's a variable declared in Python?",
        options:['name','var name;','string name;','var string name'],
        answer:0
    },
    {
        quest:"What's 10 % 2?",
        options:['5','0','1','I don\t know'],
        answer:1
    }
]

totalSpan.innerHTML = questions.length;
function load(){
    quizNumber.innerHTML = index + 1;
    question.innerHTML = questions[quizIndex].quest;
    option1.innerHTML = questions[quizIndex].options[0];
    option2.innerHTML = questions[quizIndex].options[1];
    option3.innerHTML = questions[quizIndex].options[2];
    option4.innerHTML = questions[quizIndex].options[3];
    index++;
}

// This checks if the answer(options ) is correct or wrong
function check(element){
    if(element.id == questions[quizIndex].answer){
        element.classList.add("correct");
        updateAnswerShower("correct");
        score++;
        // console.log("score is : " + score);
    } else{
        element.classList.add("wrong");
        updateAnswerShower("wrong");
    }
    disableOption();
}

//This stops the user from choosing other options once he's chosen one
function disableOption(){
    for(let i = 0; i < options.length; i++){
        options[i].classList.add("disabled");
        if(options[i].id == questions[quizIndex].answer){
            options[i].classList.add("correct");
        }
    }
    
}

function enableOptions(){
    for(let i = 0; i < options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong");
    }
}
// This generates a random question for the quiz
function randomQuestion() {
    let randomNumb = Math.floor(Math.random()*questions.length);
    let hitDuplicate = 0;
    if(index == questions.length){
        quizOver();
    } else{
        if(myArr.length > 0){
            for (let i = 0; i < myArr.length; i++) {
                if(myArr[i] == randomNumb){
                    hitDuplicate = 1;
                    break;
                }
            }
            if(hitDuplicate == 1){
                randomQuestion();
            } else{
                quizIndex = randomNumb;
                load();
                myArray.push(quizIndex);
            }
        }
        if(myArr.length == 0){
            quizIndex = randomNumb;
            load();
            myArray.push(quizIndex);
        }
        
        myArr.push(quizIndex)
    }
}

function next(){
    validate();
}

function validate(){
    if(!options[0].classList.contains("disabled")){
        alert("Please choose an answer");
    } else{
        enableOptions();
        randomQuestion();
    }
}

function answerShower(){
    for(let i = 0; i < questions.length; i++){
        const div = document.createElement("div");
            answerContainer.appendChild(div);
    }
}
function updateAnswerShower(classMan){
    answerContainer.children[index-1].classList.add(classMan);
}

function quizOver(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML = score;
    totalQuestionSpan.innerHTML = questions.length;
}

function tryAgain() {
    window.location.reload();
}

// this loads the quiz
window.onload=function(){
    randomQuestion();
    this.answerShower();
}