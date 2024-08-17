import axiosInstance from './axiosInstance'

// Function to add a new teacher
export const addTeacher = async (teacherData) => {
  try {
    const response = await axiosInstance.post('/teachers', teacherData)
    return response.data
  } catch (error) {
    throw new Error('Error adding teacher: ' + error.message)
  }
}

// Function to get all teachers
export const getTeachers = async () => {
  try {
    const response = await axiosInstance.get('/teachers')
    return response.data
  } catch (error) {
    throw new Error('Error fetching teachers: ' + error.message)
  }
}

// Function to get a teacher by ID
export const getTeacherById = async (id) => {
  try {
    const response = await axiosInstance.get(`/teachers/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching teacher: ' + error.message)
  }
}

// Function to update a teacher by ID
export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await axiosInstance.put(`/teachers/${id}`, teacherData)
    return response.data
  } catch (error) {
    throw new Error('Error updating teacher: ' + error.message)
  }
}

// Function to delete a teacher by ID
export const deleteTeacher = async (id) => {
  try {
    const response = await axiosInstance.delete(`/teachers/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error deleting teacher: ' + error.message)
  }
}
