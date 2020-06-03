
exports.up = function(knex) {
    return knex.schema.table("users", (tbl) => {
        tbl.string('email', 128).notNullable().defaultTo("test@test.com");
        tbl.dateTime('created_at').defaultTo(knex.fn.now());
        tbl.dateTime('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
    return knex.schema.table('users', function(tbl) {
        tbl.dropColumn('email');
        tbl.dropColumn('created_at');
        tbl.dropColumn('updated_at');
    });
};
