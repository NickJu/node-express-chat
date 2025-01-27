require('dotenv').config();
const express = require('express');

const NChat = require('./models/exemple');
// export one function that gets called once as the server is being initialized
module.exports = function (app, server) {

    const mongoose = require('mongoose');
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB is OK'))
    .catch(() => console.log('DB failed'));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
    });

    app.use(express.json());

    const io = require('socket.io')(server, {
        cors: {
            origin: "http://127.0.0.1:5000",
            methods: ["GET", "POST"]
        }
    })

    require('./socket/chat')(io);

    app.use(function (req, res, next) { req.io = io; next(); });

    app.post('/user',(req, res, next) => {
        const msg = new NChat({...req.body});
        msg.save().then(() => {
            res.status(201).json({
            message: 'user add'
        })
        }).catch((error) => {
            res.status(400).json({error})
        })
    })

    app.post('/msg',(req, res, next) => {
        const msg = new NChat({...req.body});
        msg.save().then(() => {
            res.status(201).json({
            message: 'msg add'
        })
        }).catch((error) => {
            res.status(400).json({error})
        })
    })
    
    app.get('/msg', (req, res, next) => {
        NChat.find()
        .then(msg => res.status(200).json(msg))
        .catch(error => res.status(400).json({ error }));
    });
}