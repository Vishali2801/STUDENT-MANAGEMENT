const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();


const studentRoutes = require('./routes/student');
const authRoutes = require('./routes/auth');


const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);


// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));


// ✅ Serve login.html for the root route
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, '../frontend/login.html'));
});


// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
 // new parser & topology not needed in new versions
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));


// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));