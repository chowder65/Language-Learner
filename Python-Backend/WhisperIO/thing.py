import whisper
import os

def loadFile(file):
    print(file)
    model = whisper.load_model("base")
    result = model.transcribe(file)

    os.remove("./output_audio.mp3")

    return result["text"]