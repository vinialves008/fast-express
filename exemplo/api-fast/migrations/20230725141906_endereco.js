exports.up = (knex) => knex.schema.createTable('endereco', (table) => {
  table.string('id', 36).primary().notNullable();
  table.string('rua', 255).notNullable();
  table.string('complemento', 255).notNullable();
  table.string('cidade', 255).notNullable();
  table.string('estado', 255).notNullable();
  table.string('pais', 255).notNullable();

  table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('endereco');
