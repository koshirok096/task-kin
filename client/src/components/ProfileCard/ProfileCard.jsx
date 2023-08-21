import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import styles from "./ProfileCard.module.css";
import Button from '@mui/material/Button';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function ProfileCard() {
  
  return (
    <>
      <Box
        className={styles.profile_wrapper}
      >
        <Avatar {...stringAvatar('Tim Horton')} />
        <h3>Tim Horton</h3>
        <p>timhorton@example.com</p>
        <div className={styles.groups_wrapper}>
          <p>Groups:</p>
          <p className={styles.group}>
            Group-title-1
            <Button variant="outlined" color="secondary" sx={{ marginLeft: '1rem' }}>
              See More
              <RemoveRedEyeOutlinedIcon />
            </Button>
          </p>
          <p className={styles.group}>
            Group-title-2
            <Button variant="outlined" color="secondary" sx={{ marginLeft: '1rem' }}>
              See More
              <RemoveRedEyeOutlinedIcon />
            </Button>
          </p>
        </div>

      </Box>
    </>
  )
}