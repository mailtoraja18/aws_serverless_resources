var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

// for server
exports.handler = (event , context , callback) => {
    var id =1;
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.petId !== undefined && 
            event.pathParameters.petId !== null && 
            event.pathParameters.petId !== "") {
            console.log("Received petId: " + event.pathParameters.petId);
            id = parseInt(event.pathParameters.petId);
        }
    }
    callLambda_update_status(id,category,info,callback);
};

//can be called from local
exports.localHandler = (id,category,status,callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    }); 
    docClient = new AWS.DynamoDB.DocumentClient();
    callLambda_update_status(id,category,status,callback)
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
            callLambda_update_status(record,callback);
    }
    
};

callLambda_update_status = function(record,callback) {
    var params = {
        TableName:"Pet",
        Key:{
            "id": record.id,
            "category" : record.category
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