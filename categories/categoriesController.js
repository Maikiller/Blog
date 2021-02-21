const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.post("/categories/save", (req, res) => {
  // var title = req.body.title;
  if (req.body.title != undefined) {
    Category.create({
      title: req.body.title,
      slug: slugify(req.body.title),
    }).then(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});
router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.get("/admin/categories", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", { categories: categories });
  });
});

router.post("/categories/delete", (req, res) => {
  if (req.body.id != undefined) {
    Category.destroy({
      where: {
        id: req.body.id,
      },
    }).then(() => {
      res.redirect("/admin/categories");
    });

    if (!isNaN(req.body.id)) {
      //verificar se o numero é numérico
    } else {
      res.redirect("/admin/categories");
    }
  } else {
    //for nulo ira redirencionar
    res.redirect("/admin/categories");
  }
});

router.get("/admin/categories/edit/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.redirect("/admin/categories");
  }
  Category.findByPk(req.params.id)
    .then((category) => {
      if (category != undefined) {
        res.render("admin/categories/edit", { category: category });
      } else {
        res.redirect("/admin/categories");
      }
    })
    .catch((erro) => {
      res.redirect("/admin/categories");
    });
});

router.post("/categories/update", (req, res) => {
  Category.update(
    { title: req.body.title, slug: slugify(req.body.title) },
    {
      where: { id: req.body.id },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});

module.exports = router;
