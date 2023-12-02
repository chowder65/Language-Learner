let URL = "http://localhost:3000/audio/addAudio"

let data = {
    "audio" : audioData
}
    
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