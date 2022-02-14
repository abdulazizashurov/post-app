const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");

// Routers import
const posts = require("./routes/post");
const home = require("./routes/home");

// Middlewares
const app = express();
app.use(express.json());
app.use(helmet());

// Router
app.use('/posts', posts);
app.use('/', home);

// checking
if(app.get("env") === "development"){
    app.use(morgan("dev"));
    console.log("Logger ishlayapti");
}

// Connect mongo db
mongoose.connect("mongodb://localhost/postdb")
    .then(()=>{
        console.log("Mongo db ga ulandim...");
    })
    .catch((err)=>{
        console.log("Mongo db ga ulana olmadim: ", err);
    })

// Connect port listening port
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`${port} portda sizni tinglayapman....`)
})