const express= require("express");
const app=express();
const bodyParser = require("body-parser"); 

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);


app.get("/", (req,res) => {
    res.render("index", {text: "World"})
})

app.route("/result").post((req,res) => {
    var weight=req.body.weight
    var height=req.body.height
    var BMI= (weight/(height*height))*10000
    res.send("<h1> Your BMI is " + BMI + " </h1>")
})
app.listen(3000, () =>{
    console.log("Listening on port 3000")
});