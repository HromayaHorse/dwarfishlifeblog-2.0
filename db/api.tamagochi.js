const { response } = require('express')
const pool = require('./config')

const postPet = (req, res) =>{
    const {owner_chat_id, name, hunger, happines, age, health, is_sickness, is_alive} = req.body

    pool.query(`INSERT INTO tamagochi (owner_chat_id, name, hunger, happines, age, health, is_sickness, is_alive) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (owner_chat_id) DO NOTHING RETURNING *`, 
    [owner_chat_id, name, hunger, happines, age, health, is_sickness, is_alive],
     (error, results) => {
        if(error) {
            throw error;
        }
        if(results.rows.length > 0) {
            res.status(201).send(`Pet has been successfully created: ${JSON.stringify(results.rows[0])}`);
        } else {
            res.status(400).send(`Pet with ID ${owner_chat_id} is existing already`)
        }
     })
};

const updatePet = (req, res) => {
    const owner_chat_id = parseInt(req.params.owner_chat_id);
    const {name, hunger, happines, age, health, is_sickness, is_alive} = req.body;

    pool.query(
        `UPDATE tamagochi SET name = $2, hunger = $3, happines = $4, age = $5, health = $6, is_sickness = $7, is_alive = $8 
            WHERE owner_chat_id = $1 RETURNING *`,
            [owner_chat_id, name, hunger, happines, age, health, is_sickness, is_alive],
            (error, results) => {
                if(error) {
                    throw error;
                }
                res.status(200).send(`Pet has been modified with owner_chat_id ${owner_chat_id}
                RESULT: ${JSON.stringify(results.rows[0])}`);
            }
    )
};

const getPet = (req, res) => {
    const owner_chat_id = req.params.owner_chat_id

    pool.query('SELECT * FROM tamagochi WHERE owner_chat_id = $1', [owner_chat_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(JSON.stringify(results.rows[0]))
    })
};

module.exports = {
    postPet,
    updatePet,
    getPet
}
