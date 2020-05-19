const express = require('express');

const router = express.Router()

//database stuff
const actionDB = require("../data/helpers/actionModel");
const projectDB = require("../data/helpers/projectModel");


// All these helper methods return a promise. Remember to use .then().catch() or async/await.


//POST (CREATE)
router.post('/', (req,res) => {
    // anytime something is updated, you send to .body
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

//GET (READ)

// handle requests to the root of the api, the / route
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

//PUT (Update)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
//update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. 
//If a resource with the provided id is not found, the method returns null.
    if(!update) {
        res.status(400).json({ message: "please include update information" });
    };

    projectDB.update(id, update)
        .then(project => {
            if(project) {
                res.status(201).json(project);
            } else {
                res.status(404).json({ message: "project id could not be found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error updating project" });
        });
});

//DELETE/

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    projectDB.remove(id)
        .then(del => {
            res.status(201).json({ message: "project successfully deleted" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "error deleting project" });
        });
});

module.exports = router;