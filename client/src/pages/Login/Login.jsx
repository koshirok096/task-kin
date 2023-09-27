import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../slices/authSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import styles from "./Login.module.css";
import mainLogo from "../../images/main-logo.png"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add this state for login error

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error message
    setError('');

    let formIsValid = true;

    if (!email) {
      setError('Email is required.');
      formIsValid = false;
    }

    if (!password) {
      setError('Password is required.');
      formIsValid = false;
    }

    if (formIsValid) {
      dispatch(loginStart());

      try {
        const response = await axios.post('https://task-kin.onrender.com/auth/login', {
          email,
          password,
        });

        const data = response.data;

        if (response.status === 200) {
          dispatch(loginSuccess(data));
          console.log('Login successful!', data);
          navigate('/', { state: { loginSuccess: true, user: data.user } });
        } else {
          dispatch(loginFailure(data.message));
          setError('Invalid email or password.'); // Set login error message
          console.log('Login failed:', data.message);
        }
      } catch (error) {
        dispatch(loginFailure('An error occurred'));
        setError('An error occurred during login.'); // Set login error message
        console.error('An error occurred:', error);
      }
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
        <div className={styles.leftwrapper}></div>
        <div className={styles.login_wrapper}>
          <div className={styles.logo_wrapper}>
            <img src={mainLogo} alt="Logo" />
            <h2>Task-Kin</h2>
          </div>
          <h1>Login</h1>
          <div style={{display:"flex", flexDirection:"column", width:"270px"}}>
            <TextField 
              id="outlined-basic" 
              label="Email" 
              variant="outlined" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: '1rem' }} 
            />
            <TextField 
              id="outlined-basic" 
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
            Login
          </Button>

          {error && <p className={styles.error_message}>{error}</p>} {/* Display login error message */}
          <p>Don't have an account? <Link to="/signup" style={{color:"blue"}}>Sign up</Link></p>
        </div>
      </Box>
    </>
  );
};

export default Login;
