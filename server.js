const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {mongoDB, port} = require('./config');
const router = express.Router();
const appRoutes = require('./routes/api')(router);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', appRoutes);

mongoose.connect(mongoDB.URL, mongoDB.options)    
.then(() => {
    console.log('Connected!');
})
.catch((err) => {
    console.log(err);
});

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '/build/index.html'));
// });

app.listen(port, () => {
    console.log(`Started on ${port}`);
});
