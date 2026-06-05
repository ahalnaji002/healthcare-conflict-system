exports.up = function (knex) {
  return knex.raw(`
    ALTER TABLE assistance_requests
    MODIFY COLUMN admin_id INT UNSIGNED DEFAULT NULL;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE assistance_requests
    MODIFY COLUMN admin_id INT UNSIGNED NOT NULL;
  `);
};
