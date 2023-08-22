import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom'; // Include useNavigate and useLocation

import Modal from '@mui/material/Modal';
import styles from "./AddTodoModal.module.css";


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddTodoModal({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission here, e.g., dispatch an action to create the todo item
  // };


    return (
      <Modal open={open} onClose={onClose}>
        <Box
          className={styles.main_wrapper}
          component="form"        
         sx={{
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          margin: 'auto'
         }}
        marginBottom='1rem'
        noValidate
        autoComplete="off"
      >
        <div className={styles.form_wrapper}>
          <h1>Add Todo</h1>
          <form
          //  onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          >
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              required
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              required
            />
            <TextField
              id="assignTo"
              label="Assign To"
              variant="outlined"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />
            <TextField
              id="startDate"
              label="Start Date"
              variant="outlined"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                placeholder: '', // Set an empty placeholder
              }}
            />
            <TextField
              id="endDate"
              label="End Date"
              variant="outlined"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                placeholder: '', // Set an empty placeholder
              }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ marginTop: '1rem' }}
              type="submit"
            >
              Add
            </Button>
          </form>
        </div>
      </Box>
      </Modal>
    );
  }
  
  
  
  
  
  
  