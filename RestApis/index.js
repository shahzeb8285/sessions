var express = require('express');
var app = express();
const db = require('./models'); // new require for db object

 bodyParser = require('body-parser');
 app.use(bodyParser.json());

app.get('/', function(req, res){
   res.send({"name":"SHahzen"});
});

app.get('/users', function(req, res){
   return db.User.findAll()
    .then((users) => res.send(users))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});

app.get('/user/:firstName', function(req, res){

   let firstName = req.params.firstName

   return db.User.findOne({where:{firstName:firstName}})
    .then((users) => res.send(users))
    .catch((err) => {
      console.log('There was an error querying contacts', JSON.stringify(err))
      return res.send(err)
    });
});


app.post('/user', function(req, res){
   let rawData = req.body;

   if(!rawData.firstName){
      res.status(404).send("Please Enter Name");

   }else{

      return db.User.create(rawData)
      .then((contact) => res.send(contact))
      .catch((err) => {
        console.log('***There was an error creating a contact', JSON.stringify(contact))
        return res.status(400).send(err)
      })
   }





  

});


//To update the user
app.put('/user/:userId', function(req, res){
   let rawData = req.body;

   let userId =  parseInt(req.params.userId)

   console.log("rawUser",rawData)
   return db.User.findOne(userId)
   .then((user) => {
     return user.update(rawData)
       .then(() => res.send(user))
       .catch((err) => {
         console.log('***Error updating contact', JSON.stringify(err))
         res.status(400).send(err)
       })
   })




  

});





app.listen(3000);






// User MananegmentSYSTEM
// 1.user creart
//2. update kr skte hn
//3. delete kr skte hain
//4. query krk user filter kr skte hain