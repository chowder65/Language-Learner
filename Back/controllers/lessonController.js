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
            lessonLanguage: req.body.lessonLanguage,
            simpleQuestions : req.body.simpleQuestionsAry,
            easyQuestions : req.body.easyQuestionsAry,
            mediumQuestions : req.body.mediumQuestionsAry,
            hardQuestions : req.body.hardQuestionsAry,
            extremeQuestions : req.body.extremeQuestionsAry,
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
            lessonLanguage: req.body.lessonLanguage,
            simpleQuestions : req.body.simpleQuestionsAry,
            easyQuestions : req.body.easyQuestionsAry,
            mediumQuestions : req.body.mediumQuestionsAry,
            hardQuestions : req.body.hardQuestionsAry,
            extremeQuestions : req.body.extremeQuestionsAry,
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