document.getElementById('CreateUserButton').addEventListener('click', function(event) {
    event.preventDefault();
    console.log("create user button clicked!")
    createUser();
})

document.getElementById('LoginUserButton').addEventListener('click', function(event) {
    event.preventDefault();
    loginUser();
    console.log("Login user button clicked!")
})



function createUser(){
    console.log("create button clicked!")

    // Get the values from the form fields
    let Password = document.getElementById("CreatePassword").value;
    let PasswordTwo = document.getElementById("CreatePasswordTwo").value
    let Email = document.getElementById("CreateEmail").value;

    if(Password == PasswordTwo && checkEmial(Email) && checkPassowrd(Password)){
        let data = {
            "userEmail" : Email,
            "userPassword" : Password,
        }
    
        //fetch the api and create the user
        let URL = "http://localhost:3000/users/addUser"
    
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(res => {
                if(res.status == 200){
                    console.log("User Created!")
                }else{
                    console.log("Something wrong with User Creation Fetch")
                }
            })
            .catch(error => console.error('Error:', error))
    }else{
        console.log("Bad Email or Password")
    }

    
};

function checkEmial(email){
    const Regex = new RegExp("^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$");
    return Regex.test(email)
}

function checkPassowrd(passowrd,){
    //one uppercase, one lowercase, 1 special character, 8 character min
    const Regex =  new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{8,}$")
    return Regex.test(passowrd)
}


function loginUser(){
    // Get the values from the form fields
    let Email = document.getElementById("LoginEmail").value;
    let Password = document.getElementById("LoginPassword").value;

    try{

        let data = {
            "userEmail" : Email,
            "userPassword" : Password,
        }

        //fetch the api and get the user
        let URL = "http://localhost:3000/login"

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status == 200) {
                console.log("here")
                window.location.href = '/'
            }else{
                console.log("something wrong with the User login Fetch")
            }
        }).catch(error => console.error('Fetch Error:', error, 'Status Code:', error.status))
    
    }catch (error) {
        console.error('Error fetching /index', error)
    }
}