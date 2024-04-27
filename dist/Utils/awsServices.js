"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require('aws-sdk');
const fs = require('fs');
class awsService {
    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: "AKIA2VS75GKWZ5PM5P7R",
            secretAccessKey: "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",
            region: 'ap-south-1',
        });
        this.bucketName = "product.daddieskart";
    }
    checkConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { Bucket: this.bucketName };
                yield this.s3.listObjectsV2(params).promise();
                console.log('successfully to connected to S3');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    upload(file, callback) {
        const params = {
            Bucket: this.bucketName,
            Key: file.originalname,
            Body: file.buffer,
        };
        this.s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file to S3:', err);
                callback(err, null);
            }
            callback(null, data.Location);
        });
    }
    uploadFile(filePath, key, callback) {
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
                }
                else {
                    console.log("File uploaded successfully. Location:", data.Location);
                    callback(null, data.Location);
                }
            });
        }
        catch (error) {
            console.log(error);
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
            }
            else {
                console.log("File deleted successfully from S3.");
                callback(null);
            }
        });
    }
}
exports.default = new awsService();
