const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
require('dotenv').config();
const fileUpload = require("express-fileupload");

//database URL
const MONGO_URL = `mongodb+srv://softball:${process.env.MONGO_PASSWORD}@cluster0-ibejr.mongodb.net/softball`;

const app = express();
app.use(morgan('dev'));
app.use(express.json({
    type: "application/json"
}));
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(fileUpload());

// app routes
const userRoutes = require('./routes/user');

app.use("/api/user/", userRoutes);


//connect to database and listen
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true
    })
    .then(result => {
        let PORT = process.env.PORT || 7000;
        app.listen(PORT);
        console.log('Server started and DB Connected ' + PORT);
    })
    .catch(err => {
        console.log(err.message);
    });