const express = require('express')
const app = express()
const mongoose = require('mongoose')
const CONNECTION_URL = "mongodb+srv://ali:ali7676@cluster0.ozphx.mongodb.net/item-database?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL).then(()=>
    console.log('Connected'),
    app.listen(3000)
).catch(err=>console.log(err))
app.set('view engine', 'ejs')


app.get('/',(req,res)=>{
    //res.sendFile("./views/index.html", {root:__dirname})
    const items = [
        {name: 'Mobile Phone',price: 1000 },
        {name: 'Book',price: 550 },
        {name: 'Computer',price: 5000 }
    ]
    res.render('index',{items})
})

app.get('/add-item',(req,res)=>{
    //res.sendFile("./views/add-item.html", {root:__dirname})
    res.render('add-item')
})

app.use((req,res)=>{
   // res.sendFile("./views/error.html", {root:__dirname})
   res.render('error')
})
