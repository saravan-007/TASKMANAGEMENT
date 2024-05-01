const { default: mongoose } = require("mongoose");
const taskModel = require("../models/Taskmodel");

const createTask = async(req,res) =>{
    const {title,description} = req.body;

    try{
        const task = await taskModel.create({title,description});
        res.status(200).json(task);

    }catch (e){
        res.status(400).json({error: e.message});
    }
};

const getTasks = async(req,res)=>{
    try{
        const tasks = await taskModel.find({});
        res.status(200).json(tasks);
    }catch (e) {
        res.status(400).json({error: e.message});
    }
};

const getSingleTask = async (req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Task Not Found'})
    }
    try {
        const singleTask = await taskModel.findById(id);
        res.status(200).json(singleTask);
    }catch (e) {
        res.status(400).json({error: e.message});
    }
};

const updateTask = async (req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Task Not Found'})
    }
    try {
        const task = await taskModel.findByIdAndUpdate({
            _id:id,
        },
        {
            ...req.body,

        });
        res.status(200).json(task);
    } catch (e){
        res.status(400).json({error:e.message});
    }
};
const deleteTask = async (req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Task Not Found'})
    }
    try{
        const task = await taskModel.findByIdAndDelete(id);
        res.status(200).json(task)
    }catch (e){
        res.status(400).json({error:e.message});
    }

}
module.exports = {createTask,getTasks,getSingleTask,updateTask,deleteTask};