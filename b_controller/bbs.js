var dao = require("../c_dao/bbs")

exports.read = function(request, response, search){
	var query = {};
	if(search.type === "all"){
		query = {};
	}else if(search.type === "no"){
		query = {_id : -1};
		query._is = ObjectId(search._id);
	}

	console.log(query);

	dao.read(query, function(dataset){
		console.log(dataset);
		var result = {
			code : 200,
			msg : "정상처리",
			data : dataset
		};
		response.end(JSON.stringify(result));
	});
};

exports.create = function(request, response, bbs){
	dao.create(bbs, function(result_code){
		var result = {
			code : result_code,
			msg : "입력완료"
		};

		response.end(JSON.stringify(result));
	});
};

exports.update = function(request, response, bbs){

};

exports.delete = function(request, response, bbs){

};
