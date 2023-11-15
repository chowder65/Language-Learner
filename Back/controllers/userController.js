

let userController = {
    getUsers: async (req, res, next) => {
        res.send(req.body.userName + " " + req.body.userEmail + " " + req.body.userPassword);
    },
    addUser: async(req, res, next) => {
        res.send(req.body.userName + " " + req.body.userEmail + " " + req.body.userPassword);
    },
    updateUser: async (req, res, next) => {
        res.send(req.body.userName + " " + req.body.userEmail + " " + req.body.userPassword);
    },
    deleteUser: async(req, res, next) => {
        res.send(req.body.userName + " " + req.body.userEmail + " " + req.body.userPassword);
    }
}


module.exports = userController;