import whisper

def loadFile(file):
    model = whisper.load_model("base")
    result = model.transcribe(file)
    print(result["text"])