var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Pet";

var params = {
    TableName:table,
    Item:{
		  "id": 0,
		  "category": "dog",
		  "info" : { "name": "doggie duna",
					 "photoUrls": [
					    "todo"
					  ],
					  "tags": [
					    {
					      "id": 0,
					      "name": "tag1"
					    }
					  ]
		     },
		    "status": "available"   
		} 
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});


