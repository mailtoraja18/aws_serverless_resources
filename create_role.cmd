# Create the role and attach the trust policy that enables EC2 to assume this role.
$ aws iam create-role --role-name lambda-execution-serverless --assume-role-policy-document file://trustpolicy.json

# Embed the permissions policy (in this example an inline policy) to the role to specify what it is allowed to do.
$ aws iam put-role-policy --role-name lambda-execution-serverless --policy-name permission-dynamodb-serverless --policy-document file://dynamodb_permission_serverless.json

$ aws iam put-role-policy --role-name lambda-execution-serverless --policy-name permission-log-serverless --policy-document file://log_permission_serverless.json

$ aws lambda create-function --function-name "dynamo_query_pet_by_id" --runtime "nodejs6.10" --role "arn:aws:iam::374525349870:role/lambda-execution-serverless" --handler "dynamo_query_pet_by_id.dynamo_query_pet_by_id" --zip-file fileb://dynamo_query_pet_by_id.zip