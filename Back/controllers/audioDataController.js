const fs = require('fs');
const multer = require('multer');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ffmpeg = require('fluent-ffmpeg');

const audioFunctions = {
    storeAudioFile: async (req, res, next) => {
        try{
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
        
            console.log(req.file)

            await collection.insertOne({ audio: req.file.buffer, id: req.body.id });  
            res.send("Audio File Stored");
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }
}

module.exports = audioFunctions;