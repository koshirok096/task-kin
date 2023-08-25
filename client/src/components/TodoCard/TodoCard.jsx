import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid, Typography, Avatar, ListItemAvatar, ListItemText, List, IconButton } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { teal, indigo } from '@mui/material/colors'
import { getTodosStart, getTodosSuccess, getTodosFailure } from '../../slices/todosSlice'; // Import your todoSlice actions


import UpdateTodoModal from '../../components/UpdateTodoModal/UpdateTodoModal';

import { useSelector } from "react-redux";

import styles from "./TodoCard.module.css";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function TodoCard() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [OpenUpdateModal, setOpenUpdateModal] = React.useState(false);

  const handleUpdateTodoClose = () => setOpenUpdateModal(false);

  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const todos = useSelector(state => state.todo.todos);

  const [selectedTodo, setSelectedTodo] = useState(null);

  const [inProgressTodos, setInProgressTodos] = useState([]);
  const [AssignedMember, setAssignedMember] = useState([]);


  useEffect(() => {
    getInProgressTodos();
    getAssignedMember();
  }, []);

  const handleUpdateTodo = async (todoId) => {
    setOpenUpdateModal(true);
    setSelectedTodo(todoId);
  };

  const getInProgressTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3001/todo/${user.group[0]}/inprogress`, {
        headers: {
          Authorization: `${token}`
        }
      });
      const todo = await response.json();
      setInProgressTodos(todo);
      console.log(todo);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // date format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('ja-JP', options);
  };

  
  // const getAssignedMember = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/todo/${user?.username}`, {
  //       headers: {
  //         Authorization: `${token}`
  //       }
  //     });
  //     const member = await response.json();
  //     setAssignedMember(member);
  //     console.log('member is :', member);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };
  const getAssignedMember = async () => {
    try {
      const response = await fetch(`http://localhost:3001/auth/${user?._id}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      const member = await response.json();
      console.log(response);
      setAssignedMember(member.username);
      // console.log('member is :', member.username);
      // console.log(AssignedMember);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDeleteTodoClick = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:3001/todo/${todoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`
        }
      });

      if (response.ok) {
        // ToDo 削除が成功した場合に、更新された ToDo リストを取得して表示
        getInProgressTodos();
      } else {
        console.error("Failed to delete ToDo.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  

  return (
    <>
      
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={dense}
              onChange={(event) => setDense(event.target.checked)}
            />
          }
          label="Enable dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Show Description"
        />
      </FormGroup>

      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Group Todo List
        </Typography>
        <List dense={dense}>
          {inProgressTodos.map((todo, index) => (
            <div key={index} className={styles.todolist_wrapper}>
              <div className={styles.todo_header_wrapper}>
                <ListItemAvatar>
                  <TaskAltIcon sx={{ color: indigo[500] }} />
                </ListItemAvatar>
                <ListItemText
                primary={
                  <Typography variant="h6" sx={{ fontSize: 20 }}>
                    {todo.title}
                  </Typography>
                }
                secondary={secondary ? todo.description : ''}
              />
                <IconButton onClick={() => handleUpdateTodo(todo._id)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTodoClick(todo._id)} aria-label="delete">
                  <DeleteIcon  />
                </IconButton>

              </div>
              <div className={styles.details_wrapper}>
                {/* Start Date */}
                <ListItemText
                  primary="Start Date"
                  secondary={formatDate(todo.startDate)}
                />
                {/* End Date */}
                <ListItemText
                  primary="End Date"
                  secondary={formatDate(todo.endDate)}
                />
                {/* Assigned Member */}
                <ListItemAvatar>
                  <Avatar 
                    alt={AssignedMember ? AssignedMember.toUpperCase() : "Unknown User"} 
                    src="/static/images/avatar/1.jpg" 
                    sx={{ width: 30, height: 30, fontSize: 16, bgcolor: teal[200], marginTop: 2 }} 
                  />
                </ListItemAvatar>
              </div>
              </div>
          ))}
        </List>
      </Grid>
      <UpdateTodoModal open={OpenUpdateModal} todoId={selectedTodo} onClose={handleUpdateTodoClose} />
    </>
  )
}
