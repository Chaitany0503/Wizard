const mysql = require('mysql2');


db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Mysql@0503',
    database:'wizard'


    // Production database
//     host:'localhost',
//     port:3306,
//    user:'wizard',
//     password:'SemmSZtby66KXMAe',
//     database:'wizard'
    
});

module.exports=db;
