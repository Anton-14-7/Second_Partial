const express=require("express");
const app=express();
const bodyParser=require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.use(express.json());

const names=[];
const tasks=[];

app.get("/", (req,res) => {
    res.render("index", {tasks:tasks});
})

app.get("/greet", (req,res,next) => {
    var name=req.query.name;
    if (!name){
        const error = new Error("Missing name value");
        error.status=400;
        next(error);
    }else{
        names.push(name);
        for(i=0;i<names.length;i++){
        console.log(names[i]);
        //res.write("<h1> Hello " + names[i] + "!! </h1>");
        }
    
        res.render("wassa", {name: name});
    }
}, (err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).render("error", { 
        message: err.status + " " + err.message,
    });
})

app.put("/greet/:name", (req, res) => {
    const nameurl = req.params.name;
    names.push(nameurl);
});

app.get("/names", (req, res) => {
    res.json({ names: names });
  });

app.post("/task", (req,res) => {
    var task=req.body.task;
    tasks.push(task);
    for(i=0;i<tasks.length;i++){
        console.log(tasks[i]);
    }
    res.redirect("/");
})

app.get("/task", (req, res) => {
    res.json({ tasks: tasks });
});

app.post("/task/:index/delete", (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1); // Elimina la tarea en el índice dado
    }
    res.redirect("/");
});

app.post("/task/:index/up", (req, res) => {
    const index = req.params.index;
    if (index > 0 && index < tasks.length) {
        const removedTask = tasks.splice(index, 1); // Elimina la tarea en el índice dado
        tasks.splice(index - 1, 0, removedTask[0]); // Inserta la tarea en el índice anterior
    }
    res.redirect("/");
});

app.post("/task/:index/down", (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length - 1) {
        const removedTask = tasks.splice(index, 1); // Elimina la tarea en el índice dado
        tasks.splice(index + 1, 0, removedTask[0]); // Inserta la tarea en el índice siguiente
    }
    res.redirect("/");
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res
        .status(500)
        .render("error",{ 
            message: err.message ,
        });
});


app.listen(3000, () =>{
    console.log("Listening on port 3000");
});


