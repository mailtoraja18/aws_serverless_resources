var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

// for server
exports.handler = (event , context , callback) => {
    var id = "";
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.petId !== undefined && 
            event.pathParameters.petId !== null && 
            event.pathParameters.petId !== "") {
            console.log("Received petId: " + event.pathParameters.petId);
            id = event.pathParameters.petId;
            if(id !== null && id !== undefined && id != "")
                callLambda_query_by_id(id,callback);
        }
    }    
};

//can be called from local
exports.localHandler = (id,callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    }); 
    docClient = new AWS.DynamoDB.DocumentClient();
    callLambda_query_by_id(id,callback)
};

callLambda_query_by_id = function(id,callback) {
    
    console.log("Querying for pet with id" + id);  
    var params = {
        TableName : "Pet",
        KeyConditionExpression: "#id_key = :id_val",
        ExpressionAttributeNames:{
            "#id_key": "id"
        },
        ExpressionAttributeValues: {
            ":id_val":id
        }
    };
   docClient.query(params , function(err, data) {
    var response = {};
    if (err) {        
          response = {
                    "statusCode": 500,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify(err),
                    "isBase64Encoded": false
           };
          callback(response);
    }  else {
        console.log("Query succeeded." + JSON.stringify(data));
            if(parseInt(data.Count) > 0) {
                response = {
                    "statusCode": 200,
                    "headers": {
                        "my_header": "my_value"
                    },
                    "body": JSON.stringify(data.Items),
                    "isBase64Encoded": false
                 };
            callback(null,response); //returning call using callback
            } else {
                response = {
                        "statusCode": 200,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify([]),
                        "isBase64Encoded": false
                };
                callback(null,response); //returning call using callback   
        }
    }
    });  
};