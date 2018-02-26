var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

// for server
exports.handler = (event , context , callback) => {
    var status;
    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body)
            status = body;
            //validate status
            callLambda_find_by_id(status,callback);
    }
    callLambda_find_by_id(status,callback);
};

//can be called from local
exports.localHandler = (status,callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    }); 
    docClient = new AWS.DynamoDB.DocumentClient();
    callLambda_find_by_id(status,callback)
};


callLambda_find_by_id = function (status, callback) {
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
	    if (err) {
	        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
	        response = {
                        "statusCode": 500,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify(err),
                        "isBase64Encoded": false
            };
	        callback(null,JSON.stringify(err));
	    } else {
	        console.log("Query succeeded.");
	        response = {
                        "statusCode": 200,
                        "headers": {
                            "my_header": "my_value"
                        },
                        "body": JSON.stringify(data.Items),
                        "isBase64Encoded": false
            };
	        callback(response);
	    }
	});
}