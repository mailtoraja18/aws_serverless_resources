var AWS = require("aws-sdk");

// for server
exports.handler = (event , context , callback) => {
    call_create_table(callback);
};

//can be called from local mocha test
exports.localHandler = (callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://localhost:8000"
    }); 
    call_create_table(callback)
};

//for sam local call
exports.samLocalHandler = (event , context , callback) => {
    console.log("aws config update");
    AWS.config.update({
      region: "us-east-1",
      endpoint: "http://docker.for.mac.localhost:8000/"
    }); 
    call_create_table(callback)
};


call_create_table = function (callback) {
    var pet_existing = {
       "TableName": "Pet"
    }
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
            var response = { "isBase64Encoded": false };
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                response.statusCode ="500";
                response.body = "Table creating failed :(";
                callback(err);
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                response.statusCode ="200";
                response.body = "Table created successfully";
                callback(null,response);
            }
        });
    });
}