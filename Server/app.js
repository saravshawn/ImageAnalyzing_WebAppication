const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = require('./api/routes/image_process.route');

const app = express();

app.use(express.static(path.join(__dirname,"ImageSource")));

var corsOptions = {
    origin:"http://localhost:4200",
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials:true
}

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors(corsOptions));


app.use('/api',router);
const port = 3000;

app.listen(port,()=>{
    console.log(`Server now listening on port : ${port}`);
});