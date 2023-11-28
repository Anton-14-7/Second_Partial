require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser=require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const user=process.env.USER_ID;
const pass=process.env.USER_PASS;
const mongoUrl = `mongodb+srv://${user}:${pass}@cluster0.o4hk4rz.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  code: String,
  name: String,
  country: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

let teamsRaw = [
  {code: "mercedes", name: "Mercedes", country: "GER"},
  {code: "aston_martin", name: "Aston Martin", country: "ENG"},
  {code: "alpine", name: "Alpine", country: "FRA"},
];

let teams=[]; //cash (avoid overloading calls to the DB)
let drivers=[];

app.use("/", async (req,res,next) =>{ //async concept means that youre going to call sm but you dont know when that thing is going to return (sending a letter)
  if(teams.length == 0){
    var team = await Team.find({}).exec(); //await is gonna tell my code Ill have to wait until the exec finishes (ADD ASYNC TO THE CALLBACK FUNC)
    if(!Array.isArray(team) || team.length == 0){
      await Team.insertMany(teamsRaw).then( () =>{
        console.log("Data loaded");

      })
      .catch((error) =>{
        console.log(error);

      });
    await Team.find({})
      .then((docs) =>{
        console.log("Teams loaded");
        teams=docs;
      })
      .catch((error)=>{
        console.error(err);
      }); 

    } else {
      teams = team;
    }
  }
  next();
});

app.post("/driver", async (req,res)=>{
  var team= await Team.findOne({code: {$eq: req.body.team}}).exec();
  var number=req.body.num;
  var code=req.body.code;
  var name=req.body.name;
  var lname=req.body.lname;
  var dob=req.body.dob;
  var url=req.body.url;
  var nation=req.body.nation;
  

  var driverRaw = new Driver({num: number, code:code, forename:name, surname:lname, dob:dob, nationality:nation, url:url, team:team});
  driverRaw.save();
  drivers.push(driverRaw);
  res.redirect("/");
})



app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/public/html/index.html");
  res.render("index", {countries, teams, drivers});
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});