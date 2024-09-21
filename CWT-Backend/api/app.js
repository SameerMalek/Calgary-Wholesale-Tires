import express from "express";

const app = express();
const PORT=8800;

// Routes: 

// Format of routes in general:
/*
app.use("/route/to/path", (req,res)=>{
    //Message or a Function to be executed:
    res.send("message");
    })
*/

app.use("/api/test", (req,res)=>{
    res.send("Its Working!");
});

app.listen(PORT, ()=> {
    console.log(`Server is successfully started at PORT: ${PORT}`);
});