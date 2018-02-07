var AWS = require("aws-sdk");

//local configuration
AWS.config.update({
  region: "us-east-1"
  //,endpoint: "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();
var params_pet_table = {
    TableName : "Pet",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},
        { AttributeName: 'category', KeyType: 'RANGE'}  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "N" },
        { AttributeName: "category", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(params_pet_table, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
