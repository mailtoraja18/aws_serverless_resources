var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

// for server
exports.handler = (event , context , callback) => {
    var id = 1;
    var category ="";
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.petId !== undefined && 
            event.pathParameters.petId !== null && 
            event.pathParameters.petId !== "") {
            console.log("Received petId: " + event.pathParameters.petId);
            id = event.pathParameters.petId;
            category = event.pathParameters.category;
            if(category !== null && category !== undefined && category != "" && id !== null && id !== undefined && id != "")
                callLambda_delete_by_id(id,category,callback);
        }
    }    
};

//can be called from local
exports.localHandler = (id,category,callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    }); 
    docClient = new AWS.DynamoDB.DocumentClient();
    callLambda_delete_by_id(id,category,callback)
};

//can be called from local
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
            callLambda_delete_by_id(record,callback);
            
    }
};

callLambda_delete_by_id = function(record,callback) {    
    var params = {
        TableName:"Pet",
        Key:{
            "id":record.id,
            "category": record.category
        }
    };

    console.log("Attempting a conditional delete...");
    var response = { "isBase64Encoded": false };
    docClient.delete(params, function(err, data) {
        if (err) {
            response.statusCode ="500";
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            callback(response);
        } else {
            response.statusCode ="200";
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            callback(null,response);
        }
    });

}