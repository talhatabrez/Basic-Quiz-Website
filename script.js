const questions = [
    {
        question: "What does CPU stand for?",
        answers: [
            {text: "Central Public Unit", correct: false},
            {text: "Control Processing Unit", correct: false},
            {text: "Central Private Unit", correct: false},
            {text: "Central Processing Unit", correct: true},
        ]
    }, 
    {
        question: "What does ALU stand for?",
        answers: [
            {text: "Arithmetic Logic Unit", correct: true},
            {text: "Apple Lidar Unit", correct: false},
            {text: "Auto Lexical Unit", correct: false},
            {text: "Anti Leachers Unit", correct: false},
        ]
    }, 
    {
        question: "What is a Process?",
        answers: [
            {text: "Process is a collection of folders to save the files", correct: false},
            {text: "Process is a logic", correct: false},
            {text: "Process is light weight and executes file and threads", correct: true},
            {text: "Process is used to signify the algorithms", correct: false},
        ]
    }, 
    {
        question: "What does Select * condition do?",
        answers: [
            {text: "Selects the condition with * value", correct: false},
            {text: "Selects all the columns in that table", correct: true},
            {text: "Selects the condition in negation", correct: false},
            {text: "Selects the conditions in Operating Systems", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuest = questions[currentQuestIndex];
    let questionNo = currentQuestIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuest.question;

    currentQuest.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } 
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestIndex++;
    if(currentQuestIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score}!!`;
    nextButton.innerHTML = "Play again!";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () =>{
    if(currentQuestIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();