const { Connection } = require('sqlifier')

const conn = new Connection();

conn.createConnection('127.0.0.1', 'root', process.env.NODE_ENV == 'development' ? '' : process.env.ROOT_PASS, require('mysql'))
conn.createDatabase('sam')

require("../models/init");
require("./admin")