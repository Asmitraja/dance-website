const express =require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');}

  const port = 800;
//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    concern: String
  });


  var Contact = mongoose.model('Contact', contactSchema);

//Express specific stuff
app.use(`/static`,express.static('static'))
app.use(express.urlencoded())
  
//Pug stuff
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))


app.get('/',(req,res)=>{
    const raja = { 'title' : 'rj dance academy'}
    res.status(200).render('home.pug' , raja)
})
app.get('/contact',(req,res)=>{
    const raja = { 'title' : 'rj dance academy'}
    res.status(200).render('contact.pug' , raja)
}) 
app.get('/about',(req,res)=>{
    const raja = { 'title' : 'rj dance academy'}
    res.status(200).render('about.pug' , raja)
})
app.get('/classInfo',(req,res)=>{
    const raja = { 'title' : 'rj dance academy'}
    res.status(200).render('classinfo.pug' , raja)})

app.get('/services',(req,res)=>{
    const raja = { 'title' : 'rj dance academy'}
    res.status(200).render('services.pug' , raja)
})

app.post('/contact',(req,res)=>{
    // console.log(req.body)
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your Form has been submitted Succesfully")
    }).catch(()=>{
        res.status(400).send("Your Form is not saved")
    })
    // const raja = { 'title' : 'rj dance academy'}
    // res.status(200).render( 'home.pug' , raja)
})


app.listen(port,()=>{
    console.log(`The application started succesfully on port ${port}`);
});

