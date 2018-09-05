
const MongoClient = require('mongodb').MongoClient;
const Config = require('./config.js');

const assert = require('assert');

class Db{
	constructor(){
		this.dbClient = '';
		this.connect()
	}
	static getInstance(){
		if(!Db.instance){
			Db.instance = new Db()
		}
		return Db.instance
	}
	connect(){
		return new Promise((resolve,reject)=>{
			if(!this.dbClient){
				MongoClient.connect(Config.dbUrl,{ useNewUrlParser: true },(err,client)=>{
					if(err){
						reject(err)
					}else{
						this.dbClient=client.db(Config.dbName);
						resolve(this.dbClient)
					}
				})
			}else{
				resolve(this.dbClient);
			}
		})
	}
	find(collectionName,json){
		return new Promise((resolve,reject) =>{

			this.connect().then((db) =>{
				var result = db.collection(collectionName).find(json);
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
	updata(collectionName,json){
		return new Promise((resolve,reject)=>{
			this.connect().then((db)=>{
				db.collection(collectionName).update(json)
			})
		})
	}

}
var mydb = new Db()
console.time('start')
mydb.find('numbers',{}).then(function (data) {
	console.log(data);
	console.timeEnd('start')
})

var mydb = new Db()
console.time('start2')
mydb.find('numbers',{}).then(function (data) {
	console.log(data);
	console.timeEnd('start2')
})

module.exports = Db.getInstance()
var dbConnet = Db.getInstance()
dbConnet.find('numbers',{"conut":5})