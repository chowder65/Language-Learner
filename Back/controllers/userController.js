const {MongoClient, ServerApiVersion } = require('mongodb');


const uri = 'mongodb+srv://mguest:LingoLounge123@lingolounge.ahioda5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    }
});


let userController = {
    getUser: async (req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('User');

        const query = req.body.userEmail;
        const user = await collection.findOne({ userEmail: query });
        res.send(user);
    },
    addUser: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('User');

        const query = {
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            userCompletedLanguages: req.body.userCompletedLanguages,
            userLessonsCompleted: req.body.userLessonsCompleted,
            userLessonProgress: req.body.userLessonProgress
        };
        const user = await collection.insertOne(query);
        res.send(query + "Created")
        
    },
    updateUser: async (req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('User');

        const query = {
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            userCompletedLanguages: req.body.userCompletedLanguages,
            userLessonsCompleted: req.body.userLessonsCompleted,
            userLessonProgress: req.body.userLessonProgress
        };
        const user = await collection.updateOne(query);
        res.send(query + "Updated")
    },
    deleteUser: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('User');

        const query = req.body.userName;
        const user = await collection.deleteOne({ userName: query });
        res.send(user);    
    }
}


module.exports = userController;