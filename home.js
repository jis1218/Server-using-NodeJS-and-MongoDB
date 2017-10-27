var db = require("./db");

// var bbs={
// 	no : 2,
// 	title : "제목입니다",
// 	content : "내용입니다",
// 	date : "2017/10/26 11:12:33",
// 	user_id : "root"
// };

// db.create(
// 	bbs,
// 	function(answer){
// 		console.log(answer);
// 	}
// );


// var search={
// 	type : "no",               // all = 전체검색,  no = 글한개검색,  title=제목검색
// 	no : 2
// };
// db.read(
// 	search,
// 	function(dataset){
// 		for(key in dataset){
// 			console.log(dataset[key]);
// 		}
// 	}
// );

var search={
	type : "no",               // all = 전체검색,  no = 글한개검색,  title=제목검색
	no : 2
};
db.readOne(
	search,
	function(dataset){
		if(dataset.length > 0){
			// 서버에서 수정할 데이터 조회
			var bbs = dataset[0]; // javascript = json
			var json = JSON.stringify(bbs);

			// ... networking

			// ----------- 안드로이드 --------
			var modified = JSON.parse(json);
			modified.title = "수정했습니다";
			var mod_json = JSON.stringify(modified);
			// -----------------------------

			// ... networking

			// > 서버
			var completed = JSON.parse(mod_json);
			db.update(completed);
		}
	}
);
