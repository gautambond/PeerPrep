import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Avatar
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const drawerWidth = 240;

export default function Layout({ menu = [], children }) {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>

          {/* SAFE MENU LOOP */}
          {Array.isArray(menu) &&
            menu.map((item) => (
              <ListItemButton
                key={item.label}
                onClick={() => navigate(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}

          {/* LOGOUT */}
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>

        </List>
      </Drawer>

      {/* TOPBAR */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ zIndex: 1300 }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* LEFT SIDE TITLE */}
            <Typography variant="h6">Mentoring Platform</Typography>

            {/* RIGHT SIDE USER PROFILE */}
            {user && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ textAlign: "right", color: "white" }}>
                  <Typography sx={{ fontSize: "14px" }}>
                    {user.name}
                  </Typography>

                  <Typography sx={{ fontSize: "12px", opacity: 0.8 }}>
                    {user.role.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <Toolbar />

        {/* MAIN PAGE CONTENT */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
