const express = require('express');
const router = express.Router();
const personaModel = require('../../models/persona');
const tareaModel = require('../../models/tarea');
const { Route } = require('express');


//-----------------------get persons with their tasks----------------------


router.get('/' , (req , res) =>{
    personaModel.aggregate([{
        $lookup:{
            from : tareaModel.collection.name,
            localField: 'tarea',
            foreignField: 'name',
            as : 'detalle_tareas'
        }
    }])
    .then((result) => {
        res.render('asigPersonas' , {result})
       console.log(result);
      // res.send('per')
    }).catch((err) => {
       res.render('error' , {err})
      // console.log(err);

    });
})


//----------------------delete tasks from persons-----------------------


//TODO


router.patch('/:id/:s' ,async (req , res) =>{
    const {id , s} = req.params;
    
    const datos = await personaModel.findById(id);
    
   datos.tarea.splice(s , 1);
   await datos.save()
    .then((data)=>{
       // console.log(data.tarea[index]);
      //  data.tarea.splice(index , 1);
      console.log(`Element at index ${s} removed:`, data);
        res.redirect('/asignaciones/personas/')
    })
    .catch(err =>{
        console.log(err);
        res.json(err);
    });

})



//------------------add tasks for persons-------------------
router.get('/new/:id' , async(req , res ) =>{
    const { id } = req.params;
    await tareaModel.find()
    .then((data) =>{
       res.render('tPersona' , {data , id}) 
    }) 
    .catch((err) =>{ res.json(err); console.log(err)})
    
})

router.patch('/:id' ,async (req , res ) =>{
    const { id } = req.params;
    const { tarea } = req.body;
    await personaModel.findByIdAndUpdate(
        id,
        {$push : {tarea: tarea}}
    )
    .then((data) =>{
        console.log(data);
        res.redirect('./');
    })
    .catch((err) =>{
        console.log(err);
        res.json(err);
    })
})


module.exports = router;