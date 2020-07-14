//require express , body-parser
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//require queries for database operations
const db = require('./queries')
const port = 3030
//use bodyParser in the app to get data in json format
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//home route, displays message when api is launched
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

//custom routes for database operations
/*
to show all users */
app.get('/users', db.getUsers)
/*
to show specific user */
app.get('/users/:id', db.getUserById)
/*
create a new user and upload it to database*/
app.post('/users', db.createUser)
/*
update user's data in the database*/
app.put('/users/:id', db.updateUser)
/*
deletes a user from database */
app.delete('/users/:id', db.deleteUser)

/*
display the message in terminal when api */
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})