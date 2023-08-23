import * as React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid, Typography, Avatar, ListItemAvatar, ListItemText, List, IconButton } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { teal, indigo } from '@mui/material/colors'

import UpdateTodoModal from '../../components/UpdateTodoModal/UpdateTodoModal';

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

  const handleUpdateTodoClick = () => setOpenUpdateModal(true);
  const handleUpdateTodoClose = () => setOpenUpdateModal(false);

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
          Avatar with text and icon
        </Typography>
        <List dense={dense}>
          {generate(
            <div className={styles.todolist_wrapper}>
              <div className={styles.todo_header_wrapper}>
                <ListItemAvatar>
                  <TaskAltIcon sx={{ color: indigo[500] }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontSize: 20 }}>
                      Finish The Project
                    </Typography>
                  }
                  secondary={secondary ? 'The description of each task is supposed to be shown here.' : ''}
                />
                <IconButton aria-label="edit">
                  <EditIcon onClick={handleUpdateTodoClick} />
                </IconButton>
                <IconButton  aria-label="delete">
                  <DeleteIcon 
                    // onClick={handleDeleteTodoClick} 
                  />
                </IconButton>
              </div>
              <div className={styles.details_wrapper}>
                {/* Start Date */}
                <ListItemText
                  primary="Start Date"
                  secondary="2023/8/22"
                />
                {/* End Date */}
                <ListItemText
                  primary="End Date"
                  secondary="2023/8/25"
                />
                {/* Assigned Member */}
                <ListItemAvatar>
                  <Avatar 
                    alt="Assigned User" 
                    src="/static/images/avatar/1.jpg" 
                    sx={{ width: 30, height: 30, fontSize: 16, bgcolor: teal[200], marginTop: 2 }} 
                  />
                </ListItemAvatar>
              </div>
            </div>,
          )}
        </List>
      </Grid>
      <UpdateTodoModal open={OpenUpdateModal} onClose={handleUpdateTodoClose} />


    </>
  )
}
