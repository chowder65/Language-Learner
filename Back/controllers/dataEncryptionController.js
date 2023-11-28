const crypto = require('crypto');

const dataEncryptionController = {
    encrypt: (req) => {
        console.log(req)

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(crypto.scryptSync(req, 'salt', 32)), iv);

        let encryptedData = cipher.update(req, 'utf-8', 'hex');
        encryptedData += cipher.final('hex');

        console.log(encryptedData);

        return {
        iv: iv.toString('hex'),
        hashedPassword: encryptedData
    };

        res.send("encrypt");
    },
    decrypt: (req) => {

        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));

        let decryptedData = decipher.update(req, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');

        return decryptedData;
    },
    generateKey: (req) => {

        return crypto.scryptSync(password, 'salt', 32);
    },

};


module.exports = dataEncryptionController;
