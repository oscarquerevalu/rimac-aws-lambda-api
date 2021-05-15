var AWS = require("aws-sdk");

let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAVPZQLX636LZRVO6W", "secretAccessKey": "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"
};

AWS.config.update(awsConfig);
module.exports.docClient = new AWS.DynamoDB.DocumentClient();

