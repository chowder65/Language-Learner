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
        let URL = "http://localhost:3000/addUser"
    
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
                }
            })
            .catch(error => console.error('Error:', error))
    }else{
        console.log("Bad Email or Password")
    }

    
};

function checkEmial(email){
    const Regex = "";
    return Regex.test(email)
}

function checkPassowrd(passowrd,){
    const Regex = ""
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
        let URL = "http://localhost:3000/getUsers"

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status == 200) {
                //go to index
                window.location.href = '/'
            }
        }).catch(error => console.error('Fetch Error:', error, 'Status Code:', error.status))
    
    }catch (error) {
        console.error('Error fetching /index', error)
    }
}