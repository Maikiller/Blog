const express = require("express");
const { default: slugify } = require("slugify");
const router = express.Router();
const Category = require("../categories/Category");
const adminAuth = require("../middlewares/adminAth");
const Article = require("./Articles");
//const slugify = require("slugify");

router.get("/admin/articles", adminAuth, (req, res) => {
  Article.findAll({ include: [{ model: Category }] }).then((articles) => {
    res.render("admin/articles/index", { articles: articles });
  });
});

router.get("/admin/articles/new", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
});
router.post("/articles/save", adminAuth, (req, res) => {
  Article.create({
    title: req.body.title,
    slug: slugify(req.body.title),
    body: req.body.body,
    categoryId: req.body.category,
  }).then(() => {
    res.redirect("/admin/articles");
  });
});

router.post("/articles/delete", adminAuth, (req, res) => {
  if (req.body.id != undefined) {
    Article.destroy({
      where: {
        id: req.body.id,
      },
    }).then(() => {
      res.redirect("/admin/articles");
    });

    if (!isNaN(req.body.id)) {
      //verificar se o numero é numérico
    } else {
      res.redirect("/admin/articles");
    }
  } else {
    //for nulo ira redirencionar
    res.redirect("/admin/articles");
  }
});

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
  Article.findByPk(req.params.id)
    .then((articles) => {
      if (articles != undefined) {
        Category.findAll().then((categories) => {
          res.render("admin/articles/edit", {
            categories: categories,
            articles: articles,
          });
        });
      } else {
        res.redirect("/admin/articles");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

router.post("/articles/update", adminAuth, (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;
  Article.update(
    { title: title, body: body, categoryId: category, slug: slugify(title) },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((err) => {
      res.redirect(err);
    });
});

router.get("/articles/page/:num", adminAuth, (req, res) => {
  var page = req.params.num;
  if ((isNaN(page) == page) == 1) {
    offset = 0;
  } else {
    offset = parseInt(page - 1) * 4;
  }

  Article.findAndCountAll({
    limit: 4,
    offset: offset,
    order: [["id", "DESC"]],
  }).then((articles) => {
    var next;

    if (offset + 4 >= articles.count) {
      next = false;
    } else {
      next = true;
    }

    var result = {
      page: parseInt(page),
      next: next,
      articles: articles,
    };

    Category.findAll().then((categories) => {
      res.render("admin/articles/page", {
        result: result,
        categories: categories,
      });
    });
  });
});
module.exports = router;
