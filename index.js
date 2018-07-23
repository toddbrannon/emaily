const express = require('express');
const mongoose = require('mongoose');
const keys = require('.config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.get('/', (req, res) => {
    res.send("Hello!");    
});

require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Emaily server is live and running...')
});
