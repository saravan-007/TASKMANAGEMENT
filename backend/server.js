const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
const taskRoutes = require('./routes/taskRoute');


// app.get('/',(req,res)=>{
//     res.send("hello world");
// })

// app.use((req,res,next)=>{
//     console.log("path"+ req.path + "method" + req.method);
//     next();

// });
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("DB connected succesfully and server is running on "+ process.env.PORT);
        });

    }).catch((error)=>console.log(error));

    app.use("/api/tasks",taskRoutes);

