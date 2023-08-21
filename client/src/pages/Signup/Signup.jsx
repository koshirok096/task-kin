import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../slices/authSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import styles from "./Signup.module.css";

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/signup', {
        fullName,
        userName,
        email,
        password,
      });

      const data = response.data;

      if (response.status === 201) { // Check for status code 201 (Created)
        dispatch(loginSuccess(data)); // Simulate automatic login after signup
        console.log('Signup successful!', data);
        navigate('/'); // Redirect to the home page or any desired route
      } else {
        console.log('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  };


  return (
    <>
      <Box 
        className={styles.main_wrapper}
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
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
            <TextField 
              id="fullName" 
              label="Full Name" 
              variant="outlined" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{ marginBottom: '1rem' }} 
            />
            <TextField 
              id="userName" 
              label="User Name" 
              variant="outlined" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ marginBottom: '1rem' }} 
            />
            <TextField 
              id="email" 
              label="Email" 
              variant="outlined" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: '1rem' }} 
            />
            <TextField 
              id="password" 
              label="Password" 
              variant="outlined" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: '1rem' }} 
            />
          </div>

          <Button 
            variant="contained" 
            endIcon={<SendIcon />} 
            sx={{ marginTop: '1rem' }}
            type="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>

          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </Box>
    </>
  );
};

export default Signup;
