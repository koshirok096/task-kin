import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Include useNavigate and useLocation

import Modal from '@mui/material/Modal';
import styles from "./AddTodoModal.module.css";

import { useSelector } from "react-redux";


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
  const [assignedTo, setAssignedTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [members, setMembers] = useState([]);

  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      title,
      description,
      groupId: user.group[0], // Use actual user's groupId from Redux
      assignedTo: assignedTo, // Use actual user's userId from Redux
      startDate,
      endDate,
      createdBy: user._id, // Use actual user's userId from Redux
    };
    console.log('fheowhoiehfwife', data);
    console.log('aaaaaaaajpapajpa', user.userId);
    try {
      const response = await fetch('http://localhost:3001/todo/create', {
        method: 'POST',
        headers: {
          Authorization: `${token}`, // Make sure to add "Bearer" before token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        console.log('Todo added successfully');
        onClose();
      } else {
        console.error('Failed to add todo');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const fetchMembers = async () => {
    const groupId = user.group[0];
    try {
      const group = await axios.get(`http://localhost:3001/group/${groupId}`);
      const members = group.data.members;
      console.log('members', members);

      const membersData = await Promise.all(
        members.map(async (member) => {
          const response = await axios.get(
            `http://localhost:3001/auth/${member}`
          );
          return response.data;
        })
      );

      // console.log('membersData', membersData);
      setMembers(membersData);

    } catch (error) { }

  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    console.log('assignedTo', assignedTo);
  }, [assignedTo]);
  
  // test
  const users = [
    { userId: 1, name: 'User 1' },
    { userId: 2, name: 'User 2' },
    { userId: 3, name: 'User 3' },
    // ... and so on
  ];

    return (
      <Modal open={open} onClose={onClose}>
        <Box
          className={styles.main_wrapper}
          // component="form"        
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
           onSubmit={handleSubmit}
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
            {/* <TextField
              id="assignTo"
              label="Assign To"
              variant="outlined"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            /> */}
            <Select
              id="assignedTo"
              label="Assigned To"
              variant="outlined"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            >
              {/* Map over your user data to generate MenuItems */}
              {members.map((member) => (
                <MenuItem key={member._id} value={member._id}>
                  {member?.username}{/* Display the user's name */}
                </MenuItem>
              ))}
            </Select>

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
  
  
  
  
  
  
  