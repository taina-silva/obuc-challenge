const Pool = require('pg').Pool;
var SqlString = require('sqlstring');

const db_pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'obuc',
  password: 'postgres',
  port: 5432,
});

const get_all_jobs = () => {
  return new Promise(function(resolve, reject) {
      const queryText = `SELECT email, username, full_name, created_at FROM morpheus.users`;

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
  console.log(parseFloat(salary));
  console.log(typeof parseFloat(salary));

  getStringFromArray(array) {
    const string = 'ARRAY[';
    Array.from(array).forEach((elem) => {
      string = string + `'${elem}'`;
    })

    return string;
  }

  return new Promise(function(resolve, reject) {
    const sql = `SELECT obuc.add_job (
                    ${SqlString.escape(jobTitle)},
                    ${parseFloat(salary)},
                    ${SqlString.escape('ARRAY' + activities + '::text[]')},
                    ${SqlString.escape('ARRAY' + benefits + '::text[]')},
                    ${SqlString.escape('ARRAY' + processSteps + '::text[]')},
                    ${SqlString.escape('ARRAY' + necessarySkills + '::text[]')},
                    ${SqlString.escape('ARRAY' + experienceNeeded + '::text[]')}
                  )`

    db_pool.query(sql, (error, results) => {
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