var AWS = require("aws-sdk");
var pet_existing = {
   "TableName": "Pet"
}
// this script is running outside docker
AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
});   

var dynamodb = new AWS.DynamoDB();

var params_pet_table = {
    TableName : "Pet",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},
        { AttributeName: 'category', KeyType: 'RANGE'} 
    ],
    LocalSecondaryIndexes: [ // optional (list of LocalSecondaryIndex)
        { 
            IndexName: 'status_index',
            KeySchema: [ 
                { AttributeName: "id", KeyType: "HASH"},
                { AttributeName: "status", KeyType: "RANGE" } 
            ],
            Projection: { // required
                ProjectionType: 'ALL'
            },
        }],
    GlobalSecondaryIndexes: [ // optional (list of GlobalSecondaryIndex)
        { 
            IndexName: 'status_index_global', 
            KeySchema: [
                { // Required HASH type attribute
                    AttributeName: 'status',
                    KeyType: 'HASH',
                }
            ],
            Projection: { // attributes to project into the index
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: { // throughput to provision to the index
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            },
        },
        // ... more global secondary indexes ...
    ],    
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "category", AttributeType: "S" },
        { AttributeName: "status", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};
// delete if existing
dynamodb.deleteTable(pet_existing , function(err,data) {
    dynamodb.createTable(params_pet_table, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
});