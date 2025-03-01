const express = require('express');

const app = express();

app.use('/user', [(req, res, next) => {
    res.send('Welcome')

    next()
}
, (req, res)=>{
    res.send('Welcome 2')
}]
)



app.listen(5000, ()=>{
    console.log("listening on port 5000");
    
})