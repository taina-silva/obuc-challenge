const Pool = require('pg').Pool;

const db_pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'obuc',
  password: 'postgres',
  port: 5432,
});

const get_all_jobs = (queryText) => {
  return new Promise(function(resolve, reject) {
      db_pool.query(queryText, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.rows);
      }
    })
  }) 
}

const add_job = (body) => {
  const { jobTitle, salary, activities, benefits, processSteps, necessarySkills, experienceNeeded } = body;

  function getStringFromArray(array) {
    var string = 'ARRAY[';
    Array.from(array).forEach((elem) => {
      string = string + elem;
      if(Array.from(array).indexOf(elem) !== Array.from(array).length - 1) string = string + ', '
    })

    return string.trimEnd() + ']::text[]'; 
  }

  return new Promise(function(resolve, reject) {
    const sql = `SELECT obuc.add_job ($1, $2, $3, $4, $5, $6, $7)`;

    const params = [
      jobTitle, 
      parseFloat(salary),
      activities,
      benefits,
      processSteps,
      necessarySkills,
      experienceNeeded,
    ];

    db_pool.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
        console.log(error);
      } else {
        resolve(results.rows);
      }
    })
  }) 
}

module.exports = {
    get_all_users: get_all_jobs,
    add_user: add_job
}