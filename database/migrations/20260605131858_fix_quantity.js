exports.up = function (knex) {
  return knex.raw(`
    ALTER TABLE resource_allocations
      ADD COLUMN quantity_value DECIMAL(10,2) DEFAULT NULL AFTER quantity,
      ADD COLUMN quantity_unit  VARCHAR(50)   DEFAULT NULL AFTER quantity_value;
  `)
  .then(() => knex.raw(`
    UPDATE resource_allocations
    SET
      quantity_value = CASE
        WHEN quantity REGEXP '^[0-9]+(\\\\.[0-9]+)?'
        THEN CAST(REGEXP_SUBSTR(quantity, '^[0-9]+(\\\\.[0-9]+)?') AS DECIMAL(10,2))
        ELSE NULL
      END,
      quantity_unit = CASE
        WHEN quantity REGEXP '^[0-9]+(\\\\.[0-9]+)?\\\\s*\\\\S+'
        THEN TRIM(REGEXP_REPLACE(quantity, '^[0-9]+(\\\\.[0-9]+)?\\\\s*', ''))
        ELSE NULL
      END
    WHERE quantity IS NOT NULL;
  `))
  .then(() => knex.raw(`
    ALTER TABLE resource_allocations DROP COLUMN quantity;
  `));
};

exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE resource_allocations
      ADD COLUMN quantity VARCHAR(100) DEFAULT NULL;
  `)
  .then(() => knex.raw(`
    UPDATE resource_allocations
    SET quantity = CONCAT(IFNULL(quantity_value, ''), ' ', IFNULL(quantity_unit, ''))
    WHERE quantity_value IS NOT NULL OR quantity_unit IS NOT NULL;
  `))
  .then(() => knex.raw(`
    ALTER TABLE resource_allocations
      DROP COLUMN quantity_value,
      DROP COLUMN quantity_unit;
  `));
};