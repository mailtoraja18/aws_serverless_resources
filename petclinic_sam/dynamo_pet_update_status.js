var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event , context , callback) => {
    if(process.env.AWS_SAM_LOCAL) {
        console.log("aws config update sam local !!");
        AWS.config.update({
          region: "us-east-1",
          endpoint: "http://192.168.1.10:8000"
        });     
    } 
    docClient = new AWS.DynamoDB.DocumentClient();
    var record = {};
    if (event.body !== null && event.body !== undefined) {
        body = JSON.parse(event.body)
        if (body) 
            record = body;
            callLambda_update_status(record,callback);
    }
    
};

callLambda_update_status = function(record,callback) {
    var params = {
        TableName:"Pet",
        Key:{
            "id": record.id
        },
        UpdateExpression: "set #status = :status",
        ExpressionAttributeValues:{
            ":status" : record.status
        },
        ExpressionAttributeNames : {
             '#status': "status",
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
             response = {
                        "statusCode": 500,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify(err),
                        "isBase64Encoded": false
            };
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            callback(response);
        } else {
             response = {
                        "statusCode": 200,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify(data, null, 2),
                        "isBase64Encoded": false
            };
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            callback(null,response);
        }
    });

}