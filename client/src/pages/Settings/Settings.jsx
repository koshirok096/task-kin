import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Navbar from "../../components/Navbar/Navbar";
import CreateInvitationModal from '../../components/CreateInvitationModal/CreateInvitationModal'
import styles from "./Settings.module.css";

export default function Settings() {
  const [OpenCreateInvitationModal, setOpenCreateInvitationModal] = React.useState(false);
  const handleCreateInvitationClick = () => setOpenCreateInvitationModal(true);
  const handleCreateInvitationClose = () => setOpenCreateInvitationModal(false);

  return (
    <>
        <Navbar />
        <Box className={styles.main_wrapper}>
          <div>Settings</div>
          <Button variant="outlined" onClick={handleCreateInvitationClick}>Create Invitation</Button>
          <CreateInvitationModal open={OpenCreateInvitationModal} onClose={handleCreateInvitationClose} />
        </Box>

    </>
  )
}
