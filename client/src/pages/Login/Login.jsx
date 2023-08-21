import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../slices/authSlice';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Include useNavigate and useLocation
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.token !== null);
  const navigate = useNavigate(); // Get the navigate object
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      console.log('User is already logged in');
      if (location.state && location.state.loginSuccess) {
        console.log('User logged in:', location.state.user);
      }
    }
  }, [isLoggedIn, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
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
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      dispatch(loginFailure('An error occurred'));
      console.error('An error occurred:', error);
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
        <div className={styles.login_wrapper}>
          <h1>Login</h1>
          <div>
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

          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </Box>
    </>
  );
};

export default Login;

	

// const Login = () => {
//     const googleAuth = () => {
// 		window.open(
// 			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
// 			"_self"
// 		);
// 	};
// 	return (
// 		<div className={styles.container}>
// 			<h1 className={styles.heading}>Log in Form</h1>
// 			<div className={styles.form_container}>
// 				<div className={styles.left}>
// 					<img className={styles.img} src="./images/login.jpg" alt="login" />
// 				</div>
// 				<div className={styles.right}>
// 					<h2 className={styles.from_heading}>Members Log in</h2>
// 					<input type="text" className={styles.input} placeholder="Username" />
// 					<input type="text" className={styles.input} placeholder="Password" />
// 					<button className={styles.btn}>Log In</button>
// 					<p className={styles.text}>or</p>
// 					<button className={styles.google_btn} onClick={googleAuth}>
// 						<img src="./images/google_icon.png" alt="google icon" />
// 						<span>Sing in with Google</span>
// 					</button>
// 					<p className={styles.text}>
// 						New Here ? <Link to="/signup">Sing Up</Link>
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Login