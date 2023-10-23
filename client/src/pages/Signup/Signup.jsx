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
import loaderImage from '../../images/loader.gif'; // Replace with the actual path to your loader.gif
import mainLogo from "../../images/main-logo.png"; 


const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [signupMessage, setSignupMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);


    // バリデーション
    let formIsValid = true;

    if (!fullName) {
      setFullNameError('Full Name is required.');
      formIsValid = false;
    } else {
      setFullNameError('');
    }

    if (!username) {
      setUsernameError('Username is required.');
      formIsValid = false;
    } else {
      setUsernameError('');
    }

    if (!email) {
      setEmailError('Email is required.');
      formIsValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      formIsValid = false;
    } else {
      setPasswordError('');
    }

    if (formIsValid) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_PROD_API_URL}/auth/signup`, {
          fullName,
          username,
          email,
          password,
        });

      const data = response.data;

      if (response.status === 201) {
        console.log('Signup successful!', data);
        setSignupMessage('Signup successful! You can now log in.');
        
        setTimeout(() => {
          setIsSubmitting(false); // Enable the button after submission
          navigate('/login'); // Navigate to the login page
        }, 3000); // Set a delay of 3 seconds (adjust as needed)
      } else {
        console.log('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  } else {
    setIsSubmitting(false); // Enable the button after submission
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
        <div className={styles.signup_wrapper}>
        <div className={styles.logo_wrapper}>
            <img src={mainLogo} alt="Logo" />
            <h2>Task-Kin</h2>
          </div>
          <h1>Sign Up</h1>
          {signupMessage && <p className={styles.signup_message}>{signupMessage}</p>} {/* メッセージを表示 */}
          <div className={styles.fieldswrapper}>
            <TextField 
              className={styles.inputwrapper}
              id="fullName" 
              label="Full Name" 
              variant="outlined" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!fullNameError} // エラーがある場合は true
              helperText={fullNameError} // エラーメッセージを表示
              sx={{ marginBottom: '1rem' }} 
            />
            <TextField 
              className={styles.inputwrapper}
              id="userName" 
              label="User Name" 
              variant="outlined" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!usernameError}
              helperText={usernameError}
              sx={{ marginBottom: '1rem' }} 
            />
            <TextField 
              className={styles.inputwrapper}
              id="email" 
              label="Email" 
              variant="outlined" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{ marginBottom: '1rem' }} 
            />
            <TextField
              className={styles.inputwrapper} 
              id="password" 
              label="Password" 
              variant="outlined" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              sx={{ marginBottom: '1rem' }} 
            />
          </div>

          <Button 
            variant="contained" 
            endIcon={<SendIcon />} 
            sx={{ marginTop: '1rem' }}
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting} // Disable the button during submission
          >
  {isSubmitting ? (
    <>
      Signing up... <img src={loaderImage} alt="Loading..." width={24} height={24} />
    </>
  ) : (
    'Sign Up'
  )}
          </Button>

          <p>Already have an account? <Link to="/login" style={{color:"blue"}}>Login</Link></p>
        </div>
      </Box>
    </>
  );
};

export default Signup;
