// fetch lesson or quiz 
async function fetchDetails(id, isLesson = true) {
    const url = `http://localhost:3000/${isLesson ? 'lessons' : 'quizzes'}/${id}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching details:', error);
        return null;
    }
}

// create and show the modal
function createAndShowModal(id, details, isLesson = true) {
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
                <div class="modal-body">${details.description}</div>
                <div class="modal-footer">
                    <!-- Footer content if needed -->
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    if (isLesson && details.groups) {
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
function createTabElement(group, index) {
    const tab = document.createElement('div');
    tab.className = 'lesson-group-tab';
    tab.id = `group-tab-${index}`;

    const title = document.createElement('h4');
    title.innerText = group.title;
    tab.appendChild(title);

    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-container';

    group.questions.forEach((question, qIndex) => {
        const questionElem = document.createElement('p');
        questionElem.innerText = `${qIndex + 1}. ${question}`;
        questionsContainer.appendChild(questionElem);
    });

    tab.appendChild(questionsContainer);

    return tab;
}

// event listener for lesson and quiz card 
document.querySelectorAll('.card-item').forEach(card => {
    card.addEventListener('click', async function(event) {
        event.preventDefault();
        const lessonId = this.getAttribute('data-lesson-id');
        const quizId = this.getAttribute('data-quiz-id');
        
        if (lessonId) {
            const lessonDetails = await fetchDetails(lessonId, true);
            if (lessonDetails) {
                createAndShowModal(lessonId, lessonDetails, true);
            }
        } else if (quizId) {
            const quizDetails = await fetchDetails(quizId, false);
            if (quizDetails) {
                createAndShowModal(quizId, quizDetails, false);
            }
        }
    });
});
