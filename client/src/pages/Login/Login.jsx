import { Link } from "react-router-dom";
import styles from "./Login.module.css";

// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../slices/authSlice';
import axios from 'axios'; // Import axios


const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(state => state.auth.token !== null);


	useEffect(() => {
	  // ログイン済みの場合、他の画面にリダイレクトなど
	  if (isLoggedIn) {
		console.log('User is already logged in');
		// 例えば、ログイン後の画面にリダイレクトなどの処理をここに書く
	}
	}, [isLoggedIn]);
  
  
	const handleSubmit = async (e) => {
		e.preventDefault();
	
		dispatch(loginStart()); // ローディング状態を設定
	
		try {
		  const response = await axios.post('http://localhost:3001/auth/login', {
			email,
			password,
		  });
	
		  const data = response.data;
	
		  if (response.status === 200) {
			dispatch(loginSuccess(data)); // ログイン成功アクションをディスパッチ
			console.log('Login successful!');
			// 例えば、ログイン後の画面にリダイレクトなどの処理をここに書く
		  } else {
			dispatch(loginFailure(data.message)); // ログイン失敗アクションをディスパッチ
			console.log('Login failed:', data.message);
		  }
		} catch (error) {
		  dispatch(loginFailure('An error occurred'));
		  console.error('An error occurred:', error);
		}
	  };
	
	return (
	  <div>
		<h2>Login</h2>
		<form onSubmit={handleSubmit}>
		  <input
			type="text"
			placeholder="Email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			required
		  />
		  <input
			type="password"
			placeholder="Password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			required
		  />
		  <button type="submit">Login</button>
		</form>
	  </div>
	);
  };
  
  export default Login; // ここで export する
	

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