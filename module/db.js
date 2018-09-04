class Db{
	constructor(){
		console.log('实例化触发构造函数');
		this.connect()
	}
	static getInstance(){
		if(!Db.instance){
			Db.instance = new Db()
		}
		return Db.instance
	}
	connect(){
		var MongoClient = require('mongodb').MongoClient
		var url = "mongodb://localhost:27017"
		MongoClient.connect(url,function (error,client) {
			if(error){
				console.log(error);
				return
			}
			var db = client.db('koa')
			// return db
			db.collection('numbers').insertOne({"redBall": '1,2,3,4,5,6',"buleBall":'16',"time":165464513152},function (err,result) {
				if(!err){
					console.log('增加数据成功');
					client.close()
				}
			})
		})
		console.log('链接数据库');
	}
	find(){
		console.log('查询数据库');
	}
}
var dbConnet = Db.getInstance()
dbConnet.find()