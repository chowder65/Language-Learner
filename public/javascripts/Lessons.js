/*
//modal button
document.getElementById('# pass in one of 5 modal button id to submit lesson').addEventListener('click', function(event) {
    event.preventDefault();

    //check SIMPLE lesson answers
    checkSimpleAnswers("simpleAnimalLesson", "spanish")//set to be the lesson progress identitfier for updating(IE: Animals : false languageCompletion : spanishLanguageCompletion)
})
//modal button
document.getElementById('# pass in one of 5 modal button id to submit lesson').addEventListener('click', function(event) {
    event.preventDefault();

    //check EASY lesson answers
    checkEasyAnswers("easyAnimalLesson", "spanish")//set to be the lesson progress identitfier for updating(IE: Animals : false languageCompletion : spanishLanguageCompletion)
})
//modal button
document.getElementById('# pass in one of 5 modal button id to submit lesson').addEventListener('click', function(event) {//make 5 of these event listeners for each button
    event.preventDefault();

    //check MEDIUM lesson answers
    checkMediumAnswers("mediumAnimalLesson", "spanish")//set to be the lesson progress identitfier for updating(IE: Animals : false languageCompletion : spanishLanguageCompletion)
})
//modal button
document.getElementById('# pass in one of 5 modal button id to submit lesson').addEventListener('click', function(event) {//make 5 of these event listeners for each button
    event.preventDefault();

    //check HARD lesson answers
    checkHardAnswers("hardAnimalLesson", "spanish")//set to be the lesson progress identitfier for updating(IE: Animals : false languageCompletion : spanishLanguageCompletion)
})
//modal button
document.getElementById('# pass in one of 5 modal button id to submit lesson').addEventListener('click', function(event) {//make 5 of these event listeners for each button
    event.preventDefault();

    //check EXTREME lesson answers
    checkExtremeAnswers("extremeAnimalLesson", "spanish")//set to be the lesson progress identitfier for updating(IE: Animals : false languageCompletion : spanishLanguageCompletion)
})

*/

