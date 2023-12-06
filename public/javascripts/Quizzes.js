// //card
// document.getElementById('# pass in a card id').addEventListener('click', function(event) {
//     event.preventDefault();
//     console.log("A card has been clicked")


//     //get the user session data and check to see if the quiz they clicked has the lesson accosiated complted

//     if(data){
//         //fetch the quiz and show the returned data on the page
//         showQuizOnPage("quizAnimals")//pass in a quizTopic
//     }else{
//         //if not completed dont show anything
//     }    
// })


//modal button
document.getElementById('# pass in modal button id to submit quiz').addEventListener('click', function(event) {
    event.preventDefault();

    //check the quiz answers
    checkAnswers("Animals", "spanish")//set to be the quiz progress identitfier for updating(IE: Animals : false languageCompletion : spanishLanguageCompletion)
})

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
        method: "GET",
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

    var question1Checked = document.getElementById('').checked
    var question2Checked = document.getElementById('').checked
    var question3Checked = document.getElementById('').checked
    var question4Checked = document.getElementById('').checked
    var question5Checked = document.getElementById('').checked
    var question6Checked = document.getElementById('').checked
    var question7Checked = document.getElementById('').checked
    var question8Checked = document.getElementById('').checked
    var question9Checked = document.getElementById('').checked
    var question10Checked = document.getElementById('').checked

   
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






function updateSpanishProgress(userEmail) {
    getUserAPB(userEmail)
    .then(userData => {
        // Extract the quizAnimals true/false value
    
      if (userData.spanishProgress.quizAnimals) {
        setProgressBarToCompletionQuiz();
    } else {
    //do nothing keep at 0%
    }

    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function setProgressBarToCompletionQuiz() {
    // Find the progress bar element
    let progressBar = document.querySelector('.quiz-progress-line.html span');

    // Set the width of the progress bar to 100%
    progressBar.style.width = '100%';

    // Update the text within the progress bar, if needed
    progressBar.textContent = '100%';
}


function fetchAndDisplayUserProgressQuiz() {
    getSessionAPB().then(sessionData => {
        // Check if sessionData contains the user object and userEmail
        if (sessionData && sessionData.userEmail) {
            // Call updateSpanishProgress with the user's email
            updateSpanishProgress(sessionData.userEmail);
        } else {
            // Handle the case when sessionData is empty or userEmail is not set
            console.error('No session data found or user is not logged in');
            // Here you can redirect to login page or show a message to the user
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}

// Call this function when the page loads
// document.addEventListener('DOMContentLoaded', fetchAndDisplayUserProgressQuiz());  

setInterval(fetchAndDisplayUserProgressQuiz, 100);
document.addEventListener('DOMContentLoaded', fetchAndDisplayUserProgressQuiz); // Note: No parentheses after the function name





function getSessionAPB(){
    let URL = "http://localhost:3000/login/session";

    return fetch(URL, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    
    .then(res => res.ok ? res.json() : Promise.reject('Error getting user session'))
    .catch(err => console.error('Error:', err));
}




function getUserAPB(userEmail) {
    // Define the URL for the API endpoint
    let URL = "http://localhost:3000/users/getUser";

    // Create a user payload with the userEmail
    let userPayload = {
        userEmail: userEmail
    };

    // Return the fetch promise chain
    return fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        // Send the user email in the request body
        body: JSON.stringify(userPayload)
    })
    .then(response => {
        // Check if the response status is OK (status code 200)
        if (response.ok) {
            // Parse the JSON body of the response
            return response.json();
        } else {
            // If the response is not ok, throw an error that will be caught by the .catch() block
            throw new Error('Problem getting user data');
        }
    })
    .catch(error => {
        // Log and re-throw the error for further chaining
        console.error('Error fetching user data:', error);
        throw error;
    });
}
