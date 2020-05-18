const express = require('express');

const router = express.Router()

const projectDB = require("../data/helpers/projectModel");

//POST
router.post('/', (req,res) => {
    const project = req.body;

    projectDB.insert(project)
        .then(project =>{
            res.status(201).json(project) //this is sending the project back to the user in json format
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message:err})
        })
});

//GET

router.get('/', (req,res) =>{
    projectDB.get()
    .then(projects =>{
        res.status(200).json(projects)
    }) 
    .catch(err =>{
        console.log(err)
        res.status(500).json({message:err})
    })
});

router.get('/:id', (req,res) =>{
    const {id} = req.params   
    projectDB.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log (err)
        res.status(500).json({message:err})
    })
});

//UPDATE
router.put('/:id', (req,res) => {
    
})

//DELETE
