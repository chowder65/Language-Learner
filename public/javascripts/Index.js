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
async function createAndShowLessonModal(lessonDetails) {
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
                    <h5 class="modal-title">${lessonDetails.lessonTopic}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- where lesson questions will show -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    `;

    const tabsContainer = modal.querySelector('.modal-body');
    tabsContainer.innerHTML = '';

    const difficultyLevels = ['simpleQuestions', 'easyQuestions', 'mediumQuestions', 'hardQuestions', 'extremeQuestions'];

    for (const level of difficultyLevels) {
        if (lessonDetails[level]) {
            const tabContent = [];
            for (const questionId of lessonDetails[level]) {
                const questionDetails = getQuestion(questionId);
                tabContent.push(createLessonQuestionElement(questionDetails));
            }

            const tab = createTabElement(level, tabContent);
            tabsContainer.appendChild(tab);
        }
    }

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    modal.addEventListener('hidden.bs.modal', function () {
        modal.remove();
    });
}

// create a tab element for a group of questions
function createTabElement(difficultyLevel, tabContent) {
    const tab = document.createElement('div');
    tab.className = 'lesson-group-tab';
    tab.id = `tab-${difficultyLevel}`;

    const title = document.createElement('h4');
    title.innerText = `Difficulty: ${difficultyLevel}`;
    tab.appendChild(title);

    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-container';
    tabContent.forEach(questionElem => {
        questionsContainer.appendChild(questionElem);
    });

    tab.appendChild(questionsContainer);

    return tab;
}

// question container for lesson
function createLessonQuestionElement(questionDetails) {
    const questionContainer = document.createElement('div');
    questionContainer.className = 'lesson-question';

    const questionText = document.createElement('p');
    questionText.innerText = questionDetails.question;
    questionContainer.appendChild(questionText);

    const answers = [
        { answerText: questionDetails.correctAnswer, isCorrect: true },
        { answerText: questionDetails.wrongAnswerOne, isCorrect: false },
        { answerText: questionDetails.wrongAnswerTwo, isCorrect: false },
        { answerText: questionDetails.wrongAnswerThree, isCorrect: false },
    ];
    shuffleArray(answers);

    answers.forEach((answer, index) => {
        const answerContainer = document.createElement('div');
        answerContainer.className = 'lesson-answer';

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = `answer-${questionDetails.questionId}`;
        radioInput.value = answer.isCorrect;
        radioInput.id = `answer-${questionDetails.questionId}-${index}`;

        const label = document.createElement('label');
        label.htmlFor = `answer-${questionDetails.questionId}-${index}`;
        label.innerText = answer.answerText;

        answerContainer.appendChild(radioInput);
        answerContainer.appendChild(label);
        questionContainer.appendChild(answerContainer);
    });

    return questionContainer;
}

// create and show quiz modal
async function createAndShowQuizModal(quizDetails) {
    const modal = document.createElement('div');
    modal.className = 'modal lesson-quiz-modal fade show';
    modal.id = `modal-${quizDetails.quizId}`;
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', `${quizDetails.quizId}Label`);
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${quizDetails.quizTopic}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- where quiz questions will show  -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const questionsContainer = modal.querySelector('.modal-body');

    shuffleArray(quizDetails.questionIds);

    // add questions/answers to modal
    for (const questionId of quizDetails.questionIds) {
        const questionDetails = getQuestion(questionId);
        const questionContainer = createQuizQuestionElement(questionDetails); 
        questionsContainer.appendChild(questionContainer); 
    }

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    modal.addEventListener('hidden.bs.modal', function () {
        modal.remove();
    });
}

// question container for quiz
function createQuizQuestionElement(questionDetails) {
    const questionContainer = document.createElement('div');
    questionContainer.className = 'quiz-question';

    const questionText = document.createElement('p');
    questionText.innerText = questionDetails.question;
    questionContainer.appendChild(questionText);

    const answers = [
        { answerText: questionDetails.correctAnswer, isCorrect: true },
        { answerText: questionDetails.wrongAnswerOne, isCorrect: false },
        { answerText: questionDetails.wrongAnswerTwo, isCorrect: false },
        { answerText: questionDetails.wrongAnswerThree, isCorrect: false },
    ];
    shuffleArray(answers);

    answers.forEach((answer, index) => {
        const answerContainer = document.createElement('div');
        answerContainer.className = 'quiz-answer';

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = `answer-${questionDetails.questionId}`;
        radioInput.value = answer.isCorrect;
        radioInput.id = `answer-${questionDetails.questionId}-${index}`;

        const label = document.createElement('label');
        label.htmlFor = `answer-${questionDetails.questionId}-${index}`;
        label.innerText = answer.answerText;

        answerContainer.appendChild(radioInput);
        answerContainer.appendChild(label);
        questionContainer.appendChild(answerContainer);
    });

    return questionContainer;
}

// makes questions appear in random order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
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

