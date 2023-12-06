import uvicorn
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from fastapi import FastAPI
from thing import loadFile
from fastapi.middleware.cors import CORSMiddleware
from translate import Translator
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

translator = Translator(to_lang="en", from_lang="es")

@app.post("/convertBinarytoMp3")
async def root(fileId: str):
    print("fileId: ", fileId)
    speechTotext = await convertToMp3(fileId)
    print(speechTotext)
    return {
        "speechTotext": speechTotext
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

async def convertToMp3(fileId):
    print("fileId: ", fileId)

    try:
        uri = "mongodb+srv://mguest:LingoLounge123@lingolounge.ahioda5.mongodb.net/?retryWrites=true&w=majority"

        client = MongoClient(uri, server_api=ServerApi('1'))

        db = client["LingoLounge"]
        collection = db["AudioFiles"]

        data = collection.find_one({"id": fileId})

        output_file = "output_audio.mp3"
        with open(output_file, "wb") as output:
            output.write(data["audio"])

        translation = translator.translate(loadFile(output_file))
        print(translation)

        return translation
    except Exception as e:
        print(e)
        return "Error"
    
