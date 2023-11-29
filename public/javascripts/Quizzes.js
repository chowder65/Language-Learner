//card
document.getElementById('# pass in a card id').addEventListener('click', function(event) {
    event.preventDefault();
    console.log("A card has been clicked")


    //get the user session data and check to see if the quiz they clicked has the lesson accosiated complted

    if(data){
        //fetch the quiz and show the returned data on the page
        showQuizOnPage("#")//pass in a quizTopic
    }else{
        //if not completed dont show anything
    }    
})


//modal button
document.getElementById('# pass in modal button id to submit quiz').addEventListener('click', function(event) {
    event.preventDefault();

    //check the quiz answers
    checkAnswers("#", "spanish")//set to be the quiz progress identitfier for updating(IE: quizAnimals : false languageCompletion : spanishLanguageCompletion)
})


function checkAnswers(quizToCheck, langauage){
    //call this when the user clicked the submit button in the generated pop up modal
    //get all elemnet values from the modal

    var score = 0;

    var question1Checked = document.getElementById('').checked
    var question2Checked = document.getElementById("").checked
    var question3Checked = document.getElementById("").checked
    var question4Checked = document.getElementById("").checked
    var question5Checked = document.getElementById("").checked
    var question6Checked = document.getElementById("").checked
    var question7Checked = document.getElementById("").checked
    var question8Checked = document.getElementById("").checked
    var question9Checked = document.getElementById("").checked
    var question10Checked = document.getElementById("").checked

   
    if(question1Checked){
        score ++;
    }
    if(question2Checked){
        score ++;
    }
    if(question3Checked){
        score ++;
    }
    if(question4Checked){
        score ++;
    }
    if(question5Checked){
        score ++;
    }
    if(question6Checked){
        score ++;
    }
    if(question7Checked){
        score ++;
    }
    if(question8Checked){
        score ++;
    }
    if(question9Checked){
        score ++;
    }
    if(question10Checked){
        score ++;
    }

    //check if score is higher the 70%

    if(score >= 7){
        console.log("User passed the quiz with a score of: " + score)
        //changes the users progress for this quiz to true
        updateUserProgress(quizToCheck)
    }else{
        console.log("User Failed the quiz beacuse the scored less then 70%")
        //do nothing to change the progress
    }
}

function updateUserProgress(QuizToUpdate, lanagauge){

    let langaugeProgressToUpdate = lanagauge + "LanguageCompletion"

    //get the Email to query the user and update their progress
    //get the users current LanguageCompletion

    //NOT DONE YET NEEDS TO BE REVISTED
    //#
    //#

    User = {
        userEmail: userEmail, //get userEmail from session
        [langaugeProgressToUpdate] : LanguageCompletion + 5 , //get laguagCompletion from session
        [QuizToUpdate] : true,
    }

    let URL = "http://localhost:3000/users/updateUser";

    fetch(URL, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(User)
    })
    .then(res => {
        if(res.status == 200){
            console.log("User Updated")
        }else{
            console.log("Something went wrong")
        }
    })
}


function showQuizOnPage(quizTopic){

    data = {
        "quizTopic" : quizTopic,
    }

    //fetch the api and create the user
    let URL = "http://localhost:3000/quiz/getQuiz"

    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(res => {
            if(res.status == 200){
                console.log("Quiz Found")
                return res.json();    
            }else{
                console.log("Something wrong with findinf quiz Fetch")
            }
        })
        .then(data => {

            //get the array of questions ids
            const questionIds = data.questionIds

            questionIds.array.forEach(id => {
                //call the get question method
                let question = getQuestion(id)
                
                //show the information on the page based on what the question returns

                //get all the modals ids



            });
        })
        .catch(error => console.error('Error:', error))

};

function getQuestion(questionId){

    let URL = "http://localhost:3000/questions/getQuestion/questionId=" + questionId

    fetch(URL, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => {

        if(res.status == 200){
            //return the question found
            return res.json();
        }else{
            console.log("Something wrong with finding the question Fetch")
        }
    })
}