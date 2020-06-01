
exports.up = function(knex) {
    return knex.schema
    .createTable("categories", (tbl) => {
      tbl.increments(); // 'id' field
      tbl.text("name", 128).notNullable();
    //   tbl.timestamps(true, true);
    })
    .createTable("recipes", (tbl) => {
    tbl.increments(); // id field
    tbl.integer("recipe_id").notNullable().index();
    tbl.text("recipe_name", 256).notNullable();

    // Foreign key info to 'categories' table
    tbl
        .integer("category")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("recipes")
        .dropTableIfExists("categories");
};
