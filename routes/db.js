var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

/* GET db data. */
router.get('/', async (req, res) => {
    try {
	const client = await pool.connect()
	const result = await client.query('SELECT * FROM contactos');
	const results = { 'results': (result) ? result.rows : null};
	const viewData = {...results, name: "Pedro"};
	console.log("view data", viewData);
	res.render('db', viewData);
	client.release();
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    }
});

module.exports = router;
