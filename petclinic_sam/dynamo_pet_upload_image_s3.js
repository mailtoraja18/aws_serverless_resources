const AWS = require("aws-sdk");
const fileType = require('file-type');
var s3 = new AWS.S3();
const imageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
];
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

    //get the image data from upload
    const body = JSON.parse(event.body);

    const fileBuffer = new Buffer(body['image'], 'base64');
    const fileTypeInfo = fileType(fileBuffer);

    //validate image is on right type
    if (fileBuffer.length < 500000 && imageTypes.includes(fileTypeInfo.mime)) {

        // upload it to s3 with unix timestamp as a file name
        const fileName = `${Math.floor(new Date() / 1000)}.${fileTypeInfo.ext}`;

        const bucket = process.env.BUCKET;
        const params = {
            Body: fileBuffer,
            Key: id,
            Bucket: 'xdr56yhn-aws-sam-petclinic-pics', // put your bucket name here 
            ContentEncoding: 'base64',
            ContentType: fileTypeInfo.mime
        };

        s3.putObject(params, (err, data) => {
            if (err) callback(new Error([err.statusCode], [err.message]));

            callback(null, {
                statusCode: '200',
                headers: {'Access-Control-Allow-Origin': '*'},
                body: JSON.stringify({'data': data})
            });
        });


    } else {
        callback(null, {
            statusCode: '402',
            headers: {'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({"message": "Not a valid file type or file too big."})
        });
    }
};