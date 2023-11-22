const {MongoClient, ServerApiVersion } = require('mongodb');


const uri = 'mongodb+srv://mguest:LingoLounge123@lingolounge.ahioda5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});


let questionsController = {
    getQuestion: async (req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Questions');

        const query = req.body.questionId;
        const question = await collection.findOne({ questionId: query });
        res.send(question);
    },
    addQuestion: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Questions');

        const query = {
            questionId: req.body.questionId,
            quiz: req.body.quiz,
            lesson: req.body.lesson,
            language: req.body.language,
            difficulty: req.body.difficulty,
            question: req.body.question,
            correctAnswer: req.body.correctAnswer,
            wrongAnswerOne: req.body.wrongAnswerOne,
            wrongAnswerTwo: req.body.wrongAnswerTwo,
            wrongAnswerThree: req.body.wrongAnswerThree,
        };
        const question = await collection.insertOne(query);
        res.send(query + "Created")
        
    },
    updateQuestion: async (req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Questions');

        const query = {
            questionId: req.body.questionId,
            quiz: req.body.quiz,
            lesson: req.body.lesson,
            language: req.body.language,
            difficulty: req.body.difficulty,
            question: req.body.question,
            correctAnswer: req.body.correctAnswer,
            wrongAnswerOne: req.body.wrongAnswerOne,
            wrongAnswerTwo: req.body.wrongAnswerTwo,
            wrongAnswerThree: req.body.wrongAnswerThree,
        };

        const question = await collection.updateOne(query);
        res.send(query + "Updated")
    },
    deleteQuestion: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('Questions');

        const query = req.body.questionId;
        const question = await collection.deleteOne({ questionId: query });
        res.send(question);    }
}


module.exports = questionsController;