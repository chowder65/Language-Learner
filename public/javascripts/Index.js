// fetch lesson 
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
        console.log(res);
        return res.json();
    }catch(err){
        console.log(err);
    }
}

// fetch quiz
async function fetchQuizDetails(quizId) {
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
        console.log(res);
        return res.json();
    }catch(err){
        console.log(err);
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const lessonDetails = await response.json();
    console.log('lesson Deatails' + lessonDetails);
    return lessonDetails;
}

// create and show lesson modal
async function createAndShowLessonModal(lessonId, lessonDetails, data) {

    document.querySelectorAll('#modal-' + lessonDetails.lesson.lessonId + ' .nav-link').forEach(tab => {
        tab.addEventListener('click', function(event) {

            event.preventDefault();
    
            document.querySelectorAll('#modal-' + lessonDetails.lesson.lessonId + ' .nav-link').forEach(t => {
                t.classList.remove('show active');
            });
    
            this.classList.add('show active');
    
            document.querySelectorAll('#modal-' + lessonDetails.lesson.lessonId + ' .tab-pane').forEach(pane => {
                pane.classList.remove('show');
                pane.classList.remove('active');
            });
    
            const targetId = this.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('show');
                targetContent.classList.add('active');
            }
        });
    });

    const modal = document.createElement('div');
    modal.className = 'modal lesson-quiz-modal fade show';
    modal.id = `modal-${lessonDetails.lesson.lessonId}`;
     //modal.setAttribute('tabindex'/*, '-1'*/);
    modal.setAttribute('aria-labelledby', `${lessonDetails.lesson.lessonId}Label`);
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${lessonDetails.lesson.lessonTopic}</h5>
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

    //create tab container
    const tabElement = createTabElement();//return ul and tab

    const difficultyLevels = ['simpleQuestions', 'easyQuestions', 'mediumQuestions', 'hardQuestions', 'extremeQuestions'];

    for (const level of difficultyLevels) {
        if (lessonDetails.lesson[level]) {
            const tabContent = [];
            for (const questionId of lessonDetails.lesson[level]) {
                const questionDetails = await getQuestion(questionId);
                tabContent.push(createLessonQuestionElement(questionDetails));
            }

            //make each li and append it to the ul element
            const listElement = createListElement(level);//create li element
            tabElement.ul.appendChild(listElement);//append li to ul


            //append each question data div to tabElement
            const questionElement = createQuestionsContainerElement(level, tabContent);//append to tab
            tabElement.tabContent.appendChild(questionElement);

            //const tabElement = createTabElement(level, tabContent);
            tabsContainer.appendChild(tabElement.tabContent);
        }
    }

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();

    modal.addEventListener('hidden.bs.modal', function () {
        modal.remove();
    });

    // let checkExist = setInterval(function() {
    //     const easyTab = document.getElementById('tabeasyQuestions');
    //     const simpleTab = document.getElementById('tabsimpleQuestions');
    //     const mediumTab = document.getElementById('tabmediumQuestions');
    //     const hardTab = document.getElementById('tabeasyQuestions');
    //     const extremeTab = document.getElementById('tabextremeQuestions');
    //     if (easyTab || simpleTab || mediumTab || hardTab || extremeTab) {
    //        console.log("Element exists!");
    //        clearInterval(checkExist);
    //        easyTab.addEventListener('click', function(event) {
    //         console.log("Clicked");

    //         modal.remove();
    //     });
    //     mediumTab.addEventListener('click', function(event) {
    //         console.log("Clicked");

    //         modal.remove();
    //     });
    //     hardTab.addEventListener('click', function(event) {
    //         console.log("Clicked");

    //         modal.remove();
    //     });
    //     simpleTab.addEventListener('click', function(event) {
    //         console.log("Clicked");

    //         modal.remove();
    //     });
    //     extremeTab.addEventListener('click', function(event) {
    //         console.log("Clicked");

    //         modal.remove();
    //     });
    //         }
    //  }, 1)

    

    //delete modal and load new one
    //modal.remove();

}

