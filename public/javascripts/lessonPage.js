let questionsArryType = ["simpleQuestions", "easyQuestions", "mediumQuestions", "hardQuestions", "extremeQuestions"];

let responseData;
let correctAnswerArry = [];

document.addEventListener("DOMContentLoaded", (event) => {
    lessonID = document.cookie.split(';')
    for(var i = 0; i < lessonID.length; i++){
        if(lessonID[i].includes("lessonId")){
            lessonID = lessonID[i].split('=')[1];
        }
    }
    fetchLessonDetails(lessonID);
  });


async function fetchLessonDetails(lessonId) {
    let data = {
        lessonId: lessonId
    }

    const URL = "http://localhost:3000/lesson/getLesson";

    try{
        const res = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        responseData = await res.json();

        console.log(responseData.lesson)

        let questionsArry;
        let questionType;
        let randomNum
        let finalQuestionsArry = [];
        for(let i = 0; i < questionsArryType.length; i++){

            randomNum = Math.floor(Math.random() * questionsArryType.length);

            questionType = questionsArryType[randomNum];

            questionsArry = responseData.lesson[questionType];

            randomNum = Math.floor(Math.random() * questionsArry.length);
                
            let question = await getQuestion(questionsArry[randomNum]);
            finalQuestionsArry.push(question);
            console.log(question)

            const options = [
                question.correctAnswer,
                question.wrongAnswerOne,
                question.wrongAnswerTwo,
                question.wrongAnswerThree
            ];

            correctAnswerArry.push(question.correctAnswer);

            document.getElementById(`q${i + 1}Label`).textContent = question.question;

            let radioButtons = document.getElementsByName(`q${i + 1}`);
            options.sort(() => Math.random() - 0.5);
            for (let j = 0; j < radioButtons.length; j++) {
                radioButtons[j].nextElementSibling.textContent = options[j];
                radioButtons[j].value = options[j];
            }

        }
    }catch(err){
        console.log(err);
    }
}

async function getQuestion(questionId){
    try {
        let URL = "http://localhost:3000/questions/getQuestion";
        let data = {
            questionId: questionId
        }
        
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching question:", error);
        throw error; // Rethrow to handle in the calling context
    }
}

function submitLesson(){
    let score = 0;
    let correctAnswer;
    let radioButtons;
    for(let i = 0; i < questionsArryType.length; i++){
        radioButtons = document.getElementsByName(`q${i + 1}`);
        for(let j = 0; j < radioButtons.length; j++){
            if(radioButtons[j].checked){
                correctAnswer = radioButtons[j].value;
            }
        }
        if(correctAnswer == correctAnswerArry[i]){
            score++;
        }
    }
    console.log(score);
    if(score == 5){
        document.getElementById('score').textContent = "Perfect Score!";
    }else if(score >= 3){
        document.getElementById('score').textContent = "Good Job!";
    }else if(score >= 1){
        document.getElementById('score').textContent = "Keep Practicing!";
    }
    document.getElementById('score').textContent = score;
    document.getElementById('score').style.display = "block";
}




