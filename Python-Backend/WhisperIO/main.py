from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from fastapi import FastAPI

app = FastAPI()

@app.post("/convertBinarytoMp3")
async def root(fileId: str):
    return {
        "speechTotext": convertToMp3("test")
    }




def convertToMp3(File):
    uri = "mongodb+srv://mguest:LingoLounge123@lingolounge.ahioda5.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri, server_api=ServerApi('1'))

    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")

        db = client["LingoLounge"]
        collection = db["AudioFiles"]

        data = collection.find_one({"id": "10"})

        output_file = "output_audio.mp3"  # Specify the desired output file name
        with open(output_file, "wb") as output:
            output.write(data["audio"])

        print("Audio file converted back:", output_file)

    except Exception as e:
        print(e)

convertToMp3("test")