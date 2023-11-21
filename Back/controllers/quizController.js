const {MongoClient, ServerApiVersion } = require('mongodb');


const uri = 'mongodb+srv://mguest:LingoLounge123@lingolounge.ahioda5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});

let quizController = {
    getQuiz: async (req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Quizzes');

        const query = req.body.quizTopic;
        const quiz = await collection.findOne({ quizTopic: query });
        res.send(quiz);
    },
    addQuiz: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Quizzes');

        const query = {
            quizId: req.body.quizId,
            quizTopic: req.body.quizTopic,
            questionIds: req.body.questionIds,
        };

        const quiz = await collection.insertOne(query);
        res.send(query + "Created")
        
    },
    updateQuiz: async (req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Quizzes');

        const query = {
            quizId: req.body.quizId,
            quizTopic: req.body.quizTopic,
            questionIds: req.body.questionIds,
        };
        const quiz = await collection.updateOne(query);
        res.send(quiz + "Updated")
    },
    deleteQuiz: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Quizzes');

        const query = req.body.quizId;
        const quiz = await collection.deleteOne({ quizId: query });
        res.send(quiz);    }
}


module.exports = quizController;