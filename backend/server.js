const express = require('express')
const cors = require("cors")
const db = require("./models");
const { useCLS } = require('sequelize');


const { User, Posts, Comments } = db;

const app = express()
app.use(cors())
const port = 5000


app.get('/all-users', async (req, res) => {
  const allUsers = await User.findAll({
    raw:true

  })
  res.send(allUsers)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})