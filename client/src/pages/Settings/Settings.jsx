import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { lightBlue } from '@mui/material/colors';

import Navbar from "../../components/Navbar/Navbar";
import CreateInvitationModal from "../../components/CreateInvitationModal/CreateInvitationModal";
import CreateGroupModal from "../../components/CreateGroupModal/CreateGroupModal";
import styles from "./Settings.module.css";

import Switch from '@mui/material/Switch';
import { useSelector } from "react-redux";

import axios from "axios"; // Import Axios for making HTTP requests



export default function Settings({ remainingInvitation, uncompletedTodos }) {
  const [OpenCreateInvitationModal, setOpenCreateInvitationModal] =
    React.useState(false);
  const handleCreateInvitationClick = () => setOpenCreateInvitationModal(true);
  const handleCreateInvitationClose = () => setOpenCreateInvitationModal(false);

  const [OpenCreateGroupModal, setOpenCreateGroupModal] =
  React.useState(false);

  const handleCreateGroupClick = () => setOpenCreateGroupModal(true);
  const handleCreateGroupClose = () => setOpenCreateGroupModal(false);

  const [group, setGroup] = useState(null);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  const [invitations, setInvitations] = useState([]);

  const getGroup = async () => {
    try {
      const response = await fetch(`http://localhost:3001/group/${user.group[0]}`, {
        headers: {
          Authorization: `${token}` // Here
        }
      });
      const data = await response.json();
      setGroup(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };  



  useEffect(() => {
    if (user) {
      const fetchInvitations = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/invite/${user.email}`
          );
          const invitationsData = response.data; // Assuming the response contains invitation data
          console.log("Fetched my invitations:", invitationsData); // Log fetched invitations
          setInvitations(invitationsData); // Store the invitations in state
        } catch (error) {
          console.error("Error fetching invitations:", error);
        }
      };
      fetchInvitations();
    }
  }, [user]);

  const handleInvitation = async (yourResponse, invitationId) => {
    console.log("Invitation ID:", invitationId);
    console.log("Your response:", yourResponse);

    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(`http://localhost:3001/invite/${invitationId}/${yourResponse}`);
      console.log(response);
    } catch (error) {}
  }

  useEffect(() => {
    // Fetch the user's group information when the component mounts
    getGroup();
  }, []);

  return (
    <>
      <Box className={styles.main_wrapper}>
        {/* <div>Settings</div> */}
        <div className={styles.left_wrapper}>
          <h2>Invitation</h2>
          {invitations.map((invitation, index) => (
            invitation.status === "pending" && (
              <div key={index} className={styles.section_wrapper}>
              <Avatar 
                alt="Invited User" 
                src={invitation.avatarSrc} // Replace with the actual avatar source from the invitation data
                sx={{ width: 40, height: 40, bgcolor: lightBlue[200] }} 
              />
              <p>
                Hey! <i style={{color:'purple', fontWeight:'bold'}}>{invitation?.group?.name}</i> asked you to join <u>{invitation.groupName}</u>.
              </p>
              <div>
                <Button variant="outlined" onClick={() => handleInvitation("accept", invitation._id)}>Accept</Button>
                <Button variant="outlined" onClick={() => handleInvitation("reject", invitation._id)}>Decline</Button>
              </div>
            </div>
            )
          ))}
          <div className={styles.section_wrapper}>
          <h3>Invite User</h3>
            <p>Do you want to invite a new member to your group? Let's invite!</p>
            <Button variant="outlined" onClick={handleCreateInvitationClick}>
              Create Invitation
            </Button>
          </div>
          <div className={styles.section_wrapper}>
          <h3>Create Group</h3>
            <p>Do you want to create a new group? Let's make!</p>
            <Button variant="outlined" onClick={handleCreateGroupClick}>
              Create Group
            </Button>
          </div>
          <h2>Settings</h2>
          <div className={styles.switch_wrapper}>
          <Switch {...label} />
            Enable Darkmode
          </div>
        </div>
        <div className={styles.right_wrapper}>
          <Avatar 
            alt={user?.username.toUpperCase()} 
            src="/static/images/avatar/1.jpg" 
            className={styles.avatar_wrapper}
            sx={{ width: 100, height: 100, fontSize: 48, bgcolor: lightBlue[200] }}
          />
          <h2 style={{ marginBottom: '0'}}>{user?.username}</h2>
          <p>{user.email}</p>
          {/* <p>{user.description}</p> */}
          <div className={styles.groupbox}>{group?.name}</div>
        </div>
        <CreateInvitationModal
          open={OpenCreateInvitationModal}
          onClose={handleCreateInvitationClose}
          groupInfo={user && user.group[0]}
        />
        <CreateGroupModal
          open={OpenCreateGroupModal}
          onClose={handleCreateGroupClose}
        />

      </Box>
    </>
  );
}
