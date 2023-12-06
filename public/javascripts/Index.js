// fetch lesson 
async function fetchLessonDetails(lessonId) {
    let data = {
        lessonId: lessonId
    }


    const URL = "http://localhost:3000/lesson/getLesson";

    fetch(URL ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
}

// fetch quiz
async function fetchQuizDetails(quizId) {
    let data = {
        quizId: quizId
    }


    const URL = "http://localhost:3000/quiz/getQuiz";

    fetch(URL ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        return data;
    })
}

// create and show lesson modal
function createAndShowLessonModal(lessonDetails) {
    const modal = document.createElement('div');
    modal.className = 'modal lesson-quiz-modal fade show';
    modal.id = `modal-${lessonDetails.lessonId}`;
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', `${lessonDetails.lessonId}Label`);
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${lessonDetails.lessonTopic} - ${lessonDetails.lessonLanguage}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Tabs content will be added here -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const tabsContainer = modal.querySelector('.modal-body');
    tabsContainer.innerHTML = '';

    ['simpleQuestions', 'easyQuestions', 'mediumQuestions', 'hardQuestions', 'extremeQuestions'].forEach(difficulty => {
        const questions = lessonDetails[difficulty];
        const tab = createTabElement(questions, difficulty);
        tabsContainer.appendChild(tab);
    });

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    modal.addEventListener('hidden.bs.modal', function () {
        modal.remove();
    });
}


