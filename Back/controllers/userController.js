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
    getUsers: async (req, res, next) => {
        await client.connect();

        let db = client.db('lingoLounge');
        let collection = db.collection('User');

        const query = req.body.userName;
        const user = await collection.findOne({ userName: query });
        res.send(user);
    },
    addUser: async(req, res, next) => {
        await client.connect();

        let db = client.db('lingoLounge');
        let collection = db.collection('User');

        const query = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
        };
        const user = await collection.insertOne(query);
        res.send(query + "done")
        
    },
    updateUser: async (req, res, next) => {
        res.send(req.body.userName + " " + req.body.userEmail + " " + req.body.userPassword);
    },
    deleteUser: async(req, res, next) => {
        res.send(req.body.userName + " " + req.body.userEmail + " " + req.body.userPassword);
    }
}


module.exports = userController;