const express = require('express');
const route = express.Router();
const personaModel = require('../models/persona');

// api/personas

route.get('/' ,async (req, res) =>{
    await personaModel.find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

route.get('/:id' , async (req, res) =>{
    await personaModel.findById(req.params.id)
        .then((data) => {
            if (data != null)  res.json(data)
            else res.json({status : 'person with this ID not existed'})
        })
        .catch((err) => res.json(err));
});

route.post('/' , async (req , res) =>{
    const newPerson = new personaModel(req.body);
    await newPerson.save()
        .then((data) =>res.json(data))
        .catch((err) => res.json(err));
});

route.delete('/:id' , async (req, res) =>{
    await personaModel.findByIdAndDelete(req.params.id)
        .then((data) =>{
            if (data != null)  res.json({status : 'deleted successfully'})
            else res.json({status : 'person with this ID not existed'})
        })
        .catch((err) => res.json(err));
});

route.patch('/:id' , async (req, res) =>{
    const person = req.body;
    await  personaModel.findByIdAndUpdate(
        req.params.id,
        {$set : person}
    )
        .then((data) =>{
            if (data != null) res.json({status : `person with id ${req.params.id} updated!!`})
            else res.json({status : 'person with this ID not existed'})
        })
        .catch((err) =>res.json(err));
})

module.exports = route;