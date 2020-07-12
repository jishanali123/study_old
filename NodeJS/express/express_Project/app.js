/*
var express = require('express'),
    app = express(),
    projectRouter = require('./Routes/projectRoutes');

    app.use(function (req, res, next) {
        // added header to allow api to be accessed from anywhere
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.header("Access-Control-Allow-Credentials", true);
        if (req.method === 'OPTIONS') {
          res.sendStatus(204);
        } else {
          next();
        }
      });

    app.get('/',function(request,response){
        response.send("Base Url");
    });
    

    app.use('/projects',projectRouter);

    app.listen(4000);*/

/*    

var express = require('express');
const app = express();

var bodyParser = require('body-parser'); 
var jsonParser = bodyParser.json();

app.post ('/input' ,jsonParser , (req,res)=>{
  console.log(req.body);
})

app.get ('/' ,(req,res)=>{
  res.send("hey");
})

app.listen(4000);

*/


/*
let welcome = (param1,...param) => {
  //console.log(param1,param);
  if(param.length >0)
  {

    param.forEach(element => {
      param1 = param1 + element;
    });
    return param1;
  }
  else{
    return (param2)=>{
    let f=param1 +param2;
    return f;
  }
  }
  
}

console.log(welcome(12)(10));
console.log(welcome(1,2,3));
//welcome(1)(2)

*/

var arr = ["{","[","","(",")","}"];
var open = [];
var close=[];

arr.forEach((elem)=>{
  if(elem=="[" || elem=="{" || elem=="(")
  open.push(elem);
  if(elem=="]" || elem=="}" || elem==")")
  close.push(elem);
});

if(open.length !== close.length)
return false




console.log(open , close);



