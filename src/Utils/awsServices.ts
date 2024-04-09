const AWS = require('aws-sdk');
const fs = require('fs');

class awsService {
  s3: any;
  bucketName: any;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: "AKIA2VS75GKWZ5PM5P7R",
      secretAccessKey: "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",
      region:'ap-south-1',
    });
    this.bucketName = "product.daddieskart";
  }

  async checkConnection() {
    try {
      const params = { Bucket: this.bucketName };
      await this.s3.listObjectsV2(params).promise();
      console.log('connected to S3')
    } catch (error) {
      throw new Error(error);
    }
  }

  uploadFile(filePath, key,callback) {
    try {
      const fileStream = fs.createReadStream(filePath);

      const uploadParams = {
        Bucket: this.bucketName,
        Key: key,
        Body: fileStream,
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
    } catch (error) {
       console.log(error)
    }

   

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
