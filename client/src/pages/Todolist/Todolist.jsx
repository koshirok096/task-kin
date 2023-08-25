import React, { Fragment, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';

import Navbar from "../../components/Navbar/Navbar";
import styles from "./Todolist.module.css";

import AddTodoModal from '../../components/AddTodoModal/AddTodoModal';
import UpdateTodoModal from '../../components/UpdateTodoModal/UpdateTodoModal';
import TodoCard from '../../components/TodoCard/TodoCard';

//DARKMODE
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../slices/theme";
import GlobalTheme from "../../slices/globals.js";
import * as Mistyled from "styled-components";


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

  const [OpenAddModal, setOpenAddModal] = React.useState(false);
  const [OpenUpdateModal, setOpenUpdateModal] = React.useState(false);

  // speed dial
  const handleAddTodoClick = () => setOpenAddModal(true);
  const handleAddTodoClose = () => setOpenAddModal(false);
  const handleUpdateTodoClick = () => setOpenUpdateModal(true);
  const handleUpdateTodoClose = () => setOpenUpdateModal(false);

  //DARKMODE
const [theme, setTheme] = useState("light");

const toggleTheme = () => {
  if (theme === "light") {
    window.localStorage.setItem("theme", "dark");
    setTheme("dark");
  } else {
    window.localStorage.setItem("theme", "light");
    setTheme("light");
  }
};

useEffect(() => {
 const localTheme = window.localStorage.getItem("theme");
 localTheme && setTheme(localTheme);
}, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
    <Fragment>
    <GlobalTheme />
    <Box className={styles.main_wrapper} sx={{ flexGrow: 1, maxWidth: 1000 }}>
      <TodoCard />

          {/* speeddial */}

        <Box sx={{ height: 160, transform: 'translateZ(0px)', flexGrow: 1 }}>
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
            {/* <SpeedDialAction
            key="Update Todo"
            icon={<SaveIcon />}
            tooltipTitle="Update Todo"
            onClick={handleUpdateTodoClick}
            /> */}
        </SpeedDial>
        <AddTodoModal open={OpenAddModal} onClose={handleAddTodoClose} />
        <UpdateTodoModal open={OpenUpdateModal} onClose={handleUpdateTodoClose} />
        </Box>
    </Box>
      </Fragment>
    </ThemeProvider>
  );
}