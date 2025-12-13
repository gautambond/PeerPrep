import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

// ⭐ Import global navbar
import Navbar from "../components/Navbar";

// ⭐ Import images properly
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo1.jpg";
import photo3 from "../assets/photo1.jpg";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* GLOBAL NAVBAR */}
      

      {/* HERO SECTION */}
      <Box sx={{ textAlign: "center", mt: 10, px: 2 }}>
        <Typography variant="h3" fontWeight="bold">
          Welcome to Mentoring Platform
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
          Learn from the best instructors. Watch videos, access notes & grow your skills.
        </Typography>

        <Box
          sx={{
            mt: 5,
            display: "inline-block",
            px: 4,
            py: 1.5,
            bgcolor: "primary.main",
            color: "white",
            borderRadius: 2,
            fontSize: "18px",
            cursor: "pointer",
            transition: "0.3s",
            ":hover": { bgcolor: "primary.dark" },
          }}
          onClick={() => navigate("/student")}
        >
          Explore Courses
        </Box>
      </Box>

      {/* FEATURE CARDS SECTION */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          mt: 10,
          px: 5,
          flexWrap: "wrap",
        }}
      >
        {/* Feature 1 */}
        <Card sx={{ width: 300 }}>
          <CardMedia component="img" height="180" image={photo1} alt="Learn Anytime" />
          <CardContent>
            <Typography variant="h6" textAlign="center">
              Learn Anytime
            </Typography>
            <Typography textAlign="center" color="gray">
              Access your content anywhere, anytime.
            </Typography>
          </CardContent>
        </Card>

        {/* Feature 2 */}
        <Card sx={{ width: 300 }}>
          <CardMedia component="img" height="180" image={photo2} alt="Expert Instructors" />
          <CardContent>
            <Typography variant="h6" textAlign="center">
              Expert Instructors
            </Typography>
            <Typography textAlign="center" color="gray">
              Learn directly from industry experts.
            </Typography>
          </CardContent>
        </Card>

        {/* Feature 3 */}
        <Card sx={{ width: 300 }}>
          <CardMedia component="img" height="180" image={photo3} alt="Grow Skills" />
          <CardContent>
            <Typography variant="h6" textAlign="center">
              Grow Your Skills
            </Typography>
            <Typography textAlign="center" color="gray">
              Improve your knowledge with structured lessons.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
