
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// event listener for lesson and quiz card 
document.querySelectorAll('.card-item').forEach(card => {
    card.addEventListener('click', async function(event) {
        event.preventDefault();
        const lessonId = this.getAttribute('data-lesson-id');//lesson1

        setCookie("lessonId", lessonId, 1);
        window.location.href = "/lessonPage";
    });
});

document.querySelectorAll('.quiz-card-item').forEach(card => {
    card.addEventListener('click', async function(event) {
        event.preventDefault();
        const quizId = this.getAttribute('data-quiz-id');//null

        setCookie("quizId", quizId, 1);
        window.location.href = "/quizPage";
    });
});



