var AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4')


// for server
exports.handler = (event , context , callback) => {
    //remove this later
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    });
    call_load_data(callback);
};

//can be called from local mocha test
exports.localHandler = (callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    }); 
    call_load_data(callback)
};

//for sam local call
exports.samLocalHandler = (event , context , callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://docker.for.mac.localhost:8000/"
    }); 
    call_load_data(callback)
};

call_load_data = function(callback){
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
			console.log("Adding a new item..." + itemArray[i]);
			docClient.put(params, function(err, data) {
				var response = { "isBase64Encoded": false };
			    if (err) {
			    	response.statusCode = "500";
			    	response.body = "something failed !!";
			        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
			        callback(response);
			    } else {
			    	response.statusCode = "200";
			    	response.body = "loaded data successfully !";
			        console.log("Added item:", JSON.stringify(data, null, 2));
			        callback(null,response);
			    }
			});
	}

	
}