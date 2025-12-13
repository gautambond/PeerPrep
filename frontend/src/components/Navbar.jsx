import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* LEFT MENU */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Home
          </Typography>

          <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/student")}>
            Courses
          </Typography>

          <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/contact")}>
            Contact Us
          </Typography>
        </Box>

        {/* RIGHT: LOGIN OR USER PROFILE */}
        {!user ? (
          <IconButton
            color="inherit"
            onClick={() => navigate("/login")}
            sx={{
              width: 45,
              height: 45,
              border: "2px solid white",
              borderRadius: "50%",
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate(`/${user.role}`)} // Go to dashboard
          >
            <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography sx={{ fontSize: "14px", lineHeight: "14px" }}>
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
  );
}
