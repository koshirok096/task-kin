import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import Navbar from "../../components/Navbar/Navbar";
import CreateInvitationModal from "../../components/CreateInvitationModal/CreateInvitationModal";
import CreateGroupModal from "../../components/CreateGroupModal/CreateGroupModal";
import styles from "./Settings.module.css";

import Switch from '@mui/material/Switch';


export default function Settings() {
  const [OpenCreateInvitationModal, setOpenCreateInvitationModal] =
    React.useState(false);
  const handleCreateInvitationClick = () => setOpenCreateInvitationModal(true);
  const handleCreateInvitationClose = () => setOpenCreateInvitationModal(false);

  const [OpenCreateGroupModal, setOpenCreateGroupModal] =
  React.useState(false);

  const handleCreateGroupClick = () => setOpenCreateGroupModal(true);
  const handleCreateGroupClose = () => setOpenCreateGroupModal(false);


  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <>
      <Navbar />
      <Box className={styles.main_wrapper}>
        {/* <div>Settings</div> */}
        <div className={styles.left_wrapper}>
          <h2>Invitation</h2>
          <div className={styles.section_wrapper}>
            <h3>Notification</h3>
            <Avatar alt="Invited User" src="/static/images/avatar/1.jpg" />
            <p>
              Hey! <i>invited user</i> ask you to join to <u>groupname</u>.
            </p>
            <div>
              <Button variant="outlined">Accept</Button>
              <Button variant="outlined">Decline</Button>
            </div>
          </div>
          <div className={styles.section_wrapper}>
          <h3>Invite User</h3>
            <p>Do you want to invite a new member to your group? Let's tell!</p>
            <Button variant="outlined" onClick={handleCreateInvitationClick}>
              Create Invitation
            </Button>
          </div>
          <div className={styles.section_wrapper}>
          <h3>Create Group</h3>
            <p>Do you want to create a new group? Let's do this!</p>
            <Button variant="outlined" onClick={handleCreateGroupClick}>
              Create Group
            </Button>
          </div>
          <h2>Settings</h2>
          <div className={styles.switch_wrapper}>
          <Switch {...label} defaultUnchecked />
            Enable Darkmode
          </div>
        </div>
        <div className={styles.right_wrapper}>
          <Avatar 
            alt="Koshiro Kiyota" 
            src="/static/images/avatar/1.jpg" 
            className={styles.avatar_wrapper}
            sx={{ width: 100, height: 100, fontSize: 48 }} 
          />
          <h2>Koshiro Kiyota</h2>
          <p>koshiro@example.com</p>
          <div className={styles.groupbox}>Group A</div>
        </div>
        <CreateInvitationModal
          open={OpenCreateInvitationModal}
          onClose={handleCreateInvitationClose}
        />
        <CreateGroupModal
          open={OpenCreateGroupModal}
          onClose={handleCreateGroupClose}
        />

      </Box>
    </>
  );
}
