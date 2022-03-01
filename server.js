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
app.get('/view-item/:id',(req,res)=>{
    Item.findById(req.params.id).then(item => res.render('view-item',{item})).catch(err=>console.log(err))
})
app.delete('/delete-item/:id',(req,res)=>{
    Item.findByIdAndDelete({_id:req.params.id}).then(() => res.json({redirect:'/'})).catch(err=>console.log(err))
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
//Redirect for url
//SendFile
//Render for js file
//Send