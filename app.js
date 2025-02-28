const express = require('express');

const app = express();

app.use('/home', (req , res)=>{
    res.send('Hello from home, Express!');
})
app.use('/about', (req , res)=>{
    res.send('about here');
})

app.listen(5000, (port) => {
    console.log(`Server is running on port 5000`);
})