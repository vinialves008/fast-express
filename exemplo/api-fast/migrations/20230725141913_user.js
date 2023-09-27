exports.up = (knex) => knex.schema.createTable('user', (table) => {
  table.string('id', 36).primary().notNullable();
  table.string('nome', 255).notNullable();
  table.string('email', 255).notNullable();

  table.string('enderecoId', 36).primary().notNullable();

  table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('user');
