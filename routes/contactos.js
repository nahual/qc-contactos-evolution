var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.get('/', async (req, res) => {
    try {
	const client = await pool.connect()
	const result = await client.query('SELECT * FROM contactos');
	const results = { 'results': (result) ? result.rows : null};
	res.json(results.results);
	client.release();
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    }
});

router.delete('/', async (req, res) => {
    try {
	const client = await pool.connect()
	const result = await client.query('delete from contactos');
	const results = { 'results': (result) ? result.rows : null};
	res.json(results.results);
	client.release();
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
	console.log("contact id", req.params.id);
	const client = await pool.connect()
	const result = await client.query('SELECT * FROM contactos where id = ' + req.params.id);
	const results = { 'results': (result) ? result.rows : null};
	res.json(results.results[0]);
	client.release();
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    }
});

module.exports = router;