// create and show quiz modal
function createAndShowQuizModal(id, details, datwo) {
    const modal = document.createElement('div');
    modal.className = 'modal lesson-quiz-modal fade show';
    modal.id = `modal-${id}`;
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', `${id}Label`);
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${details.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${details.description}
                </div>
                <div class="modal-footer">
                    <!-- Footer content if needed -->
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    if (getLesson && details.groups) {
        const tabsContainer = modal.querySelector('.modal-body');
        tabsContainer.innerHTML = '';
        details.groups.forEach((group, index) => {
            const tab = createTabElement(group, index);
            tabsContainer.appendChild(tab);
        });
    }

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    modal.addEventListener('hidden.bs.modal', function () {
        modal.remove();
    });
}

// create a tab element for a group of questions
function createTabElement(questions, difficulty) {
    const tab = document.createElement('div');
    tab.className = 'lesson-group-tab';
    tab.id = `tab-${difficulty}`;

    const title = document.createElement('h4');
    title.innerText = `Difficulty: ${difficulty}`;
    tab.appendChild(title);

    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-container';

    questions.forEach(questionId => {
        const questionDetails = getQuestion(questionId); 
        const questionElem = createQuestionElement(questionDetails);
        questionsContainer.appendChild(questionElem);
    });

    tab.appendChild(questionsContainer);

    return tab;
}


// event listener for lesson and quiz card 
document.querySelectorAll('.card-item').forEach(card => {
    card.addEventListener('click', async function(event) {
        event.preventDefault();
        const lessonId = this.getAttribute('data-lesson-id');//lesson1
        const quizId = this.getAttribute('data-quiz-id');//null

        let data = {
            lessonSimple1: {},
            lessonSimple2: {},
            lessonSimple3: {},
            lessonSimple4: {},
            lessonSimple5: {},
            lessonEasy1: {},
            lessonEasy2: {},
            lessonEasy3: {},
            lessonEasy4: {},
            lessonEasy5: {},
            lessonMedium1: {},
            lessonMedium2: {},
            lessonMedium3: {},
            lessonMedium4: {},
            lessonMedium5: {},
            lessonHard1: {},
            lessonHard2: {},
            lessonHard3: {},
            lessonHard4: {},
            lessonHard5: {},
            lessonExtreme1: {},
            lessonExtreme2: {},
            lessonExtreme3: {},
            lessonExtreme4: {},
            lessonExtreme5: {},
        }

        let datwo ={
            quizSimple1: {},
            quizSimple2: {},
            quizEasy1: {},
            quizEasy2: {},
            quizMedium1: {},
            quizMedium2: {},
            quizHard1: {},
            quizHard2: {},
            quizExtreme1: {},
            quizExtreme2: {},
        }
        
        if (lessonId) {
            const lessonDetails = await fetchLessonDetails(lessonId);

            const simpleLessonIds = lessonDetails.simpleQuestions;//array of simple question ids (5 questions)
            const easyLessonIds = lessonDetails.easyQuestions;//array of easy question ids (5 questions)
            const mediumLessonIds = lessonDetails.mediumQuestions;//array of medium question ids (5 questions)
            const hardLessonIds = lessonDetails.hardQuestions;//array of hard question ids (5 questions)
            const extremeLessonIds = lessonDetails.extremeQuestions;//array of extreme question ids (5 questions)

            simpleLessonIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 5; i++){
                    if(data.lessonSimple[i] == {}){
                        data.lessonSimple[i] = question;
                        break;
                    }
                }
            })

            easyLessonIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 5; i++){
                    if(data.lessonEasy[i] == {}){
                        data.lessonEasy[i] = question;
                        break;
                    }
                }
            })

            mediumLessonIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 5; i++){
                    if(data.lessonMedium[i] == {}){
                        data.lessonMedium[i] = question;
                        break;
                    }
                }
            })

            hardLessonIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 5; i++){
                    if(data.lessonHard[i] == {}){
                        data.lessonHard[i] = question;
                        break;
                    }
                }
            })

            extremeLessonIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 5; i++){
                    if(data.lessonExtreme[i] == {}){
                        data.lessonExtreme[i] = question;
                        break;
                    }
                }
            })

            if (lessonDetails) {
                createAndShowLessonModal(lessonId, lessonDetails, data);//lesson1, jsonData, true
            }
        }else if (quizId) {
            const quizDetails = await fetchQuizDetails(quizId);

            const simpleQuizIds = quizDetails.simpleQuestions;//array of simple question ids (2 questions)
            const easyQuizIds = quizDetails.easyQuestions;//array of easy question ids (2 questions)
            const mediumQuizIds = quizDetails.mediumQuestions;//array of medium question ids (2 questions)
            const hardQuizIds = quizDetails.hardQuestions;//array of hard question ids (2 questions)
            const extremeQuizIds = quizDetails.extremeQuestions;//array of extreme question ids (2 questions)

            simpleQuizIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 2; i++){
                    if(datwo.quizSimple[i] == {}){
                        datwo.quizSimple[i] = question;
                        break;
                    }
                }
            })

            easyQuizIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 2; i++){
                    if(datwo.quizEasy[i] == {}){
                        datwo.quizEasy[i] = question;
                        break;
                    }
                }
            })

            mediumQuizIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 2; i++){
                    if(datwo.quizMedium[i] == {}){
                        datwo.quizMedium[i] = question;
                        break;
                    }
                }
            })

            hardQuizIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 2; i++){
                    if(datwo.quizHard[i] == {}){
                        datwo.quizHard[i] = question;
                        break;
                    }
                }
            })

            extremeQuizIds.array.forEach(id => {
                let question = getQuestion(id);
                console.log(question);//question json data

                for(let i = 1; i <= 2; i++){
                    if(datwo.quizExtreme[i] == {}){
                        datwo.quizExtreme[i] = question;
                        break;
                    }
                }
            })

            if (quizDetails) {
                createAndShowQuizModal(quizId, quizDetails, datwo);//quiz1, jsonData, false
            }
        }
    });
});

//alyssa

function getQuestion(questionId){

    let URL = "http://localhost:3000/questions/getQuestion";

    data = {
        questionId: questionId
    }

    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {

        if(res){
            //return the question found
            console.log(res.json())
            return res.json();
        }else{
            console.log("Something wrong with finding the question Fetch")
        }
    })
}

