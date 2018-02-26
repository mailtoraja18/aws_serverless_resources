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
            id = event.pathParameters.petId;
        }
    }
    callLambda_pet_query_all(id,callback);
};

//can be called from local
exports.localHandler = (callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    }); 
    docClient = new AWS.DynamoDB.DocumentClient();
    callLambda_pet_query_all(callback)
};

callLambda_pet_query_all = function(callback) {
    var params = {
        TableName: "Pet"
    };

    console.log("Scanning Pets table.");
    docClient.scan(params, function(err, data) {
        var response = { "isBase64Encoded": false };
        if (err) {
            response.statusCode ="500";
            response.body = JSON.stringify(err);
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
             callback(response);
        } else {
            // print all the pets
            console.log("Scan succeeded.");
            response.statusCode ="200";
            response.body = data.Items;
            callback(null,response);
        }           
    });  
};