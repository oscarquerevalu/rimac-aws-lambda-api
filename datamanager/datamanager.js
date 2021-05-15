var AWS = require("aws-sdk");

let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "XXXXXXXXXXXXXXX", "secretAccessKey": "YYYYYYYYYYYYYYYYYY"
};

AWS.config.update(awsConfig);
module.exports.docClient = new AWS.DynamoDB.DocumentClient();

