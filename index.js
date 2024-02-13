require('dotenv').config();
const express = require('express');
const app = express();
const cors=require('cors');
const connection=require('./db');
const userRoutes = require('./routes/user');
const authRoutes=require("./routes/auth");

//database connection
connection();

//middleware
app.use(cors({
    origin:"http://localhost:3000",
    allowedHeaders:["Content-Type", "Authorization"],
    credentials:true
}));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth',authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});