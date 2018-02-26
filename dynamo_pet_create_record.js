var AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4')
docClient = new AWS.DynamoDB.DocumentClient();

// for server
exports.handler = (event , context , callback) => {
    var record = {};
    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body) 
            record = body;
            callLambda_add_new_record(record,callback);
    }
};

//can be called from local
exports.localHandler = (record,callback) => {
    console.log("aws config update");    
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    });     
    docClient = new AWS.DynamoDB.DocumentClient();
    callLambda_add_new_record(record,callback)
};

callLambda_add_new_record = function(record,callback) {
	record.id = uuidv4();
	var params = {
	    TableName:"Pet",
	    Item: record
	};
	console.log("Adding a new item..." + JSON.stringify(record));
	docClient.put(params, function(err,data) {
        var response = {"isBase64Encoded": false};
	    if (err) {
            response.statusCode = "500";
            response.body = err
	        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	        callback(response);
	    } else {
	    	response.statusCode = "200";
            response.body = data;
	        console.log("Added item:", JSON.stringify(data, null, 2));
	        callback(null,response);
	    }
	});

}