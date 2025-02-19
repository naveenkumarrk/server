const express = require("express")
const mongoose = require("mongoose")
const path = require('path');
const cors = require('cors');
const app = express()

const booksRoute = require("./routes/book.route.js")
const recommendationRoutes = require('./routes/recommendation.route.js')

//middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use("/books", booksRoute,  (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  })
app.use("/recommendation", recommendationRoutes,(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'recommendations.html'));
  } )

app.get("/", function(req, res){
    res.send("This is home Page")
})


mongoose.connect('mongodb+srv://111naveenkumarrk:naveenRose1@backenddb.lbjki.mongodb.net/BooksAPI?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
    console.log("Database is connected")
    app.listen(3000, function(){
        console.log("server is running on 3000")
    })
})
.catch(() =>{
    console.log("errot occuired")
})
