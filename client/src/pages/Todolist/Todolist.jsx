import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';

import Navbar from "../../components/Navbar/Navbar";
import styles from "./Todolist.module.css";

import AddTodoModal from '../../components/AddTodoModal/AddTodoModal'
import UpdateTodoModal from '../../components/UpdateTodoModal/UpdateTodoModal'


function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Todolist() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [OpenAddModal, setOpenAddModal] = React.useState(false);
  const [OpenUpdateModal, setOpenUpdateModal] = React.useState(false);

  // speed dial
  const handleAddTodoClick = () => setOpenAddModal(true);
  const handleAddTodoClose = () => setOpenAddModal(false);
  const handleUpdateTodoClick = () => setOpenUpdateModal(true);
  const handleUpdateTodoClose = () => setOpenUpdateModal(false);

  return (

    <Box className={styles.main_wrapper} sx={{ flexGrow: 1, maxWidth: 752 }}>
          <Navbar />

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
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
          {/* speeddial */}

        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
            <SpeedDialAction
            key="Add Todo"
            icon={<FileCopyIcon />}
            tooltipTitle="Add Todo"
            onClick={handleAddTodoClick}
            />
            <SpeedDialAction
            key="Update Todo"
            icon={<SaveIcon />}
            tooltipTitle="Update Todo"
            onClick={handleUpdateTodoClick}
            />
        </SpeedDial>
        <AddTodoModal open={OpenAddModal} onClose={handleAddTodoClose} />
        <UpdateTodoModal open={OpenUpdateModal} onClose={handleUpdateTodoClose} />
        </Box>
    </Box>
  );
}