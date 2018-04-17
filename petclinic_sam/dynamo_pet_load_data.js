var AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4')
console.log("aws config update");

AWS.config.update({
  region: "us-east-1"
}); 

var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "Pet";
var itemArray = [
  {
    "id" : uuidv4(),
    "category": "cat",
    "info": {
      "name": "Marbles",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "status": "available",
    "zip": 19702,
    "contact": {
      "phone": "895-514-0673",
      "email": "hwimsett9@wordpress.com",
      "address": "36399 Cody Court"
    }
  },
  {
    "id" : uuidv4(),
    "category": "dog",
    "status": "Available",
    "info": {
      "name": "Mr. Nice",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "zip": 19702,
    "contact": {
      "phone": "268-672-7404",
      "email": "tbalser0@pinterest.com",
      "address": "8731 Tennyson Way"
    }
  },
  {
    "id" : uuidv4(),
    "category": "dog",
    "status": "Available",
    "info": {
      "name": "Bombasto",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "zip": 19702,
    "contact": {
      "phone": "174-648-7151",
      "email": "czealander8@freewebs.com",
      "address": "41320 Dovetail Parkway"
    }
  },
  {
    "id" : uuidv4(),
    "category": "dog",
    "status": "Available",
    "info": {
      "name": "Celeritas",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "zip": 19702,
    "contact": {
      "phone": "910-906-3806",
      "email": "phampe7@123-reg.co.uk",
      "address": "410 West Point"
    }
  },
  {
    "id" : uuidv4(),
    "category": "dog",
    "status": "Available",
    "info": {
      "name": "Magneta",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "zip": 19702,
    "contact": {
      "phone": "254-291-3186",
      "email": "dfines6@indiatimes.com",
      "address": "47 Dayton Street"
    }
  },
  {
    "id" : uuidv4(),
    "category": "cat",
    "status": "Available",
    "info": {
      "name": "RubberMan",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "zip": 19702,
    "contact": {
      "phone": "942-322-7354",
      "email": "tmebs5@eepurl.com",
      "address": "97 Monument Lane"
    }
  },
  {
    "id" : uuidv4(),
    "category": "cat",
    "status": "Available",
    "info": {
      "name": "Dynama",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "zip": 19702,
    "contact": {
      "phone": "982-887-7358",
      "email": "fzelake4@blogspot.com",
      "address": "8 Sutherland Center"
    }
  },
  {
    "id" : uuidv4(),
    "category": "cat",
    "status": "Available",
    "info": {
      "name": "Dr IQ",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "zip": 19702,
    "contact": {
      "phone": "565-604-8036",
      "email": "ajones3@woothemes.com",
      "address": "47 Killdeer Road"
    }
  },
  {
    "id" : uuidv4(),
    "category": "cat",
    "status": "Available",
    "info": {
      "name": "Magma",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "zip": 19702,
    "contact": {
      "phone": "594-282-6770",
      "email": "bwatling2@virginia.edu",
      "address": "04 American Circle"
    }
  },
  {
    "id" : uuidv4(),
    "category": "cat",
    "status": "Available",
    "info": {
      "name": "Tornado",
      "photoUrls": [
        "todo"
      ],
      "tags": [
        {
          "key": "description" ,
          "value": "Domestic Short Hair"
        },
        {
          "key": "health",
          "value": "Vaccinations up to date, spayed \/ neutered."
        },
        {
          "key": "good in home with",
          "value": "other cats"
        },
        {
          "key": "age",
          "value": "young"
        },
        {
          "key": "sex",
          "value": "female"
        }
      ]
    },
    "zip": 19702,
    "contact": {
      "phone": "268-672-7404",
      "email": "tbalser0@pinterest.com",
      "address": "8731 Tennyson Way"
    }
  }
]


for (var i = itemArray.length - 1; i >= 0; i--) {
		var params = {
		    TableName:tableName,
		    Item : itemArray[i]	
		};
		console.log("Adding a new item..." + itemArray[i]);
		docClient.put(params, function(err, data) {
			var response = { "isBase64Encoded": false };
		    if (err) {
		        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		    } else {
		        console.log("Added item:", JSON.stringify(data, null, 2));
		    }
		});
}