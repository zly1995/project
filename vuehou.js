const express = require("express")();
const url = require("url");
const mysql = require("mysql");
const static = require("express-static");
var db = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"123456",
	database:"denglu",
	timezone:"08:00"
})
db.connect();
// 注册
express.get("/zc",(request,response)=>{
	var sj = url.parse(request.url,true).query;
	var name = sj.name;
	var sex = sj.sex;
	var birthday = sj.birthday;
	var department = sj.department;
	var status = sj.status;
	var joinDate = sj.joinDate;
	var salary = sj.salary;
	var IDCard = sj.IDCard;
	var number = sj.number;
	if(name && IDCard){
		db.query(`INSERT INTO work (name,sex,birthday,department,status,joinDate,salary,IDCard,number) values ("${name}","${sex}","${birthday}","${department}","${status}","${joinDate}","${salary}","${IDCard}","${number}")`,(erro,data)=>{
		if(erro){
			response.end("no");
			console.log(erro);
		}else{
			response.end("yes");
			console.log("注册成功");
		}
		})
	}else{
		response.end("no");
		console.log("注意");
	}
	
})
// 查询
express.get("/cx",(request,response)=>{
	db.query(`SELECT * FROM work`,(erro,data)=>{
		if(erro){
			response.end("no");
			console.log("查询失败");
		}else{
			response.end(JSON.stringify(data));
			console.log("查询成功");
		}
	})
})
// 删除
express.get("/del",(request,response)=>{
	var id = url.parse(request.url,true).query.ID;
	db.query(`DELETE FROM work WHERE ID = "${id}"`,(erro,data)=>{
		if(erro){
			response.end("no");
			console.log("删除失败");
		}else{
			response.end("yes");
			console.log("删除成功");
		}
	})
})
// 修改
express.get("/xg",(request,response)=>{
	var sj = url.parse(request.url,true).query;
	var ID = sj.ID;
	var name = sj.name;
	var sex = sj.sex;
	var birthday = sj.birthday;
	var department = sj.department;
	var status = sj.status;
	var a=0;
	if(status == "true"){
		a=1;
	}else{
		a=0;
	}
	var joinDate = sj.joinDate;
	var salary = sj.salary;
	var IDCard = sj.IDCard;
	var number = sj.number;
	var leaveDate = sj.leaveDate;
	console.log(sj)
	db.query(`UPDATE work SET name = "${name}",sex = "${sex}",birthday = "${birthday}",department = "${department}",status = "${a}",joinDate = "${joinDate}",salary = "${salary}",IDCard = "${IDCard}",number = "${number}",leaveDate = "${leaveDate}" WHERE ID = "${ID}"`,(erro,data)=>{
		if(erro){
			response.end("no");
			console.log("修改失败");
		}else{
			response.end("yes");
			console.log("修改成功");
		}
	})
})
express.use(static(__dirname));
express.listen(8080);