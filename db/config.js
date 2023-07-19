const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pigeon',
  host: 'db',
  database: 'dwarfishlife',
  password: 'test007007',
  port: 5432,
})

module.exports = pool;