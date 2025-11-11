const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
 name: { type: String, required: true },
 rollNo: { type: String, required: true, unique: true },
 course: { type: String, required: true },
 grade: { type: String }
});


module.exports = mongoose.model('Student', studentSchema);
