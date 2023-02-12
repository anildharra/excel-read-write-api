
const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config()
const constants = require('./constants');
const app = express();
const AuthRoute = require('./Routes/Main.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', AuthRoute)

const PORT = constants.PORT || process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
