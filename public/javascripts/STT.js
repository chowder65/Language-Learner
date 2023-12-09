let mediaRecorder;
let audioChunks = [];

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = async() => {
            const audioBlob = new Blob(audioChunks, {
                type: 'audio/mp3'
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            document.getElementById('audioPlayer').src = audioUrl;

            await saveRecordingToServer(audioBlob);
        };

        mediaRecorder.start();
    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
}

async function saveRecordingToServer(audioBlob) {
    let formData = new FormData();

    await new Promise((resolve) => {
        formData.append('audio', audioBlob);
        formData.append('id', 1);
        resolve();
    });
    console.log(formData);

    fetch('/audio/addAudio', {
            method: 'POST',
            body: formData
        })
        .then(response => {
    if (response.ok) {
        console.log('Success:', response);
    } else {
        console.error('Error:', response);
    }
})
.catch((error) => {
    console.error('Error:', error);
});

    fetch('http://127.0.0.1:8000/convertBinarytoMp3?fileId=1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log('Success:', response.statusText);
            console.log(response);
        } else {
            console.error('Error:', response.statusText);
        }
    }
    ).catch((error) => {
        console.error('Error:', error);
    });

    mediaRecorder.clear();
}



