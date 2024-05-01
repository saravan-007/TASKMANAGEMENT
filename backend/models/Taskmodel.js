const mongoose=require('mongoose');
const schema= mongoose.Schema;

const TaskSchema = new schema(
    {
        title:{
            type:String,
            require:true,
        },
        description:{
            type:String,
        },
    },
    {timestamps:true}
);

module.exports = mongoose.model("Task",TaskSchema);