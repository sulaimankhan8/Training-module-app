const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const userRoutes = require('./routes/users');
const fileUpload = require('express-fileupload');

dotenv.config();

connectDB();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };


app.use(cors(corsOptions)); 

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
