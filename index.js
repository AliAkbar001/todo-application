const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Item = require('./model');
const CONNECTION_URL = "mongodb+srv://ali:ali7676@cluster0.ozphx.mongodb.net/item-database?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL).then(()=>
    console.log('Connected'),
    app.listen(3000)
).catch(err=>console.log(err))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    //res.sendFile("./views/index.html", {root:__dirname})
    res.redirect('/get-items')
})

app.get('/get-items',(req,res)=>{
   Item.find().then(result => res.render('index',{items:result})).catch(err=>console.log(err))
})
app.get('/get-item',(req,res)=>{
    Item.find().then(result => res.send(result)).catch(err=>console.log(err))
})
app.get('/add-item',(req,res)=>{
    //res.sendFile("./views/add-item.html", {root:__dirname})
    res.render('add-item')
})
app.post('/item',(req,res)=>{
    console.log(req.body)
    const item = Item(req.body)
    item.save().then(() => res.redirect('/')).catch(err=>console.log(err))
})

app.use((req,res)=>{
   // res.sendFile("./views/error.html", {root:__dirname})
   res.render('error')
})
