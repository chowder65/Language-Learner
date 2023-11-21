import whisper

model = whisper.load_model("base")
result = model.transcribe("C:\\Users\\cmcculley\\Desktop\\Whisper.IO-Test\\audio.wav")
print(result["text"])