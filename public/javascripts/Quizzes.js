

let quizbtn = setInterval(function() {
     document.getElementById('submitBtnQuiz').addEventListener('click', checkAnswers("Animals", "spansih"));
     //{
    //     event.preventDefault()
    //     console.log("submit btn clicked")
    //     checkAnswers("Animals", "spansih")
    // })
    return null;
}, (1000))

//modal

function getSession(){

    let URL = "http://localhost:3000/login"

    fetch(URL, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => {
        if(res.status == 200){
            return res.json
        }else{
            console.log("error getting user session")
        }
    })
}

function getUser(userEmail){

    let User = {
        userEmail : userEmail
    }

    let URL = "http://localhost:3000/users/getUser"

    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(User)
    })
    .then(res => {
        if(res.ok){
            return res.json()
        }else{
            console.log("problem getting user in quizzes.js")
        }
    })
}


function checkAnswers(quizToCheck, langauage){
    //call this when the user clicked the submit button in the generated pop up modal
    //get all elemnet values from the modal

    var score = 0;

    var question1Checked = document.querySelectorAll('#answer-true')

    for(checked in question1Checked){
        score ++;
    }

   
    // if(question1Checked){
    //     score ++;
    // }
    // if(question2Checked){
    //     score ++;
    // }
    // if(question3Checked){
    //     score ++;
    // }
    // if(question4Checked){
    //     score ++;
    // }
    // if(question5Checked){
    //     score ++;
    // }
    // if(question6Checked){
    //     score ++;
    // }
    // if(question7Checked){
    //     score ++;
    // }
    // if(question8Checked){
    //     score ++;
    // }
    // if(question9Checked){
    //     score ++;
    // }
    // if(question10Checked){
    //     score ++;
    // }

    //check if score is higher the 70%

    if(score >= 7){
        console.log("User passed the quiz with a score of: " + score)
        //changes the users progress for this quiz to true
        updateUserProgress(quizToCheck, langauage)
    }else{
        console.log("User Failed the quiz beacuse the scored less then 70%")
        //do nothing to change the progress

        //reset the coresponding lesson **STRETCH GOAL
    }
}

function updateUserProgress(QuizToUpdate, lanagauge){

    let langaugeProgressToUpdate = lanagauge + "LanguageCompletion"

    //get user email from the session
    let session = getSession()
    //look for a user based off the email found
    let user = getUser(session.userEmail)
    //create a body to update the user

    //naming might need to be fixed user.spanishProgress.X
    let User = {
        userEmail: user.userEmail, //get userEmail from session
        [langaugeProgressToUpdate] : user.langaugeProgressToUpdate + 5 , //get laguagCompletion from session
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


// function showQuizOnPage(quizTopic){

//     data = {
//         "quizTopic" : quizTopic,
//     }

//     //fetch the api and create the user
//     let URL = "http://localhost:3000/quiz/getQuiz"

//     fetch(URL, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//         })
//         .then(res => {
//             if(res.status == 200){
//                 console.log("Quiz Found")
//                 return res.json();    
//             }else{
//                 console.log("Something wrong with findinf quiz Fetch")
//             }
//         })
//         .then(data => {

//             //get the array of questions ids
//             const questionIds = data.questionIds

//             questionIds.array.forEach(id => {
//                 //call the get question method
//                 let question = getQuestion(id)
                
//                 //show the information on the page based on what the question returns

//                 //get all the modals ids



//             });
//         })
//         .catch(error => console.error('Error:', error))

// };

// function getQuestion(questionId){

//     let URL = "http://localhost:3000/questions/getQuestion/questionId=" + questionId

//     fetch(URL, {
//         method: "GET",
//         headers: {
//             'Content-Type' : 'application/json'
//         }
//     })
//     .then(res => {

//         if(res.status == 200){
//             //return the question found
//             return res.json();
//         }else{
//             console.log("Something wrong with finding the question Fetch")
//         }
//     })
// }




