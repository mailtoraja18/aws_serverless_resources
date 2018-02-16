$ aws apigateway import-rest-api --body "file://apigateway_swagger.json"
$ aws apigateway get-resources --rest-api-id "jj5sum9398"

{                             
    "path": "/pet/{petId}",   
    "resourceMethods": {      
        "POST": {},           
        "DELETE": {},         
        "GET": {}             
    },                        
    "id": "wn38po",           
    "pathPart": "{petId}",    
    "parentId": "iuqkyt"      
}                             

arn:aws:lambda:us-east-1:374525349870:function:dynamo_query_pet_by_id


$ aws apigateway put-integration --rest-api-id "jj5sum9398" --resource-id "7pr6pj" --http-method GET --type AWS_PROXY --integration-http-method POST --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:374525349870:function:dynamo_query_pet_by_id/invocations --credentials "arn:aws:iam::374525349870:role/apigAwsProxyRole"

$ aws apigateway put-integration --rest-api-id "jj5sum9398" --resource-id "bu6zxw" --http-method GET --type MOCK

$ aws apigateway put-integration-response --rest-api-id "jj5sum9398" --resource-id "bu6zxw" --http-method GET --status-code 200 --selection-pattern "" --response-templates '{"application/json": "{\"json\": \"template\"}"}'

$ aws apigateway create-deployment --rest-api-id "jj5sum9398" --stage-name prod

$ aws iam create-role --role-name apigAwsProxyRole --assume-role-policy-document file://trustpolicy_apigateway.json

$ aws iam put-role-policy --role-name apigAwsProxyRole --policy-name permission-invoke-lambda-serverless --policy-document file://apigateway_permission.json

$ aws apigateway test-invoke-method --rest-api-id "jj5sum9398" --resource-id "bu6zxw" --http-method GET --path-with-query-string "" --body "{\"operation\":\"echo\",\"payload\":{\"somekey1\":\"somevalue1\",\"somekey2\":\"somevalue2\"}}"

$ aws apigateway test-invoke-method --rest-api-id "jj5sum9398" --resource-id "7pr6pj" --http-method GET --path-with-query-string "/pet/1"

$ aws lambda add-permission \
--region us-east-1 \
--function-name dynamo_query_pet_by_id \
--statement-id 5 \
--principal apigateway.amazonaws.com \
--action lambda:InvokeFunction \
--source-arn arn:aws:execute-api:region:account-id:api-id/stage/method/resource-path \
--profile adminuser

