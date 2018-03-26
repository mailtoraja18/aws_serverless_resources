var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

//can be called from sam local
exports.handler = (event , context , callback) => {
    if(process.env.AWS_SAM_LOCAL) {
        console.log("aws config update sam local !!");
        AWS.config.update({
          region: "us-east-1",
          endpoint: "http://192.168.1.10:8000"
        });     
    }
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
            response.body = JSON.stringify(data.Items);
            callback(null,response);
        }           
    });  
};