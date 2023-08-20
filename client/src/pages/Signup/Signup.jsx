import React from 'react'
import Navbar from "../../components/Navbar/Navbar";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import styles from "./Signup.module.css";

export default function Signup() {
  return (
    <>
        <Navbar />
        <Box 
          className={styles.main_wrapper}
          component="form"
          // sx={{
          //   '& > :not(style)': { m: 1, width: '50ch' },
          // }}
          sx={{
            display: 'flex',
            flexDirection: 'column', // コンポーネントを縦方向に配置
            '& > :not(style)': {
              m: 1,
              width: '50ch',
            },
          }}
          marginBottom='1rem'
          noValidate
          autoComplete="off"
        >
          <div className={styles.signup_wrapper}>
            <h1>Sign Up</h1>
            <div>
              <TextField id="outlined-basic" label="Full Name" variant="outlined" sx={{ marginBottom: '1rem' }} />
              <TextField id="outlined-basic" label="User Name" variant="outlined" sx={{ marginBottom: '1rem' }} />
              <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ marginBottom: '1rem' }} />
              <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ marginBottom: '1rem' }} />
            </div>

            <Button variant="contained" endIcon={<SendIcon />} sx={{ marginTop: '1rem' }}>
              Sign Up
            </Button>
          </div>

        </Box>
    </>
  )
}
