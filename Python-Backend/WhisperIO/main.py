from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from fastapi import FastAPI
from thing import loadFile
import os

app = FastAPI()

@app.post("/convertBinarytoMp3")
async def root(fileId: str):
    print(fileId)
    return {
        "speechTotext": convertToMp3(fileId)
    }




def convertToMp3(fileId):
    uri = "mongodb+srv://mguest:LingoLounge123@lingolounge.ahioda5.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri, server_api=ServerApi('1'))

    try:

        db = client["LingoLounge"]
        collection = db["AudioFiles"]

        data = collection.find_one({"id": fileId})
        print(data)

        output_file = "output_audio.mp3"
        with open(output_file, "wb") as output:
            output.write(data["audio"])

        print("Audio file converted back:", output_file)

        return loadFile(output_file)

    except Exception as e:
        print(e)

convertToMp3("test")