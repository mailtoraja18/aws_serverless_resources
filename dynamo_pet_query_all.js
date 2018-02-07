var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Pet"
};

console.log("Scanning Pets table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the pets
        console.log("Scan succeeded.");
        data.Items.forEach(function(pet) {
           console.log(
            JSON.stringify(pet)
            );
       });
    }
}