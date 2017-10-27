var mongo = require("mongodb").MongoClient;
var dbname = "bbs_db"
var dburl = "mongodb://localhost:27017/" + dbname //몽고 DB 주소
var table = "bbs"

mongo.connect(dburl, function(error, db){



  // single insert
  db.collection(table).insert(bbs,function(error,inserted){
    if(error){
      callback(400);
    }else{
      callback(200);
    }
  })
  var title_candidate = ["하하하", "호호호", "히히히", "후후후", "헤헤헤", "허허허", "효효효", "휴휴휴", "해해해", "햐햐햐"]
  var id_candidate = ["jis1218", "amadeus", "mozart", "beethoven", "paul", "beatles", "john", "George", "Ringo", "Kim"]
  var generateRandom = function (min, max) {
   var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
      return ranNum;
   }


for(int j=0; j<100; j++){
  for(int i=0; i<1000; i++){
    var bbs = {
      title = title_candidate[generateRandom(0,9)],
      content = "내용",
      user_id = id_candidate[generateRandom(0,9)];
      date = new Date()+""
    }
    array[i] = bbs;
  }

  // multiple insert
  db.collection(table).insertMany(array,function(error,inserted){
    if(error){
      callback(400);
    }else{
      callback(200);
    }
  })
}

exports.read = function(search, callback){
  mongo.connect(dburl, function(error,db){
    var query = {}; //query 변수 생성
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

})
