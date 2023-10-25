const express=require("express");
const app=express();
const bodyParser=require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.use(express.json());

let posts = [];
const names=[];

app.get("/", (req, res) => {
  res.render("index");
});

app
  .route("/login")
    .get((req, res) => {
      var name=req.query.name;
      names.push(name);
      for(i=0;i<names.length;i++){
        res.render("home", {name:names[i], posts:posts})
      }
    })


    .post((req, res) => {
      var name=req.body.name;
      names.push(name);
      for(i=0;i<names.length;i++){
        res.render("home", {name:names[i], posts:posts})
      }
    });


app.post("/blogpost", (req,res) =>{
  var title=req.body.title;
  var content=req.body.content;
  posts.push({
    title,
    content
  })
  res.redirect("/login");
})

app.get("/post/:index", (req, res) => {
  const index = req.params.index;
  if (posts[index]) {
      const selectedPost = posts[index];
      res.render("post", { postIndex: index, post: selectedPost }); 
  } else {
      res.status(404).send("Post not found");
  }
});

// Ruta para editar un post específico
app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  if (posts[index]) {
      const selectedPost = posts[index];
      res.render("edit", { postIndex: index, post: selectedPost });
  } else {
      res.status(404).send("Post not found");
  }
});

// Ruta para actualizar un post después de la edición
app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  if (posts[index]) {
      const updatedPost = {
          title: req.body.title,
          content: req.body.content
      };
      posts[index] = updatedPost;
      res.redirect(`/post/${index}`);
  } else {
      res.status(404).send("Post not found");
  }
});

// Ruta para eliminar un post específico
app.post("/delete/:index", (req, res) => {
  const index = req.params.index;
  if (posts[index]) {
      posts.splice(index, 1);
      res.redirect("/login");
  } else {
      res.status(404).send("Post not found");
  }
});



app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
