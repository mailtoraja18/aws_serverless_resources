const AWS = require("aws-sdk");
var s3 = new AWS.S3();
exports.handler = (event, context, callback) => {

    if(process.env.AWS_SAM_LOCAL) {
        console.log("aws config update sam local !!");
        AWS.config.update({
          region: "us-east-1",
          endpoint: "http://192.168.1.10:8000"
        });     
    }
    docClient = new AWS.DynamoDB.DocumentClient();
    var id = null;
    // fetch the uuid of the pet from the url
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.petId !== undefined && 
            event.pathParameters.petId !== null && 
            event.pathParameters.petId !== "") {
            console.log("Received petId: " + event.pathParameters.petId);
            id = event.pathParameters.petId;
        }
    }  

    if(id == null && id == undefined && id == "") {
        callback(null, {
            statusCode: '400',
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({"message": "Missing petId in URL"})
        });
    }

    //TODO: check if the image is already tehre

    const params = {
        Key: id,
        Bucket: 'xdr56yhn-aws-sam-petclinic-pics' // put your bucket name here 
    };

    s3.getObject(params, (err, data) => {
        if (err) callback(new Error([err.statusCode], [err.message]));

        callback(null, {
            statusCode: '200',
            "isBase64Encoded": true,
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({'data': data})
        });
    });
};