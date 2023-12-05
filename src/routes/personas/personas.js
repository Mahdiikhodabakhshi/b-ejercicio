const express = require('express');
const route = express.Router();
const personaModel = require('../../models/persona');



//llegamos hasta localhost:3000/personas


//---------------------- get all persons-------------------

route.get('/' , async (req, res) =>{

    await personaModel.find()
        .then((data) =>{
            res.render('personas', {data});
        })
        .catch((err) => res.render('personas',err));
})


//---------------------- get one person -------------------

route.get('/detalle/:id' , async (req,res) =>{
    await personaModel.findById(req.params.id)
    .then((data)=>{
        console.log(data);
        res.render('persona' , {data})
    })
    .catch(err =>res.render('error' , err));
})


//----------------------   new person  -------------------


route.get('/new' , (req , res) =>{
    res.render('nuevaPersona');
})


route.post('/' , async (req , res) =>{
    const {name , email , telephone} = req.body;
    
    console.log(req.body);
    const newPerson = new personaModel(req.body);
    await newPerson.save()
        .then((data) =>res.redirect('/personas/'))
        .catch(err =>res.render('error' , err));
    });

//----------------------   delete person  -------------------

route.delete('/:id' , async (req, res) =>{
    await personaModel.findByIdAndDelete(req.params.id)
        .then((data) =>{
            if (data != null)  res.redirect('/personas/')
            else res.json({status : 'person with this ID not existed'})
        })
        .catch(err =>res.render('error' , err));
});


//----------------------   update person  -------------------

route.get('/edit/:id' ,async (req , res) =>{
    
    await personaModel.findById(req.params.id)
    .then((data)=>{
        console.log(data);
        res.render('updatePersona' , {data})
    })
    .catch(err =>res.render('error' , err));


})

route.patch('/:id' , async (req, res) =>{
    const {name , email , telephone } = req.body;
    await  personaModel.findByIdAndUpdate(
        req.params.id,
        {$set :  {name , email , telephone}}
    )
        .then(() =>{
             res.redirect(`detalle/${req.params.id}`)
            
        })
        .catch(err =>res.render('error' , err));
    })






module.exports = route;