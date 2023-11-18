document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault()
    goToLoginPage();
})

async function goToLoginPage(){

    try {
        const response = await fetch('http://localhost:3000/login')
        if (response.ok) {
            //go to index page
            window.location.href = '/login'
        } else {
            console.error('Failed to fetch /login route')
        }
    } catch (error) {
        console.error('Error fetching /login route:', error)
    }
}