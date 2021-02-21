const express = require("express");
const app = express();
const connect = require("./config/connect");
const session = require("express-session");
const cotegoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");
const Article = require("./articles/Articles");
const Category = require("./categories/Category");
const usersController = require("./user/UsersController");
const User = require("./user/user");

//view engine
app.set("view engine", "ejs");

//Session
app.use(session({
  secret: "maikiller", cookie:{maxAge: 15000}
}))
//static
app.use(express.static("public"));
//bodyParse
app.use(express.urlencoded({ extended: true }));
connect
  .authenticate()
  .then(() => {
    console.log("Conectado ao Banco Com Sucesso");
  })
  .catch((error) => {
    console.log(error);
  });
//Usar Controllers
app.use("/", cotegoriesController);
app.use("/", articlesController);
app.use("/", usersController);
app.get("/", (req, res) => {
  //HomePage
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  Article.findOne({
    where: {
      slug: req.params.slug,
    },
  })
    .then((articles) => {
      if (articles != undefined) {
        Category.findAll().then((categories) => {
          res.render("articles", {
            articles: articles,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: { slug: slug },
    include: [{ model: Article }],
  })
    .then((caregory) => {
      if (caregory != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: caregory.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/");

app.listen(80, () => {
  console.log("Server On");
});
