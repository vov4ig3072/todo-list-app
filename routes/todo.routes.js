import { Router } from "express";
import Todo from "../models/Todo.js";
import authMiddleware from "../middleware/auth.middleware.js"

const router = Router()

router.post("/create-todo", authMiddleware, async (req, res) => {
    try {
        const {title} = req.body

        const todo = new Todo({title: title, owner: req.user.userId})

        await todo.save()

        res.status(201).json({todo})
    }catch (e) {
        res.status(500).json({message: "Sever Error try later"})
    }
})

router.post("/delete-todo", authMiddleware, async (req, res) => {
    try {
        const {id} = req.body
        const todo = await Todo.findByIdAndRemove(id)
    
        res.status(201).json({todo: todo})
    }catch (e) {
        res.status(500).json({message: "Sever Error try later"})
    }
})

router.post("/update-todo", authMiddleware, async (req, res) => {
    try {
        const {id} = req.body
        const { complited } = await Todo.findById(id)
        const todo = await Todo.findByIdAndUpdate(id, {complited : !complited})
    
        res.status(201).json({todo: todo})
    }catch (e) {
        res.status(500).json({message: "Sever Error try later"})
    }
})

router.get("/", authMiddleware,  async (req, res) => {
    try {
        const todos = await Todo.find({owner : req.user.userId})
        res.json(todos)
    }catch (e) {
        res.status(500).json({message: "Sever Error try later"})
    }
})

export default router