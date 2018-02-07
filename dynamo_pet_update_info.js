var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Pet";
var id = 0;
var info = { "name": "doggie duna dunn",
                     "photoUrls": [
                        "todo"
                      ],
                      "tags": [
                        {
                          "id": 0,
                          "name": "tag1"
                        }
                      ],
                      "status": "available"
 } ;    


var params = {
    TableName:table,
    Key:{
        "id": id,
        "category" : "dog"
    },
    UpdateExpression: "set info = :info",
    ExpressionAttributeValues:{
        ":info" : info
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});