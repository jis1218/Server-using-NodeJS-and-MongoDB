//db CRUD
var mongo = require("mongodb").MongoClient;
var dbname = "bbs_db"
var dburl = "mongodb://localhost:27017/" + dbname
var table = "bbs"

/*
  bbs = {
      no : 12
      title : "제목"
      content : "내용"
      date : "20171026"
      user_id : "jis1218"
    }

  search = {
        no : //"all"일 경우 전체 검색,
        title : "하하"
        content : "빠밤"
        date : "20171021"
        user_id : "사용자 아이디로 검색"
}
*/

exports.create = function(bbs, callback){
  mongo.connect(dburl, function(error,db){
    db.collection(table).insert(bbs);
      if(error){
        callback(error);
      }else{
        callback("ok"); //home.js의 answer 함수 호출됨
      }
      db.close();
  })

}

exports.read = function(search, callback){
  mongo.connect(dburl, function(error,db){


    var cursor = db.collection(table).find(query)
    cursor.toArray(function(error, documents){
      if(error){

      }else{
        // 다큐먼트 처리
        callback(documents)
      }
      db.close();
    })

  })
}

exports.readOne = function(search, callback){
  mongo.connect(dburl, function(error,db){
    db.collection(table).find(search)
    var query = {};
    if(search.type = "all"){
      query = {};
    }else if(search.type === "no"){
      query = {no : search.no};
    }

    var cursor = db.collection(table).find(query)
    cursor.toArray(function(error, documents){
      if(error){

      }else{
        // 다큐먼트 처리
        callback(documents)
      }
    })

  })
}

exports.update = function(bbs){
  mongo.connect(dburl, function(error,db){
    // 1 수정대상쿼리
    var query = {no:137};
    query._id = bbs._id;

    // 2. 데이터수정명령
    var operator = bbs
    delete operator._id;
    // 3. 수정 옵션
    var option = {upsert:true} //없으면 insert, 있으면 update

    db.collection(table).update(query, operator, option, function(err, upserted){
      if(error){

      }else{

      }
    })

  })
}

exports.delete = function(bbs){
  mongo.connect(dburl, function(error,db){
    var query = {no:137}
    query.no = bbs.no;

    db.collection(tabㅠe).remove(query, function(err, removed){
      if(error){

      }else{

      }
    })

  })
}
