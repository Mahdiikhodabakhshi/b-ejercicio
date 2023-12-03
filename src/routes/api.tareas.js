const express = require('express');
const route = express.Router();
const tareaModel = require('../models/tarea');

// api/personas

route.get('/' ,async (req, res) =>{
    await tareaModel.find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

route.get('/:id' , async (req, res) =>{
    await tareaModel.findById(req.params.id)
        .then((data) => {
            if (data != null)  res.json(data)
            else res.json({status : 'Task with this ID not existed'})
        })
        .catch((err) => res.json(err));
});

route.post('/' , async (req , res) =>{
    const newTask = new tareaModel(req.body);
    await newTask.save()
        .then((data) =>res.json(data))
        .catch((err) => res.json(err));
});

route.delete('/:id' , async (req, res) =>{
    await tareaModel.findByIdAndDelete(req.params.id)
        .then((data) =>{
            if (data != null)  res.json({status : 'deleted successfully'})
            else res.json({status : 'Task with this ID not existed'})
        })
        .catch((err) => res.json(err));
});

route.patch('/:id' , async (req, res) =>{
    const task = req.body;
    await  tareaModel.findByIdAndUpdate(
        req.params.id,
        {$set : task}
    )
        .then((data) =>{
            if (data != null) res.json({status : `Task with id ${req.params.id} updated!!`})
            else res.json({status : 'Task with this ID not existed'})
        })
        .catch((err) =>res.json(err));
})

module.exports = route;