// function to open the modal when a card is clicked
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            const lessonId = card.getAttribute('data-lesson-id');
            // Assuming fetchLessonDetails is a function that fetches details for a specific lesson
            fetchLessonDetails(lessonId).then(lesson => {
                if (lesson) {
                    openModal(lesson);
                }
            });
        });
    });
});

// function to fetch lesson details
async function fetchLessonDetails(lessonId) {
    try {
        const response = await fetch(`http://localhost:3000/lessons/${lessonId}`);
        const lesson = await response.json();
        return lesson;
    } catch (error) {
        console.error('Error fetching lesson details:', error);
    }
}

// function to open the modal
function openModal(lesson) {
    document.getElementById('modalTitle').innerText = lesson.title;
    document.getElementById('modalDescription').innerText = lesson.description;

    // tabs for each group of questions
    const tabsContainer = document.getElementById('modalTabsContainer'); 
    tabsContainer.innerHTML = '';
    lesson.groups.forEach((group, index) => {
        const tab = createTabElement(group, index);
        tabsContainer.appendChild(tab);
    });

    document.getElementById('myModal').style.display = 'block';
}

// function to create a tab element
function createTabElement(group, index) {

}
