const Pool = require('pg').Pool;
var SqlString = require('sqlstring');

const db_pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'public',
  password: 'postgres',
  port: 5432,
});

const get_all_users = () => {
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

const add_user = (body) => {
  const { email, username, password, fullName } = body;
  return new Promise(function(resolve, reject) {
    const sql = `INSERT INTO morpheus.users (email, username, password, full_name)
                  VALUES (${SqlString.escape(email)}, ${SqlString.escape(username)}, ${SqlString.escape(password)}, ${SqlString.escape(fullName)})`

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
    get_all_users,
    add_user
}