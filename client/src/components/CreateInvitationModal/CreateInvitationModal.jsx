import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, TextField } from '@mui/material';

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

export default function OpenCreateInvitationModal({ open, onClose }) {
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Create Invitation
          </Typography>
          <Typography sx={{ mt: 2 }}>
            You can invite your friend/family to a group/groups you belong to.
          </Typography>
          <h4>Who would you like to invite?</h4>
          <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            type="email"
            sx={{ marginBottom: '1rem' }} 
          />
          <h4>To which group(s)?</h4>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Group-title-1" />
            <FormControlLabel control={<Checkbox />} label="Group-title-2" />
          </FormGroup>
          <Button variant="contained" color="success" sx={{ marginTop: '1rem' }}>Invite</Button>
          
        </Box>
      </Modal>
    );
  }
  
  
  
  
  
  
  