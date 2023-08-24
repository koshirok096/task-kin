import React, { useState, useEffect } from 'react';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Avatar from "@mui/material/Avatar";
import { lightBlue } from "@mui/material/colors";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import styles from "./Navbar.module.css";

import mainLogo from "../../images/main-logo.png"; // Tell webpack this JS file uses this image
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice"; // authSliceからlogoutアクションをインポート

import Button from "@mui/material/Button";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import AddHomeIcon from '@mui/icons-material/AddHome';
import CreateInvitationModal from "../CreateInvitationModal/CreateInvitationModal";
import CreateGroupModal from "../CreateGroupModal/CreateGroupModal";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



const Navbar = React.memo(() => {
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false);
  const dispatch = useDispatch(); // useDispatch フックを使用
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openanchor = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((state) => state.auth.user);
  const token = useSelector(state => state.auth.token);


  //
  const [OpenCreateInvitationModal, setOpenCreateInvitationModal] =
    React.useState(false);
  const handleCreateInvitationClick = () => setOpenCreateInvitationModal(true);
  const handleCreateInvitationClose = () => setOpenCreateInvitationModal(false);

  const [OpenCreateGroupModal, setOpenCreateGroupModal] = React.useState(false);

  const handleCreateGroupClick = () => setOpenCreateGroupModal(true);
  const handleCreateGroupClose = () => setOpenCreateGroupModal(false);

  
  // アカウント設定メニューを開くハンドラ
  const handleAccountMenuOpen = () => {
    setAccountMenuOpen(true);
  };

  // アカウント設定メニューを閉じるハンドラ
  const handleAccountMenuClose = () => {
    setAccountMenuOpen(false);
  };

  const [uncompletedTodos, setUncompletedTodos] = useState(null);
  const [remainingInvitation, setRemainingInvitation] = useState(null);

  const getUncompletedTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3001/todo/${user.group[0]}/inprogress`, {
        headers: {
          Authorization: `${token}` // ここに実際のトークンを追加
        }
      });
      const todo = await response.json();
      setUncompletedTodos(todo);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  const getRemainingInvitation = async () => {
    try {
      const response = await fetch(`http://localhost:3001/invite/${user.email}`, {
        headers: {
          Authorization: `${token}` // ここに実際のトークンを追加
        }
      });
      const invitations = await response.json();
  
      // フィルタリング: invitation.status が 'pending' のものだけ取得
      const pendingInvitations = invitations.filter(invitation => invitation.status === 'pending');
  
      setRemainingInvitation(pendingInvitations);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  useEffect(() => {
    getUncompletedTodos();
    getRemainingInvitation();
  }, []);
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(accountMenuOpen && { display: "none" }), // アカウント設定メニューが開いている間もハンバーガーメニューを非表示に
            }}>
            <MenuIcon />
          </IconButton>
          <Typography
            className={styles.header_wrapper}
            variant="h6"
            noWrap
            component="div">
            <img className={styles.header_img} src={mainLogo} alt="Logo" />
            Task-Kin
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem 0 1rem auto",
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}>
              {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
              <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
      {/* Badge for uncompletedTodos */}
              <Link to="/todolist">
                <Badge badgeContent={uncompletedTodos?.length || 0} color="error">
                  <FormatListBulletedIcon color="action" />
                </Badge>
              </Link>
              {/* Badge for remainingInvitation */}
              <Link to="/settings">
                <Badge badgeContent={remainingInvitation?.length || 0} sx={{ paddingLeft: '1rem'}} color="error">
                  <NotificationsIcon color="action" />
                </Badge>
              </Link>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openanchor ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openanchor ? "true" : undefined}>
                  <Avatar
                    alt={user.username.toUpperCase()}
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: lightBlue[200],
                    }}></Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openanchor}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              <Link to="/settings">
                <MenuItem onClick={handleClose}>
                  <Avatar alt={user.username.toUpperCase()} />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      marginLeft: "1rem",
                    }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {user.username}
                    </Typography>
                    <Typography sx={{ color: "gray" }}>{user.email}</Typography>
                  </Box>
                </MenuItem>
              </Link>
              <Divider />
              <div onClick={handleCreateGroupClick} style={{paddingTop: "8px",}}>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AddHomeIcon fontSize="small" />
                  </ListItemIcon>
                  Create New Group
                </MenuItem>
              </div>
              <MenuItem onClick={handleClose}>
                <div onClick={handleCreateInvitationClick}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add Member to Your Group
                </div>
              </MenuItem>
              <Link to="/settings">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* SIDEBAR */}

        <List className={styles.sidebar}>
          <Link to="/">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/todolist">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="Todo" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/calendar">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Calendar"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/settings">
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph></Typography>
        <Typography paragraph></Typography>
      </Box>
      <CreateInvitationModal
        open={OpenCreateInvitationModal}
        onClose={handleCreateInvitationClose}
      />
      <CreateGroupModal
        open={OpenCreateGroupModal}
        onClose={handleCreateGroupClose}
      />
    </Box>
  );
});

export default Navbar;

