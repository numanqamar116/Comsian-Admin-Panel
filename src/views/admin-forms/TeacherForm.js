import React, { useState, useEffect } from 'react'
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import MaterialTable from '@material-table/core'
import { Delete, Edit, Close } from '@mui/icons-material'
import { addTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher } from './services'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TeacherForm = () => {
  const [teachers, setTeachers] = useState([])
  const [teacherData, setTeacherData] = useState({
    name: '',
    designation: '',
    department: '',
    areaOfInterest: '',
    supervisorStatus: '',
    imageUrl: '',
    profileUrl: '',
    onLeave: false,
  })
  const [selectedTeacherId, setSelectedTeacherId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchTeachers = async () => {
    setLoading(true)
    try {
      const data = await getTeachers()
      setTeachers(data)
    } catch (error) {
      toast.error('Error fetching teachers: ' + error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setTeacherData({
      ...teacherData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)

    try {
      if (selectedTeacherId) {
        await updateTeacher(selectedTeacherId, teacherData)
        toast.success('Teacher updated successfully!')
      } else {
        await addTeacher(teacherData)
        toast.success('Teacher added successfully!')
      }
      fetchTeachers()
      setTeacherData({
        name: '',
        designation: '',
        department: '',
        areaOfInterest: '',
        supervisorStatus: '',
        imageUrl: '',
        profileUrl: '',
        onLeave: false,
      })
      setSelectedTeacherId(null)
      setOpen(false) // Close the modal
    } catch (error) {
      toast.error('Error submitting teacher: ' + error.message)
    }
    setSubmitLoading(false)
  }

  const handleEdit = async (id) => {
    setLoading(true)
    try {
      const teacher = await getTeacherById(id)
      setTeacherData(teacher)
      setSelectedTeacherId(id)
      setOpen(true) // Open the modal
    } catch (error) {
      toast.error('Error fetching teacher details: ' + error.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      await deleteTeacher(id)
      toast.success('Teacher deleted successfully!')
      fetchTeachers()
    } catch (error) {
      toast.error('Error deleting teacher: ' + error.message)
    }
    setLoading(false)
  }

  const handleOpen = () => {
    setTeacherData({
      name: '',
      designation: '',
      department: '',
      areaOfInterest: '',
      supervisorStatus: '',
      imageUrl: '',
      profileUrl: '',
      onLeave: false,
    })
    setSelectedTeacherId(null)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container maxWidth={false} style={{ padding: '0', margin: '0' }}>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: 16 }}>
        Add Teacher
      </Button>
      <Grid container spacing={0} style={{ width: '100%', margin: 0 }}>
        <Grid item xs={12} style={{ width: '100%' }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <MaterialTable
              style={{ padding: '2vw' }}
              columns={[
                {
                  title: 'Name',
                  field: 'name',
                  render: (rowData) => (
                    <Box display="flex" alignItems="center">
                      <Box
                        sx={{
                          position: 'absolute',
                          width: 10,
                          height: 10,
                          borderRadius: '10vw',
                          backgroundColor: rowData.onLeave ? 'red' : 'green',
                          marginRight: 1,
                          left: 0,
                        }}
                      />
                      {rowData.name}
                    </Box>
                  ),
                },
                { title: 'Designation', field: 'designation' },
                { title: 'Department', field: 'department' },
                { title: 'Area of Interest', field: 'areaOfInterest' },
                { title: 'Supervisor Status', field: 'supervisorStatus' },
              ]}
              data={teachers}
              actions={[
                {
                  icon: () => <Edit />,
                  tooltip: 'Edit Teacher',
                  onClick: (event, rowData) => handleEdit(rowData._id),
                },
                {
                  icon: () => <Delete />,
                  tooltip: 'Delete Teacher',
                  onClick: (event, rowData) => handleDelete(rowData._id),
                },
              ]}
              options={{
                actionsColumnIndex: -1,
                search: true,
                paging: true,
              }}
              title="Teachers"
            />
          )}
        </Grid>
      </Grid>

      {/* Dialog Modal for Add/Edit Teacher */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {selectedTeacherId ? 'Edit Teacher' : 'Add Teacher'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  value={teacherData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Designation"
                  name="designation"
                  value={teacherData.designation}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Department"
                  name="department"
                  value={teacherData.department}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Area of Interest"
                  name="areaOfInterest"
                  value={teacherData.areaOfInterest}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Supervisor Status"
                  name="supervisorStatus"
                  value={teacherData.supervisorStatus}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  name="imageUrl"
                  value={teacherData.imageUrl}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Profile URL"
                  name="profileUrl"
                  value={teacherData.profileUrl}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={teacherData.onLeave}
                      onChange={handleChange}
                      name="onLeave"
                    />
                  }
                  label="Active to On Leave"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={submitLoading}
          >
            {submitLoading ? <CircularProgress size={24} /> : selectedTeacherId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default TeacherForm
