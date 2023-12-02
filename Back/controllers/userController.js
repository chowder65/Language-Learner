const {MongoClient, ServerApiVersion } = require('mongodb');
const dataEncryptionController = require('./dataEncryptionController');


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
        try {
            await client.connect();

            let db = client.db('LingoLounge');
            let collection = db.collection('User');
            
            const query = req.userEmail;
            const user = await collection.findOne({ userEmail: query });
            const unHashedPassword = dataEncryptionController.decrypt(user.userPassword, req.userPassword);
            const inputPassword = req.userPassword;
            console.log("unhashed: ", unHashedPassword)
            console.log("db password: ", inputPassword)
            if (unHashedPassword == inputPassword) {
                console.log("PLEASE SENd RESPONSE")
                return 200
            } else {
                return 500
            }
        } catch (e) {
            console.log("error: ", e)
        }
    },
    addUser: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('User');

        const query = {
            userEmail: req.body.userEmail,
            userPassword: dataEncryptionController.encrypt(req.body.userPassword),
            userCompletedLanguages: req.body.userCompletedLanguages,
            spanishProgress : {
                languageCompletion : 0,
                lessonAnimals : false,
                quizAnimals : false,
            },
        };
        const user = await collection.insertOne(query);
        res.send(query + "Created")
        
    },
    updateUser: async (req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('User');

        const filter = {
            userEmail: req.body.userEmail,
        };

        const update = {
            $set: {
                userCompletedLanguages: req.body.userCompletedLanguages,
                spanishProgress : {
                    languageCompletion : req.body.spanishLanguageCompletion,
                    lessonAnimals : req.body.lessonAnimals,
                    quizAnimals : req.body.quizAnimals,
                }
            }
        };
    
        const user = await collection.findOneAndUpdate(filter,update);
        res.send(query + "Updated")
    },
    deleteUser: async(req, res, next) => {
        await client.connect();

        let db = client.db('LingoLounge');
        let collection = db.collection('User');

        const query = req.body.userEmail;
        const user = await collection.deleteOne({ userEmail: query });
        res.send(user);    
    }
}


module.exports = userController;