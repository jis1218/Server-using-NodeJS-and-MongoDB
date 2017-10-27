##### server.js 에서 서버에 연결되면 route.process 함수를 불러온다.
##### route 객체는 a_route.js 파일이다.
```
var http = require("http")
var route = require("./a_route");

var server = http.createServer(function(request, response){
  route.process(request, response);
})

server.listen(8090, function(){
  console.log("server is running...")
})
```
##### route.process 함수는 아래와 같이 정의되어 있다.
```
var u = require("url");
var qs = require("querystring");
var bbs = require("../b_controller/bbs");

exports.process = function(request, response){
	var url = u.parse(request.url);
	var method = request.method.toLowerCase();
	var cmds = url.pathname.split("/");
	if(cmds[1] == "bbs"){
		if(method == "get"){
      // /bbs? type=all&~~~
      // var query ={
          type : "no",
          no : 12
      }
			var query = qs.parse(url.query);
			bbs.read(request, response, query);
		}else{
			// get 이외의 method는 body 데이터를 가져온다

```
##### Android에서 다음과 같이 요청할 경우 request안에 method 함수에서 get을 받아들인다.
```java
URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
```

##### "GET" method를 통해서는 url을 받아올 수 있다
##### 일단 request 안에는 우리가 요청을 할 때 보내는 정보들이 무수히 많이 들어있는데 그 중에 url만 뽑아올 수 있다.
```
var u = require("url");
```
##### 먼저 url 객체를 받아오고
```
var url = u.parse(request.url);
```
##### request 안에 url만 parsing 하여 url이라는 변수에 담아둔다.

##### split 후 첫번째 배열을 불러오게 되면 주소:포트 후에 문자열을 받아 올 수 있고
##### 그것이 bbs와 같을 때, 그리고 안드로이드에서 "GET" 방식으로 서버에 요청을 한 경우 그 뒤의 문자열을 query에 담아준다.
##### "http://localhost:8090/bbs?id=jis&pw=1234"로 요청을 한 경우
##### url 객체의 path는 path: '/bbs?id=jis&pw=1234', pathname은 pathname: '/bbs', query는 query: 'id=jis&pw=1234'와 같이 나온다.
##### query를 querystring 객체를 이용하여 parsing하게 되면
```
var query = qs.parse(url.query);
```
##### query에는 다음과 같은 값이 담긴다.
```
{ id: 'jis', pw: '1234' }
```
##### 이것을 bbs.read 함수에 담게 된다.
```
bbs.read(request, response, query);
```

##### bbs.read의 함수는 다음과 같이 생겼는데 search가 있는 란에 query를 담아주게 된다.
```
http://localhost:8090/bbs?type=no&_id=3

var dao = require("../c_dao/bbs")
exports.read = function(request, response, search){
	var query = {};
	if(search.type === "all"){
		query = {};
	}else if(search.type === "no"){
		query = {_id : -1};
		query._id = ObjectId(search._id);
	}

  query = {_id : 3};
	console.log(query);

	dao.read(query, function(dataset){
		console.log(dataset);
		var result = {
			code : 200,
			msg : "정상처리",ㄴ
			data : dataset //[{},{}]
		};
		response.end(JSON.stringify(result));
		//{code:200, msg:"정상처리", data : [{ }, { }, {}]}
	});
};
```

##### search는 다음과 같은 형식으로 들어오게 되는데
```
var search = {
  type : 'no',
  _id : 3
}
```
##### search.type으로 type에 들어 있는 값을 빼낼 수 있다.
##### type의 값에 따라 query 값을 다르게 넣어줄 수 있다.
```
var query = {};
if(search.type === "all"){
  query = {};
}else if(search.type === "no"){
  query = {_id : -1};
  query._id = ObjectId(search._id);
}
```
##### 이 query를 dao.read에 넣어주게 되는데 콜백 함수가 인자로 들어간다.
##### dao 클래스는 MongoDB와 연결하여 database에 있는 data를 찾아주는 역할을 한다.
##### dao.read 함수의 생김새를 보면
```
exports.read = function(search, callback){
	mongo.connect(dburl, function(error, db){
		var query = {};
		if(search.type === "all"){
			query = {};
		}else if(search.type === "no"){
			query = {no : -1};
			query.no = search.no;
		}

		var cursor = db.collection(table).find(query);

		cursor.toArray(function(error,documents){
			if(error){

			}else{
				callback(documents);
			}
			db.close();
		});
	});
}
```
##### query 변수에 search.type을 설정 한 후 query에 찾고자 하는 index를 넣어준다. MongoDB는 find()를 통해 데이터를 찾아주는데 찾은 데이터를 cursor에 담아준 후
##### cursor.toArray를 통해 cursor에 담긴 값을 documents에 담아 callback 함수로 넘긴다.
##### callback 함수는 documents 인자를 dataset으로 받게 되고 result에 담아 마지막으로 JSON처리하여 브라우져에 뿌려준다.
```
dao.read(query, function(dataset){
  console.log(dataset);
  var result = {
    code : 200,
    msg : "정상처리",ㄴ
    data : dataset //[{},{}]
  };
  response.end(JSON.stringify(result));
  //{code:200, msg:"정상처리", data : [{ }, { }, {}]}
});
```

server.js는 연결해주는 역할
route.js는 query를 넘겨주는 역할
controller는 분해해주는 역할
dao는 database에서 찾아주는 역할
