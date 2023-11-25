document.getElementById('#').addEventListener('click', function(event) {
    event.preventDefault();
    console.log("A card has been clicked")


    //pass in the topic based on what id was clicked
    GetQuiz("#");
})


function GetQuiz(quizTopic){

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