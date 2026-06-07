exports.up = function (knex) {
  return knex.raw(`
    ALTER TABLE messages
      ADD COLUMN is_read TINYINT(1) NOT NULL DEFAULT 0 AFTER attachment_url;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE messages
      DROP COLUMN is_read;
  `);
};