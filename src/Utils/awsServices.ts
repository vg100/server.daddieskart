const AWS = require('aws-sdk');
const fs = require('fs');

class awsService {
  s3: any;
  bucketName: any;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: "ab7786ad6",
      secretAccessKey: "ab7786ad6"
    });
    this.bucketName = "bucketName";
  }

  async checkConnection(callback) {
    try {
      const params = { Bucket: this.bucketName };
      await this.s3.listObjectsV2(params).promise();
      callback(null, true); // Connection is successful
    } catch (error) {
      console.error("Error connecting to S3:", error);
      callback(error, false); // Connection failed
    }
  }

  uploadFile(filePath, key, callback) {
    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: fileStream,
      ACL: 'public-read'
    };

    this.s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error("Error uploading file to S3:", err);
        callback(err, null);
      } else {
        console.log("File uploaded successfully. Location:", data.Location);
        callback(null, data.Location);
      }
    });
  }

  deleteFile(key, callback) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: key
    };

    this.s3.deleteObject(deleteParams, (err, data) => {
      if (err) {
        console.error("Error deleting file from S3:", err);
        callback(err);
      } else {
        console.log("File deleted successfully from S3.");
        callback(null);
      }
    });
  }
}

export default new awsService()
