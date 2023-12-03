const express = require('express');
const route = express.Router();
const personaModel = require('../../models/persona');

route.get('/' , async (req, res) =>{

    await personaModel.find()
        .then((data) =>{


            res.render('personas', {data});
            res.end();
        })
        .catch((err) => res.render('personas',err));






})





module.exports = route;