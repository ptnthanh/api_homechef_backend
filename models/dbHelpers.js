const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  addRecipe,
  findCategoryRecipes,
  findRecipeById,
  removeRecipe,
  addUser,
  findAllUsers,
  findUserByUsername,
  findUserByEmail
};

async function addUser(user) {
  return await db("users").insert(user, ["id", "username", "email", "created_at", "updated_at"]);
}

function findAllUsers() {
  return db("users");
}

function findUserByUsername(username) {
  return db("users").where({ username }).first();
}

function findUserByEmail(email) {
  return db("users").where({ email }).first();
}

async function add(category) {
  return await db("categories").insert(category, ["id", "name"]);
}

function find() {
  return db("categories");
}

function findById(id) {
  return db("categories").where({ id }).first();
}

function remove(id) {
  return db("categories").where({ id }).del();
}

function update(id, changes) {
  return db("categories")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findRecipeById(id) {
  return db("recipes").where({ id }).first();
}

async function addRecipe(recipe, category_id) {
  return await db("recipes").where({ category_id }).insert(recipe, ["id"]);
  // const [id] = await db("messages").where({ lesson_id }).insert(message);
  // return findMessageById(id);
}

function findCategoryRecipes(category) {
  return db("categories as c")
    .join("recipes as r", "c.id", "r.category")
    .select(
      "c.id as CategoryID",
      "c.name as CategoryName",
      "r.id as ID",
      "r.recipe_id as RecipeID",
      "r.recipe_name as RecipeName"
    )
    .where({ category });
}

function removeRecipe(id) {
  return db("recipes").where({ id }).del();
}