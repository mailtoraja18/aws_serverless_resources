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

callLambda_delete_by_id = function(id,category,callback) {    
    var params = {
        TableName:"Pet",
        Key:{
            "id":id,
            "category": category
        }
    };

    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            callback(null,data);
        }
    });

}