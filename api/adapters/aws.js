const AWS = require('aws-sdk');

/**
 * Método responsável por fazer upload de um arquivo para o AWS S3
 * @param {*} file 
 * @returns {string}
 * @throws {Error} 
 * @async
 */
const uploadFileAws = async (file, path = '') => {

    // Configura a região do bucket
    AWS.config.update({ region: process.env.AWS_DEFAULT_REGION});

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: path + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (error) {
        console.log('Error', error);
        throw new Error("Ocorreu um erro ao fazer upload do arquivo.");
    }
}

module.exports = {
    uploadFileAws
}