function getUser(userEmail) {
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



function fetchUserProgress(email) {
    getUser(email)
      .then(userData => {
        // Assuming userData contains the field spanishLanguageCompletion
        const progressPercent = userData.spanishProgress.spanishLanguageCompletion;
        const progressBar = document.querySelector('.progress-line.html span');
        progressBar.style.width = progressPercent + '%';
        progressBar.textContent = progressPercent + '%';
      })
      .catch(error => {
        console.error('Failed to fetch user progress:', error);
      });
  }
  
//   // Example usage, replace 'user@example.com' with the actual user's email
//   fetchUserProgress('user@example.com');
  

function getSession(){
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


function checkSimpleAnswers(lessonToCheck, langauage){//
    //call this when the user clicked the submit button in the generated pop up modal
    //get all elemnet values from the modal
    var score = 0;

    var question1Checked = document.getElementById('').checked//passin the whatevers radio buttons
    var question2Checked = document.getElementById('').checked
    var question3Checked = document.getElementById('').checked
    var question4Checked = document.getElementById('').checked
    var question5Checked = document.getElementById('').checked
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
    //check if score is higher the 3/5

    if(score >= 3){
        console.log("User passed the lesson with a score of: " + score + " out of 5!")
        //changes the users progress for this lesson to true
        updateUserProgress(lessonToCheck, langauage)
    }else{
        console.log("User Failed the lesson beacuse they answered less than 3/5 questions correctly")
        //do nothing to change the progress
    }
}


function updateSpanishProgress(userEmail) {
    getUser(userEmail)
    .then(userData => {
        // Extract the Spanish language completion value
        let spanishCompletion = userData.spanishProgress.spanishLanguageCompletion;

        // Find the progress bar element
        let progressBar = document.querySelector('.progress-line.html span');

        // Update the width of the progress bar based on the user's progress
        progressBar.style.width = spanishCompletion + '%';

        // Update the text within the progress bar
        progressBar.textContent = spanishCompletion + '%';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function fetchAndDisplayUserProgress() {
    getSession().then(sessionData => {
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
document.addEventListener('DOMContentLoaded', fetchAndDisplayUserProgress());




  




function checkEasyAnswers(lessonToCheck, langauage){//
    //call this when the user clicked the submit button in the generated pop up modal
    //get all elemnet values from the modal
    var score = 0;

    var question1Checked = document.getElementById('').checked//passin the whatevers radio buttons
    var question2Checked = document.getElementById('').checked
    var question3Checked = document.getElementById('').checked
    var question4Checked = document.getElementById('').checked
    var question5Checked = document.getElementById('').checked
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
    //check if score is higher the 3/5

    if(score >= 3){
        console.log("User passed the lesson with a score of: " + score + " out of 5!")
        //changes the users progress for this lesson to true
        updateUserProgress(lessonToCheck, langauage)
    }else{
        console.log("User Failed the lesson beacuse they answered less than 3/5 questions correctly")
        //do nothing to change the progress
    }
}


function checkMediumAnswers(lessonToCheck, langauage){//
    //call this when the user clicked the submit button in the generated pop up modal
    //get all elemnet values from the modal
    var score = 0;

    var question1Checked = document.getElementById('').checked//passin the whatevers radio buttons
    var question2Checked = document.getElementById('').checked
    var question3Checked = document.getElementById('').checked
    var question4Checked = document.getElementById('').checked
    var question5Checked = document.getElementById('').checked
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
    //check if score is higher the 3/5

    if(score >= 3){
        console.log("User passed the lesson with a score of: " + score + " out of 5!")
        //changes the users progress for this lesson to true
        updateUserProgress(lessonToCheck, langauage)
    }else{
        console.log("User Failed the lesson beacuse they answered less than 3/5 questions correctly")
        //do nothing to change the progress
    }
}


function checkHardAnswers(lessonToCheck, langauage){//
    //call this when the user clicked the submit button in the generated pop up modal
    //get all elemnet values from the modal
    var score = 0;

    var question1Checked = document.getElementById('').checked//passin the whatevers radio buttons
    var question2Checked = document.getElementById('').checked
    var question3Checked = document.getElementById('').checked
    var question4Checked = document.getElementById('').checked
    var question5Checked = document.getElementById('').checked
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
    //check if score is higher the 3/5

    if(score >= 3){
        console.log("User passed the lesson with a score of: " + score + " out of 5!")
        //changes the users progress for this lesson to true
        updateUserProgress(lessonToCheck, langauage)
    }else{
        console.log("User Failed the lesson beacuse they answered less than 3/5 questions correctly")
        //do nothing to change the progress
    }
}

function checkExtremeAnswers(lessonToCheck, langauage){//
    //call this when the user clicked the submit button in the generated pop up modal
    //get all elemnet values from the modal
    var score = 0;

    var question1Checked = document.getElementById('').checked//passin the whatevers radio buttons
    var question2Checked = document.getElementById('').checked
    var question3Checked = document.getElementById('').checked
    var question4Checked = document.getElementById('').checked
    var question5Checked = document.getElementById('').checked
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
    //check if score is higher the 3/5

    if(score >= 3){
        console.log("User passed the lesson with a score of: " + score + " out of 5!")
        //changes the users progress for this lesson to true
        updateUserProgress(lessonToCheck, langauage)
    }else{
        console.log("User Failed the lesson beacuse they answered less than 3/5 questions correctly")
        //do nothing to change the progress
    }
}




function updateUserProgress(lessonToUpdate, language) {
    getSession().then(sessionData => {
        if (sessionData && sessionData.userEmail) {
            // Now that we have the session, we can get the user's data.
            getUser(sessionData.userEmail).then(user => {
                let languageProgressToUpdate = language + "LanguageCompletion";
                let lessonAnimalsProgress = user.spanishProgress.lessonAnimals.lessonAnimalsProgress;

                let userUpdatePayload = {
                    userEmail: sessionData.userEmail,
                    [languageProgressToUpdate]: user.spanishProgress.spanishLanguageCompletion + 1,
                    [lessonToUpdate]: true,
                    lessonAnimalsProgress: lessonAnimalsProgress + 20,
                };

                let URL = "http://localhost:3000/users/updateUser";

                return fetch(URL, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userUpdatePayload)
                });
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error updating user data');
                }
            })
            .then(updateResponse => {
                console.log("User Updated", updateResponse);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            throw new Error('Session data is not available');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}
