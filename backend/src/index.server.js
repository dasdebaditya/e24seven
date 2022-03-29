const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const AuthRoute = require('./routes/auth');

//routes

const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

//env variable

env.config();

//MONGO connection URL

// mongodb+srv://<username>:<password>@cluster0.gs8kc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.gs8kc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
).then(()=>{
    console.log('Database Connected!');
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.use(bodyParser());
// app.use('/api',userRoutes);
app.use('/api',AuthRoute);
app.use('/api',adminRoutes);