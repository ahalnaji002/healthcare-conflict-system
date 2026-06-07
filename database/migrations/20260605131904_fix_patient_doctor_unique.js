exports.up = function (knex) {
  // Remove duplicate rows first, keep the one with the lowest id
  return knex.raw(`
    DELETE pd1
    FROM patient_doctor pd1
    INNER JOIN patient_doctor pd2
      ON  pd1.patient_id = pd2.patient_id
      AND pd1.doctor_id  = pd2.doctor_id
      AND pd1.id > pd2.id;
  `)
  .then(() => knex.raw(`
    ALTER TABLE patient_doctor
      ADD CONSTRAINT uq_patient_doctor UNIQUE (patient_id, doctor_id);
  `));
};

exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE patient_doctor
      DROP INDEX uq_patient_doctor;
  `);
};