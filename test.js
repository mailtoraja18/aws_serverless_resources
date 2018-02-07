var itemArray = [ 
{
  "id": 1,
  "category": "dog",
  "info" : { "name": "doggie duna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "id": 0,
			      "name": "tag1"
			    }
			  ]
    } ,
              "status": "available"  
},
{
  "id": 2,
  "category": "dog",
  "info" : { "name": "doggie juna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "id": 0,
			      "name": "tag1"
			    }
			  ]
    } ,
              "status": "available"  
},
{
  "id": 3,
  "category": "dog",
  "info" : { "name": "doggie muna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "id": 0,
			      "name": "tag1"
			    }
			  ]
    }  ,
              "status": "available" 
},
{
  "id": 4,
  "category": "cat",
  "info" : { "name": "cattie muna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "id": 0,
			      "name": "tag1"
			    }
			  ]
    }   ,
              "status": "available"
}
,
{
  "id": 5,
  "category": "cat",
  "info" : { "name": "cattie luna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "id": 0,
			      "name": "tag1"
			    }
			  ]
    },
    "status": "available"  
}
,
{
  "id": 6,
  "category": "cat",
  "info" : { "name": "cattie tuna",
			 "photoUrls": [
			    "todo"
			  ],
			  "tags": [
			    {
			      "id": 0,
			      "name": "tag1"
			    }
			  ]
    },
    "status": "available"  
}]

for (var i = itemArray.length - 1; i >= 0; i--) {
		console.log("Adding a new item..." + JSON.stringify(itemArray[i]));
}