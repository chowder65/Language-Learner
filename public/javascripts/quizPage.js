let responseData;
let correctAnswerArry = [];

document.addEventListener("DOMContentLoaded", (event) => {
    quizId = document.cookie.split(';')
    for(var i = 0; i < quizId.length; i++){
        if(quizId[i].includes("quizId")){
            quizId = quizId[i].split('=')[1];
        }
    }
    fetchQuizDetails(quizId);
  });


async function fetchQuizDetails(lessonId) {
    let data = {
        quizId: quizId
    }

    const URL = "http://localhost:3000/quiz/getQuiz";

    try{
        const res = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        console.log(res)

        responseData = await res.json();

        console.log(responseData.questionIds)

        let questionsArry;
        let questionType;
        let randomNum
        let finalQuestionsArry = [];
        for(let i = 0; i < responseData.questionIds.length; i++){
                
            let question = await getQuestion(responseData.questionIds[i]);

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

function submitQuiz(){
    let score = 0;
    let correctAnswer;
    let radioButtons;
    for(let i = 0; i < responseData.questionIds.length; i++){
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
    if(score == 10){
        document.getElementById('score').textContent = "Perfect Score!";
    }else if(score >= 7){
        document.getElementById('score').textContent = "Good Job!";
    }else if(score >= 4){
        document.getElementById('score').textContent = "Keep Practicing!";
    }
    //document.getElementById('score').textContent = score;
    document.getElementById('score').style.display = "block";
}