const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ffmpeg = require('fluent-ffmpeg');

async function storeAudioFile(req, res, next) {
    const uri = 'mongodb+srv://mguest:LingoLounge123@lingolounge.ahioda5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});
await client.connect();

let db = client.db('LingoLounge');
let collection = db.collection('AudioFiles');


    const audioData = fs.readFileSync(req.body.audioFile);

    const query = { _id: 1,
                    audio: audioData
    };

    const user = await collection.insertOne(query);
    


    console.log(audioData);
    res.sendStatus(200);
}

storeAudioFile("C:/Users/cmcculley/Desktop/audio.mp3")

module.exports = storeAudioFile;