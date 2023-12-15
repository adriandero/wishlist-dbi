/*import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
const Model = require("../models/model.ts");
import mongoose, {ConnectOptions} from 'mongoose'


const db = mongoose.connection

const router = express.Router()
router.use(express.json())

// Post Method
router.post('/post', async (req, res) => {
    let collection = await db.collection("datas");

    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch (error:any) {
        res.status(400).json({message: error.message})
    }
})


//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
*/
/*
router.post('/api/todo', async (req: Request, res: Response) => {
    const { title, description } = req.body
    
    const todo = Todo.build({title, description})
    await todo.save()
    return res.status(201).send(todo)
})



module.exports = router;
*/