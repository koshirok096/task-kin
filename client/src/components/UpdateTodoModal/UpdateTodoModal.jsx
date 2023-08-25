import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import styles from "./UpdateTodoModal.module.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
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

export default function UpdateTodoModal({ open, onClose, todoId }) {
  const token = useSelector(state => state.auth.token);
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    if(todoId) fetchTodo(todoId);
  }, [todoId])

  const fetchTodo = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(`http://localhost:3001/todo/read/${id}`, {
        headers: {
          Authorization: token
        }
      });
      console.log(response);
      const { data } = response;
      // const todo = await response.data;
      setTodo({
        id: data._id,
        title: data.title,
        description: data.description,
        assignedTo: data.assignedTo,
        startDate: data.startDate,
        endDate: data.endDate
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTodo((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const updateTodo = async (id, e) => {
    try {
      const response = await axios.put(`http://localhost:3001/todo/${id}`, {
        title: todo.title,
        description: todo.description,
        assignedTo: todo.assignedTo,
      }, {
        headers: {
          Authorization: token
        }
      });
      console.log(response);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          {/* <Typography variant="h6" component="h2">
            Update Todo
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div className={styles.form_wrapper}>
          <h1>Edit Todo</h1>
          <form
           onSubmit={(e) => updateTodo(todo.id, e)}
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
              name='title'
              value={todo?.title}
              // value={title}
              onChange={(e) => handleChanges(e)}
              sx={{ marginBottom: '1rem' }}
              required
              placeholder=""
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              name='description'
              value={todo?.description}
              // value={description}
              onChange={(e) => handleChanges(e)}
              sx={{ marginBottom: '1rem' }}
              required
              placeholder=""
            />
            <TextField
              id="assignedTo"
              label="Assigned To"
              variant="outlined"
              // placeholder={todo?.assignedTo}
              onChange={(e) => handleChanges(e)}
              value={todo?.assignedTo}
              // onChange={(e) => setAssignedTo(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />
            {/* <TextField
              id="startDate"
              label="Start Date"
              variant="outlined"
              type="date"
              // value={startDate}
              // onChange={(e) => setStartDate(e.target.value)}
              onChange={(e) => handleChanges(e)}
              sx={{ marginBottom: '1rem' }}
              required
              value={todo?.startDate}
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
              onChange={(e) => handleChanges(e)}
              // value={endDate}
              // onChange={(e) => setEndDate(e.target.value)}
              value={todo?.endDate}
              sx={{ marginBottom: '1rem' }}
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                placeholder: '', // Set an empty placeholder
              }}
            /> */}
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ marginTop: '1rem' }}
              type="submit"
            >
              Update
            </Button>
          </form>
        </div>
        </Box>
      </Modal>
    );
  }
  
  
  
  
  
  
  