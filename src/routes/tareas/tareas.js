const express = require('express');
const route = express.Router();
const tareasModel = require('../../models/tarea');



//llegamos hasta localhost:3000/personas


//---------------------- get all tasks-------------------

route.get('/' , async (req, res) =>{

    await tareasModel.find()
        .then((data) =>{
            console.log(data);
            res.render('tareas', {data });
        })
        .catch((err) => res.render('error',err));
})


//---------------------- get one person -------------------

route.get('/detalle/:id' , async (req,res) =>{
    
    await tareasModel.findById(req.params.id)
    .then((data)=>{
        console.log(data);
        res.render('tarea' , {data})
    })
    .catch(err =>res.render('error' , err));
})


//----------------------   new person  -------------------


route.get('/new' , (req , res) =>{
    res.render('nuevaTarea');
})


route.post('/' , async (req , res) =>{
    const {name , location , hour} = req.body;
    
    console.log(req.body);
    const newTarea = new tareasModel(req.body);
    await newTarea.save()
        .then((data) =>res.redirect('/tareas/'))
        .catch(err =>res.render('error' , err));
    });

//----------------------   delete person  -------------------

route.delete('/:id' , async (req, res) =>{
    await tareasModel.findByIdAndDelete(req.params.id)
        .then((data) =>{
            if (data != null)  res.redirect('/tareas/')
            else res.json({status : 'person with this ID not existed'})
        })
        .catch(err =>res.render('error' , err));
});


//----------------------   update person  -------------------

route.get('/edit/:id' ,async (req , res) =>{
    
    await tareasModel.findById(req.params.id)
    .then((data)=>{
        console.log(data);
        res.render('updateTarea' , {data})
    })
    .catch(err =>res.render('error' , err));


})

route.patch('/:id' , async (req, res) =>{
    const {name , location , hour } = req.body;
    await  tareasModel.findByIdAndUpdate(
        req.params.id,
        {$set :  {name , location , hour}}
    )
        .then(() =>{
             res.redirect(`detalle/${req.params.id}`)
            
        })
        .catch(err =>res.render('error' , err));
    })






module.exports = route;