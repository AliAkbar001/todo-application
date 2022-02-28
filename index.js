const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.listen(3000)

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
