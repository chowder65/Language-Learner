const crypto = require('crypto');

const dataEncryptionController = {
    encrypt: (req, res) => {

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

        let encryptedData = cipher.update(data, 'utf-8', 'hex');
        encryptedData += cipher.final('hex');

        return {
        iv: iv.toString('hex'),
        hashedPassword: encryptedData
    };

        res.send("encrypt");
    },
    decrypt: (req, res) => {

        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex'));

        let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');

        return decryptedData;
    },
    generateKey: (req, res) => {

        return crypto.scryptSync(password, 'salt', 32);
    },

};


module.exports = dataEncryptionController;
