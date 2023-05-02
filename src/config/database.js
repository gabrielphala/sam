const { Connection } = require('sqlifier')

const conn = new Connection();

conn.createConnection('localhost', 'root', process.env.NODE_ENV == 'development' ? '' : process.env.ROOT_PASS, require('mysql'))
conn.createDatabase('sam')