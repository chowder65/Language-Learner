function speak() {
    const textToSpeak = document.getElementById('textToSpeak').value;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[0];

    window.speechSynthesis.speak(utterance);
}