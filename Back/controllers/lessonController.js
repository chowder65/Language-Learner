const {MongoClient, ServerApiVersion } = require('mongodb');


const uri = 'mongodb+srv://mguest:LingoLounge123@lingolounge.ahioda5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});