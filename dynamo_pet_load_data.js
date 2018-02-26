var AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4')

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "Pet";
var itemArray = [ 
{
  "id": uuidv4(),
  "category": "dog",
  "info" : { "name": "doggie duna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			   	  "name": "tag1"
			    }
			  ]
    } ,
              "status": "available"  
},
{
  "id": uuidv4(),
  "category": "dog",
  "info" : { "name": "doggie juna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "name": "tag1"
			    }
			  ]
    } ,
              "status": "available"  
},
{
  "id": uuidv4(),
  "category": "dog",
  "info" : { "name": "doggie muna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "name": "tag1"
			    }
			  ]
    }  ,
              "status": "available" 
},
{
  "id": uuidv4(),
  "category": "cat",
  "info" : { "name": "cattie muna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "name": "tag1"
			    }
			  ]
    }   ,
              "status": "available"
},
{
  "id": uuidv4(),
  "category": "cat",
  "info" : { "name": "cattie luna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "name": "tag1"
			    }
			  ]
    },
    "status": "available"  
},
{
  "id": uuidv4(),
  "category": "cat",
  "info" : { "name": "cattie tuna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "name": "tag1"
			    }
			  ]
    },
    "status": "available"  
}]

for (var i = itemArray.length - 1; i >= 0; i--) {
		var params = {
		    TableName:tableName,
		    Item : itemArray[i]	
		};
		console.log("Adding a new item...");
		docClient.put(params, function(err, data) {
		    if (err) {
		        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		    } else {
		        console.log("Added item:", JSON.stringify(data, null, 2));
		    }
		});
}