const { response } = require('express')
const pool = require('./config')

const getNews = (request, response) => {
    pool.query('SELECT * FROM news ORDER BY id DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getNewsById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM news WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMagicBall = (request, response) => {
    pool.query(`SELECT * FROM magicball
    ORDER BY RANDOM()
    LIMIT 1
    `, (error, results) => {
        if (error) {exit
            throw error}
            response.status(200).json(results.rows)
    })
};

const getJesusQuote = (request, response) => {
    pool.query(`SELECT * FROM JesusChristQuotes
    ORDER BY RANDOM()
    LIMIT 1`, (error, results) => {
        if (error) {exit
            throw error}
            response.status(200).json(results.rows)
    })
};

const getJesusRestPics = (request, response) => {
    pool.query(`SELECT * FROM JesusChristRestPics
    ORDER BY RANDOM()
    LIMIT 1`, (error, results) => {
        if (error) {exit
            throw error}
            response.status(200).json(results.rows)
    })
};

module.exports = {
    getNews,
    getNewsById,
    getMagicBall,
    getJesusQuote,
    getJesusRestPics
}
