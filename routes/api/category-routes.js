const router = require("express").Router();
const { Category, Product } = require("../../models");
const { restore } = require("../../models/Product");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: "Category does not exist" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status.apply(500).json(err);
  }
});

router.post("/", async (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Basketball",
    }
  */
  // create a new category
  try {
    const category = await Category.create(req.body);

    res.status(200).json(category);
  } catch (err) {
    res.status(400), json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  // Category.update(req.body, {
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((category) => {
  //   }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      res.status(404).json({ message: "No category Exists" });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;