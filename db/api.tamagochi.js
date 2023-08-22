const { response } = require('express')
const pool = require('./config')

const postPet = (req, res) =>{
    const {owner_chat_id, name, hunger, happines, age, health, is_sickness, is_alive, is_peed, shitted} = req.body

    pool.query(`INSERT INTO tamagochi (owner_chat_id, name, hunger, happines, age, health, is_sickness, is_alive, is_peed, shitted) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (owner_chat_id) DO NOTHING RETURNING *`, 
    [owner_chat_id, name, hunger, happines, age, health, is_sickness, is_alive, is_peed, shitted],
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
    const {name, hunger, happines, age, health, is_sickness, is_alive, is_peed, shitted} = req.body;

    pool.query(
        `UPDATE tamagochi SET name = $2, hunger = $3, happines = $4, age = $5, health = $6, is_sickness = $7, is_alive = $8, is_peed = $9, shitted = $10 
            WHERE owner_chat_id = $1 RETURNING *`,
            [owner_chat_id, name, hunger, happines, age, health, is_sickness, is_alive, is_peed, shitted],
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

const feedPet = (req, res) => {
    const owner_chat_id = req.params.owner_chat_id;

    pool.query(`UPDATE tamagochi SET hunger = 180 WHERE owner_chat_id = $1 RETURNING *`, 
    [owner_chat_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Скотина покормлена: ${JSON.stringify(results.rows[0])}`)
    })
};

const cleanShit = (req, res) => {
    const owner_chat_id = req.params.owner_chat_id;

    pool.query(`UPDATE tamagochi SET shitted = false WHERE owner_chat_id = $1 RETURNING *`, 
    [owner_chat_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Говно убрано: ${JSON.stringify(results.rows[0])}`)
    })
};

const cleanPee = (req, res) => {
    const owner_chat_id = req.params.owner_chat_id;

    pool.query(`UPDATE tamagochi SET is_peed = false WHERE owner_chat_id = $1 RETURNING *`, 
    [owner_chat_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Моча убрана: ${JSON.stringify(results.rows[0])}`)
    })
};

const curePet = (req, res) => {
    const owner_chat_id = req.params.owner_chat_id;

    pool.query(`UPDATE tamagochi SET is_sickness = false WHERE owner_chat_id = $1 RETURNING *`, 
    [owner_chat_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Скотина вылечена: ${JSON.stringify(results.rows[0])}`)
    })
};

const playWithPet = (req, res) => {
    const owner_chat_id = req.params.owner_chat_id;

    pool.query(`UPDATE tamagochi SET happines = true WHERE owner_chat_id = $1 RETURNING *`, 
    [owner_chat_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Со скотиной поиграли. Скотина довольна:
         ${JSON.stringify(results.rows[0])}`)
    })
};

const killPet = (req, res) => {
    const owner_chat_id = req.params.owner_chat_id;

    pool.query(`UPDATE tamagochi SET is_alive = false WHERE owner_chat_id = $1 RETURNING *`, 
    [owner_chat_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Скотину забили с особой жестокостью. Лежит вся в крови и в говне. Прямая кишка лезет наружу:
         ${JSON.stringify(results.rows[0])}`)
    })
};

module.exports = {
    postPet,
    updatePet,
    getPet,
    feedPet,
    cleanShit,
    cleanPee,
    curePet,
    playWithPet,
    killPet
}
