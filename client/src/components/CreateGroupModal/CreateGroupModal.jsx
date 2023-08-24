import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom'; // Include useNavigate and useLocation
import axios from 'axios';
import Modal from '@mui/material/Modal';
import styles from "./CreateGroupModal.module.css";
import { useSelector } from 'react-redux';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateGroupModal({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const token = useSelector(state => state.auth.token);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission here, e.g., dispatch an action to create the todo item
  // };
  
  const createGroup = async () => {

    try {
      const res = await axios.post("http://localhost:3001/group/create", { name: title }, {
        headers: {
          "Authorization": token
        }
      })
      console.log(res);
    } catch (err) {
      console.error(err.message);
    }
  }


    return (
      <Modal open={open} onClose={onClose}>
        <Box
          className={styles.main_wrapper}
          component="form"        
         sx={{
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          margin: 'auto'
         }}
        marginBottom='1rem'
        noValidate
        autoComplete="off"
      >
    <div className={styles.form_wrapper}>
      <h1>Create Group</h1>
      <form
      //  onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <h4>Name the group?</h4>
        <TextField
          id="title"
          label="title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: '1rem' }}
          required
          type="title"
        />
        {/* <h4>Who would you like to invite?</h4> */}
        {/* <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: '1rem' }}
          type="email"
        /> */}
        <Button
          onClick={() => createGroup()}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ marginTop: '1rem' }}
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
      </Box>
      </Modal>
    );
  }
  
  
  
  
  
  
  