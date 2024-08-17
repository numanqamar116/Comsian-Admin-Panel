const express = require('express')
const router = express.Router()
const Teacher = require('./../models/teacher-model')
const TeacherRating = require('./../models/ratings-model')

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('ratings')
    console.log('Successfully retrieved all teachers')
    res.json(teachers)
  } catch (error) {
    console.error('Error fetching all teachers:', error.message)
    res.status(500).json({ message: error.message })
  }
})

// Get a single teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('ratings')
    if (!teacher) {
      console.log('Teacher not found for ID:', req.params.id)
      return res.status(404).json({ message: 'Teacher not found' })
    }
    console.log('Successfully retrieved teacher:', teacher.name)
    res.json(teacher)
  } catch (error) {
    console.error('Error fetching teacher by ID:', error.message)
    res.status(500).json({ message: error.message })
  }
})

// Create a new teacher
router.post('/', async (req, res) => {
  const {
    name,
    designation,
    department,
    areaOfInterest,
    supervisorStatus,
    imageUrl,
    profileUrl,
    onLeave,
    location,
  } = req.body
  try {
    const newTeacher = new Teacher({
      name,
      designation,
      department,
      areaOfInterest,
      supervisorStatus,
      imageUrl,
      profileUrl,
      onLeave,
      location,
    })
    const savedTeacher = await newTeacher.save()
    console.log('Successfully created new teacher:', savedTeacher.name)
    res.status(201).json(savedTeacher)
  } catch (error) {
    console.error('Error creating new teacher:', error.message)
    res.status(400).json({ message: error.message })
  }
})

// Update a teacher by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedTeacher) {
      console.log('Teacher not found for update with ID:', req.params.id)
      return res.status(404).json({ message: 'Teacher not found' })
    }
    console.log('Successfully updated teacher:', updatedTeacher.name)
    res.json(updatedTeacher)
  } catch (error) {
    console.error('Error updating teacher by ID:', error.message)
    res.status(400).json({ message: error.message })
  }
})

// Delete a teacher by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id)
    if (!deletedTeacher) {
      console.log('Teacher not found for deletion with ID:', req.params.id)
      return res.status(404).json({ message: 'Teacher not found' })
    }
    console.log('Successfully deleted teacher with ID:', req.params.id)
    res.json({ message: 'Teacher deleted successfully' })
  } catch (error) {
    console.error('Error deleting teacher by ID:', error.message)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
