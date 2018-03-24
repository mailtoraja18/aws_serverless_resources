var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

// for server
exports.handler = (event , context , callback) => {
    var record = {};
    if (event.body !== null && event.body !== undefined) {
        body = JSON.parse(event.body)
        if (body) 
            record = body;
            callLambda_update_info(record,callback);
            
    }
    callLambda_update_info(id,category,info,callback);
};

exports.samLocalHandler = (event , context , callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://192.168.1.10:8000"
    }); 
    docClient = new AWS.DynamoDB.DocumentClient();
    var record = {};
    if (event.body !== null && event.body !== undefined) {
        body = JSON.parse(event.body)
        if (body) 
            record = body;
            callLambda_update_info(record,callback);            
    }
    
};

callLambda_update_info = function(record,callback) {
    var params = {
        TableName:"Pet",
        Key:{
            "id": record.id,
            "category" : record.category
        },
        UpdateExpression: "set #info = :info",
        ExpressionAttributeValues:{
            ":info" : record.info
        },
        ExpressionAttributeNames : {
             '#info': "info",
        },
        ReturnValues:"UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {          
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            response = {
                        "statusCode": 200,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify([]),
                        "isBase64Encoded": false
            };
            callback(response);
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            response = {
                        "statusCode": 200,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify(data, null, 2),
                        "isBase64Encoded": false
             };
             callback(null, response);
        }
    });
}