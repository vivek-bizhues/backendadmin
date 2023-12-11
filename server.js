const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())
// MongoDB connection
mongoose.connect('mongodb+srv://vivek:bhatt@cluster0.nr0whl0.mongodb.net/data?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const userRoutes = require ('./routes/user.js');

app.use("/user",userRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
