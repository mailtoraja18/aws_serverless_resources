var AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4')
docClient = new AWS.DynamoDB.DocumentClient();

// for server
exports.handler = (event , context , callback) => {
    var record = {};
    if (event.body !== null && event.body !== undefined) {
        body = JSON.parse(event.body)
        if (body) 
            record = body;
            callLambda_add_new_record(record,callback);
    }
};

//for sam local call
exports.samLocalHandler = (event , context , callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://192.168.1.10:8000"
    }); 
    var record = {};
    if (event.body !== null && event.body !== undefined) {
        body = JSON.parse(event.body)
        if (body) 
            record = body;
            docClient = new AWS.DynamoDB.DocumentClient();
            callLambda_add_new_record(record,callback);
    }
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
            response.body = JSON.stringify(err, null, 2);
	        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	        callback(response);
	    } else {
	    	response.statusCode = "200";
	        console.log("Added item Successfully !!");
	        callback(null,response);
	    }
	});

}