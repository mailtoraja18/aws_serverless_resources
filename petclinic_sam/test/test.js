"use strict";
var dynamo_pet_query_by_id = require("../dynamo_pet_query_by_id.js"); // GET /pet/petId/id = ?
var dynamo_pet_find_by_status = require("../dynamo_pet_find_by_status.js"); // GET /pet?status= ?
var dynamo_pet_update_status = require("../dynamo_pet_update_status.js"); //POST /pet/status
var dynamo_pet_update_info = require("../dynamo_pet_update_info.js");// POST /pet/info
var dynamo_pet_create_record = require("../dynamo_pet_create_record.js"); // PUT /pet
var dynamo_pet_delete_by_id = require("../dynamo_pet_delete_by_id.js"); // DELETE petId
var dynamo_pet_query_all = require("../dynamo_pet_query_all.js"); //inventory
var dynamo_pet_create_table = require("../dynamo_pet_create_table.js"); //inventory
var assert = require('assert');

describe('Test Cases for Pet table', function(){

  var id = {};

  it('dynamo_pet_create_table', function(done){  
	  dynamo_pet_create_table.localHandler({},{},function(error,response){		
		console.log(response);
		done();
	  });
  }); 

  /* it('dynamo_pet_create_record', function(done){  
      var record = {"id":"--","category":"cat","info":{"name":"cattie luna","photoUrls":["todo"],"tags":[{"name":"tag1"}]},"status":"available"};
	  dynamo_pet_create_record.localHandler(record,function(error,response){		
		console.log(response);
		done();
	  });
  }); 

  it('dynamo_pet_query_all', function(done){        
	  dynamo_pet_query_all.localHandler(function(error,response) {	
		console.log(response);
		console.log("Total records found :" + response.body.length);
		id = response.body[0].id
		done();		
	  });
  });

  it('dynamo_pet_query_by_id', function(done){      
		dynamo_pet_query_by_id.localHandler(id, function(response){
			console.log(response);
			done();
		});      
  });

   it('dynamo_pet_update_status', function(done){      
	  dynamo_pet_update_status.localHandler(id,"cat","sold", function(response){
		console.log(response);
		done();
	  });
  }); 

    it('dynamo_pet_update_info', function(done){  
      var  info = {"name":"cattie muna","photoUrls":["url://todo"],"tags":[{"name":"fat cat"}]};
	  dynamo_pet_update_info.localHandler(id,"cat",info, function(response){
		console.log(response);
		done();
	  });
  }); 

  it('dynamo_pet_delete_by_id', function(done){        
	  dynamo_pet_delete_by_id.localHandler(id,"cat", function(error,response) {	
		console.log(response);
		done();
	  });
  });  

  it('dynamo_pet_query_all_again', function(done){        
	  dynamo_pet_query_all.localHandler(function(error,response) {	
		console.log(response);
		var id = "BLANK";
		console.log("Total records found :" + response.body.length);
		if(response.body && response.body[0].id != "undefined") {
			id = response.body[0].id;
		}
		console.log(id);
		done();		
	  });
  }); */

});