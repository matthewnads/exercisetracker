/**
 * this is the core of the BACKEND 
 * do "nodemon server" in the backend folder to start the server 
 */

const express = require('express');
const cors= require('cors'); 
const mongoose = require('mongoose');

require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT||5000; 

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MDB connection has entered the ring');
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users'); 

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server be running on port: ${port}`); 
}); 