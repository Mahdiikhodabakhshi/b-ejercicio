const express = require('express');
const route = express.Router();
const personaModel = require('../../models/persona');



//llegamos hasta localhost:3000/personas


route.get('/' , async (req, res) =>{

    await personaModel.find()
        .then((data) =>{
            res.render('personas', {data});
        })
        .catch((err) => res.render('personas',err));
})

route.get('/detalle/:id' , async (req,res) =>{
    await personaModel.findById(req.params.id)
    .then((data)=>{
        console.log(data);
        res.render('persona' , {data})
    })
    .catch(err =>res.render('persona' , err));
})

route.get('/new' , (req , res) =>{
    res.render('nuevaPersona');
})
route.post('/' , async (req , res) =>{
    const newPerson = new personaModel(req.body);
    await newPerson.save()
        .then((data) =>res.json(data))
        .catch((err) => res.json(err));
});





module.exports = route;