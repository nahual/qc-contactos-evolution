var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.get('/', async (req, res) => {
    try {
	console.log("get all contacts");
	const client = await pool.connect()
	const result = await client.query('SELECT * FROM contactos');
	const results = { 'results': (result) ? result.rows : null};
	res.json(results.results);
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    } finally {
	client.release();
    }
});

router.delete('/', async (req, res) => {
    try {
	console.log("delete all contacts");
	const client = await pool.connect()
	const result = await client.query('delete from contactos');
	const results = { 'results': (result) ? result.rows : null};
	res.json(results.results);
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    } finally {
	client.release();
    }
});

router.post('/', async (req, res) => {
    try {
	const client = await pool.connect()
	let values = req.body.map(contact => {	    
	    return `('${contact.nombre}', '${contact.email}')`;
	}).join(", ");
	const query = `insert into contactos (nombre, email) values ${values};`
	console.log("add contacts:", req.body, "SQL query:", query);

	const result = await client.query(query);	    
	const results = { 'results': (result) ? result.rows : null};
	res.json(results.results);
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    } finally {
	client.release();
    }
});

router.get('/:id', async (req, res) => {
    try {
	const client = await pool.connect()
	const query = 'SELECT * FROM contactos where id = ' + req.params.id;
	console.log("get contact:", req.params.id, "SQL query:", query);

	const result = await client.query(query);
	const results = { 'results': (result) ? result.rows : null};
	res.json(results.results[0]);
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    } finally {
	client.release();
    }
});

router.delete('/:id', async (req, res) => {
    try {
	const client = await pool.connect()
	const query = 'DELETE FROM contactos WHERE id = ' + req.params.id;
	console.log("delete contact:", req.params.id, "SQL query:", query);

	const result = await client.query(query);
	const results = { 'results': (result) ? result.rows : null};
	res.json(results.results);
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    } finally {
	client.release();
    }
});

router.put('/:id', async (req, res) => {
    try {
	let name = req.body.nombre;
	let email = req.body.email;
	let id = req.params.id;
	const query = `update contactos SET (nombre, email) = ('${name}', '${email}') where id = ${id}`;
	console.log("update contact:", req.params.id, req.body, "SQL query:", query);

	const client = await pool.connect();
	const result = await client.query(query);
	const results = { 'results': (result) ? result.rows : null};
	res.json(results.results);
    } catch (err) {
	console.error(err);
	res.send("Error " + err);
    } finally {
	client.release();
    }
});

module.exports = router;
