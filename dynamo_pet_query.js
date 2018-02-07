var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
  //,endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var id = 1;

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

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(JSON.stringify(item));
        });
    }
});