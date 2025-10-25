const express = require('express');
const cors = require('cors');
// const dotenv = require('dotenv');
const morgan = require('morgan');
require("dotenv").config();
const sequelize = require('./config/db');
const PORT = process.env.PORT;
const routes = require('./routes/index');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api' , routes);

sequelize.sync().then(() => {
    console.log('DB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});