function createListElement(difficultyLevel) {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.role = 'presentation';

    const button = document.createElement('button');
    button.className = 'nav-link';
    button.dataset.bsToggle = 'tab';
    button.dataset.bsTarget = `#tab${difficultyLevel}`;
    button.type = 'button';
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `tab${difficultyLevel}`);
    button.ariaSelected = 'true';
    button.innerText = `Difficulty: ${difficultyLevel}`;
    button.id = `tab${difficultyLevel}`; 

    if (difficultyLevel === "simpleQuestions") {
        button.className += ' active';
        button.ariaSelected = 'true';
    } else {
        button.ariaSelected = 'false';
    }

    li.appendChild(button);

    return li;
}

function createQuestionsContainerElement(difficultyLevel, tabContent) {
    const questionsContainer = document.createElement('div');
    questionsContainer.id = `tab${difficultyLevel}`;
    questionsContainer.setAttribute('role', 'tabpanel');
    questionsContainer.className = 'tab-pane fade';
    questionsContainer.setAttribute('aria-labelledby', `tab${difficultyLevel}`);

    if (difficultyLevel === "simpleQuestions") {
        questionsContainer.classList.add('show', 'active');
    }


    questionsContainer.classList.add = `questions-container-${difficultyLevel}`;
    tabContent.forEach(questionElem => {
        questionsContainer.append(questionElem);
    });

    return questionsContainer;

}

// create a tab element for a group of questions
function createTabElement() {

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    tabContent.id = 'myTabContent';

    const ul = document.createElement('ul');
    ul.className = 'nav nav-tabs';
    ul.role = 'tablist';

    //li.appendChild(button);
    //ul.appendChild(li);
    tabContent.appendChild(ul);
    

    return { ul, tabContent};
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
async function createAndShowQuizModal(quizId, quizDetails, datwo) {
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
                    <button type="button" id="submitBtnQuiz" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const questionsContainer = modal.querySelector('.modal-body');

    shuffleArray(quizDetails.questionIds);

    // add questions/answers to modal
    for (const questionId of quizDetails.questionIds) {
        const questionDetails = await getQuestion(questionId);
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
        radioInput.id = `answer-${answer.isCorrect}${index}`;
        //${questionDetails.questionId}-${index}

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
            console.log(lessonDetails);//lesson json data

            const simpleLessonIds = lessonDetails.lesson.simpleQuestions;//array of simple question ids (5 questions)
            console.log(simpleLessonIds);
            const easyLessonIds = lessonDetails.lesson.easyQuestions;//array of easy question ids (5 questions)
            const mediumLessonIds = lessonDetails.lesson.mediumQuestions;//array of medium question ids (5 questions)
            const hardLessonIds = lessonDetails.lesson.hardQuestions;//array of hard question ids (5 questions)
            const extremeLessonIds = lessonDetails.lesson.extremeQuestions;//array of extreme question ids (5 questions)

            let objArry = ["lessonSimple", "lessonEasy", "lessonMedium", "lessonHard", "lessonExtreme"]


        for(const id of simpleLessonIds){
            let question = await getQuestion(id);

            let i = 0;
            i++;

            for(let j = 0; j <=5; j++){


                let propNumber = objArry[i] + j.toString();
                data[propNumber] = question;
            }
       }

       console.log("data" + data);

            if (lessonDetails) {
                createAndShowLessonModal(lessonId, lessonDetails, data);//lesson1, jsonData, true
            }
        }else if(quizId) {
            const quizDetails = await fetchQuizDetails(quizId);

            const quizQuestionIds = quizDetails.questionIds;//array of simple question ids (2 questions)

                quizQuestionIds.forEach(async id => {
                    console.log(id);
                    let question = await getQuestion(id);
                    datwo[id] = question;
                })
    
            if (quizDetails) {
                createAndShowQuizModal(quizId, quizDetails, datwo);//quiz1, jsonData, false
            }
        }
    });
});

//alyssa

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
