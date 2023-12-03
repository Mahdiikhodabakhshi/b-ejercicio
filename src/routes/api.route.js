const express = require('express');
const route = express.Router();
const personaRoute = require('./api.personas');
const tareasRoute = require('./api.tareas');



route.use('/personas',personaRoute);
route.use('/tareas' , tareasRoute)

route.get('/' , (req, res) => res.send('api route'));



module.exports = route;