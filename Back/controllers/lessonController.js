const {MongoClient, ServerApiVersion } = require('mongodb');


const uri = 'mongodb+srv://mguest:LingoLounge123@lingolounge.ahioda5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});

let lessonController = {
    getLesson: async (req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Lessons');

        const query = req.body.quizTopic;
        const lesson = await collection.findOne({ lessonTopic: query });
        res.send(lesson);
    },
    addLesson: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Lessons');

        const query = {
            lessonId: req.body.quizId,
            lessonTopic: req.body.quizTopic,
            L1questionIds: req.body.L1questionIds,
            L2questionIds: req.body.L2questionIds,
            L3questionIds: req.body.L3questionIds,
            L4questionIds: req.body.L4questionIds,
            L5questionIds: req.body.L5questionIds,
            L6questionIds: req.body.L6questionIds,
            L7questionIds: req.body.L7questionIds,
            L8questionIds: req.body.L8questionIds,
            L9questionIds: req.body.L9questionIds,
            L10questionIds: req.body.L10questionIds,
        };

        const lesson = await collection.insertOne(query);
        res.send(query + "Created")
        
    },
    updateLesson: async (req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Lessons');

        const query = {
            lessonId: req.body.quizId,
            lessonTopic: req.body.quizTopic,
            L1questionIds: req.body.L1questionIds,
            L2questionIds: req.body.L2questionIds,
            L3questionIds: req.body.L3questionIds,
            L4questionIds: req.body.L4questionIds,
            L5questionIds: req.body.L5questionIds,
            L6questionIds: req.body.L6questionIds,
            L7questionIds: req.body.L7questionIds,
            L8questionIds: req.body.L8questionIds,
            L9questionIds: req.body.L9questionIds,
            L10questionIds: req.body.L10questionIds,
        };

        const lesson = await collection.updateOne(query);
        res.send(lesson + "Updated")
    },
    deleteLesson: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Lessons');

        const query = req.body.lessonId;
        const lesson = await collection.deleteOne({ lessonId: query });
        res.send(lesson);    
    }
}


module.exports = lessonController;