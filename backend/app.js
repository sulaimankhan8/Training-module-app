const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const userRoutes = require('./routes/users');
const fileUpload = require('express-fileupload');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
