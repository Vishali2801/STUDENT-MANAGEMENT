const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


// ROOT route - get all students
router.get('/', async (req, res) => {
 try {
   const students = await Student.find();
   res.status(200).json(students);
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
});


// CREATE a new student
router.post('/add', async (req, res) => {
 try {
   const { name, rollNo, course, grade } = req.body;
   const newStudent = new Student({ name, rollNo, course, grade });
   await newStudent.save();
   res.status(201).json({ message: 'Student added successfully!', student: newStudent });
 } catch (error) {
   res.status(400).json({ error: error.message });
 }
});


// UPDATE a student by ID
router.put('/update/:id', async (req, res) => {
 try {
   const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.status(200).json({ message: 'Student updated successfully!', updatedStudent });
 } catch (error) {
   res.status(400).json({ error: error.message });
 }
});


// DELETE a student by ID
router.delete('/delete/:id', async (req, res) => {
 try {
   await Student.findByIdAndDelete(req.params.id);
   res.status(200).json({ message: 'Student deleted successfully!' });
 } catch (error) {
   res.status(400).json({ error: error.message });
 }
});


module.exports = router;
