/**
 * 数据库链接示例 单例模式优化响应速度
 */

var MongoClient = require('mongodb').MongoClient;
var Config=require('./config.js');

class Db{
	/**
	 * 单例实现数据库链接共享
	 * @returns {Db}
	 */
	static getInstance(){

		if(!Db.instance){
			Db.instance=new Db();
		}
		return  Db.instance;
	}

	constructor(){

		this.dbClient='';
		this.connect(); //实例化时链接数据库

	}

	/**
	 * 链接数据库
	 * @returns {Promise<any>}
	 */
	connect(){
		let _that=this;
		return new Promise((resolve,reject)=>{
			if(!_that.dbClient){
				MongoClient.connect(Config.dbUrl,{ useNewUrlParser: true },(err,client)=>{

					if(err){
						reject(err)
					}else{
						_that.dbClient=client.db(Config.dbName);
						resolve(_that.dbClient)
					}
				})
			}else{
				resolve(_that.dbClient);
			}
		})
	}
	/**
	 * 插入数据
	 * @param collectionName 集合名称
	 * @param json 要插入的数据 Array
	 * @returns {Promise<any>}
	 */
	insert(collectionName,json){
		return new Promise((resolve,reject)=>{
			this.connect().then((db)=>{
				db.collection(collectionName).insertOne(json,function (err,result) {
					if(err){
						reject(err);
						return;
					}
					resolve(result)
				})
			})
		})
	}

	/**
	 * 删除数据
	 * @param collectionName 集合名称
	 * @param json 条件
	 * @returns {Promise<any>}
	 */
	deleteData(collectionName,json){
		return new Promise((resolve,reject)=>{
			this.connect().then((db)=>{
				db.collection(collectionName).deleteMany(json,function (err,result) {
					if(err){
						reject(err);
						return
					}
					resolve(result)
				})
			})
		})
	}


	/**
	 * 更新数据
	 * @param collectionName 集合名称
	 * @param json1 条件
	 * @param updataJson 要更新的数据
	 * @returns {Promise<any>}
	 */
	update(collectionName,json1,updataJson){
		return new Promise((resolve,reject)=>{
			this.connect().then((db)=>{
				db.collection(collectionName).updateMany(json1,{$set:updataJson},(err,result)=>{
					if (err){
						reject(err);
						return;
					}
					resolve(result)
				})
			})
		})
	}

	/**
	 * 查询数据库
	 * @param collectionName
	 * @param json
	 * @returns {Promise<any>}
	 */
	find(collectionName,json){

		return new Promise((resolve,reject)=>{

			this.connect().then((db)=>{

				var result=db.collection(collectionName).find(json).sort({'id':1});

				result.toArray(function(err,docs){

					if(err){
						reject(err);
						return;
					}
					resolve(docs);
				})

			})
		})
	}
}
module.exports=Db.getInstance();
