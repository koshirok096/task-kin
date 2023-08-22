import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'; // Include useNavigate and useLocation

import Modal from '@mui/material/Modal';
import styles from "./CreateInvitationModal.module.css";


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

export default function CreateInvitationModal({ open, onClose }) {
  const [email, setEmail] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission here, e.g., dispatch an action to create the todo item
  // };


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
          <h1>Create Invitation</h1>
          <p>Send an invitation to your family/friend to join the group!</p>
          <form
          //  onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          >
            <h4>Who would you like to invite?</h4>
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: '1rem' }}
              required
              type="email"
            />
            <h4>To which group(s)?</h4>
            <FormControlLabel control={<Checkbox />} label="Group-title-1" />
            <FormControlLabel control={<Checkbox />} label="Group-title-2" />
            <Button
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
  
  
  
  
  
  
  