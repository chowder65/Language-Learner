document.getElementById('logoutBtnModal').addEventListener('click', function(event) {
    event.preventDefault();
    console.log("logout button clicked")
    logoutUser();
})


function logoutUser(){
    URL = "http://localhost:3000/logout"

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        .then(res => res.status)
        .then(res => console.log(res))
        .catch(error => console.error('Error:', error))

        //return the user to the index page
        window.location.href = '/login'
};