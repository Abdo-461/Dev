/**
 establish a connection with postgresql * 
 */
const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  database: 'api',
  port: 5432,
})
/*
query to fetch all users from database */
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
/*
query to fetch sepcific users from database */
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

/*
query to create users and push it to database*/
const createUser = (request, response) => {
  const { name, email , role } = request.body

  pool.query('INSERT INTO users (name, email , role) VALUES ($1, $2 , $3)', [name, email,role], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`user has been added `)
  })
}

/*
query to update user's data in the database*/
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email , role} = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 , role = $3 WHERE id = $3',
    [name, email, role, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
/*
query to delete user's data in the database*/
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

/*export all modules to be used in the main app index.js*/
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}