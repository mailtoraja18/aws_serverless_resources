var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

// for server
exports.handler = (event , context , callback) => {
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.status !== undefined && 
            event.pathParameters.status !== null && 
            event.pathParameters.status !== "") {
            console.log("Received status: " + event.pathParameters.status);
            status = event.pathParameters.status;
            if(status !== null && status !== undefined && status != "")
                callLambda_find_by_status(status,callback);
        }
    }   
};

//can be called from local
exports.samLocalHandler = (event , context , callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://192.168.1.10:8000"
    }); 
    
    docClient = new AWS.DynamoDB.DocumentClient();
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.status !== undefined && 
            event.pathParameters.status !== null && 
            event.pathParameters.status !== "") {
            console.log("Received status: " + event.pathParameters.status);
            status = event.pathParameters.status;
            if(status !== null && status !== undefined && status != "")
                callLambda_find_by_status(status,callback);
        }
    }   
};


callLambda_find_by_status = function (status, callback) {
	console.log("Querying for pet with status " + status);
	var params = {
	    TableName : "Pet",
	    IndexName : "status_index_global",
	    KeyConditionExpression: "#status_key = :status_val",
	    ExpressionAttributeNames:{
	        "#status_key": "status"
	    },
	    ExpressionAttributeValues: {
	        ":status_val":status
	    }
	};    
	docClient.query(params, function(err, data) {
        var response = {"isBase64Encoded": false };
	    if (err) {
	        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            response.statusCode= "500";
	        callback(response);
	    } else {
	        console.log("Query succeeded.");
            response.statusCode= "200";
            response.body = JSON.stringify(data);
	        callback(null,response);
	    }
	});
}