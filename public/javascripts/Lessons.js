
//modal button
document.getElementById('# pass in one of 5 modal button id to submit lesson').addEventListener('click', function(event) {//make 5 of these event listeners for each button
    event.preventDefault();

    //check the lesson answers
    checkSimpleAnswers("Animals", "spanish")//set to be the lesson progress identitfier for updating(IE: Animals : false languageCompletion : spanishLanguageCompletion)
})

function getSession(){

    let URL = "localhost:3000/login"

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


function checkSimpleAnswers(lessonToCheck, langauage){//
    //call this when the user clicked the submit button in the generated pop up modal
    //get all elemnet values from the modal
    var score = 0;

    var question1Checked = document.getElementById('').checked
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


    //check if score is higher the 70%

    if(score >= 3){
        console.log("User passed the lesson with a score of: " + score)
        //changes the users progress for this lesson to true
        updateUserProgress(lessonToCheck, langauage)
    }else{
        console.log("User Failed the lesson beacuse the scored less then 70%")
        //do nothing to change the progress
    }
}

function updateUserProgress(LessonToUpdate, lanagauge){

    let langaugeProgressToUpdate = lanagauge + "LanguageCompletion"


let email = getSession()

    User = {
        userEmail: email.userEmail, //get userEmail from session
        [langaugeProgressToUpdate] : LanguageCompletion + 1 , //get laguagCompletion from session
        [LessonToUpdate] : true,

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


