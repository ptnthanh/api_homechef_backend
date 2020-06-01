const express = require("express");
const Categories = require("../models/dbHelpers");

const router = express.Router();

// all endpoints are for /api/categorys/
router.post("/", (req, res) => {
  Categories.add(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      res.status(500).json({ message: "Cannot add category" });
    });
});

router.get("/", (req, res) => {
  Categories.find()
    .then((categorys) => {
      res.status(200).json(categorys);
    })
    .catch((error) => {
      res.status(500).json({ message: "Unable to retrieve category" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Categories.findById(id)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Unable to perform operation" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Categories.remove(id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "Successfully deleted" });
      } else {
        res.status(404).json({ message: "Unable to locate record" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Unable to delete" });
    });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Categories.update(id, changes)
    .then((category) => {
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating record" });
    });
});

router.post("/:id/recipes", (req, res) => {
  const { id } = req.params;
  const msg = req.body;

  if (!msg.category) {
    msg["category"] = parseInt(id, 10);
  }

  Categories.findById(id)
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: "Invalid id for category" });
      }
      // Check for all required fields
      if (!msg.recipe_id || !msg.recipe_name) {
        res
          .status(400)
          .json({ message: "Must provide both RecipeID and Recipe Name values" });
      }

      Categories.addRecipe(msg, id)
        .then((message) => {
          if (message) {
            res.status(200).json(message);
          }
        })
        .catch((error) => {
          res.status(500).json({ message: "Failed to add recipe" });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error finding category" });
    });
});

router.get("/:id/recipes", (req, res) => {
  const { id } = req.params;

  Categories.findCategoryRecipes(id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error retrieving recipes" });
    });
});

module.exports = router;