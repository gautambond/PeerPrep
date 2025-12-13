import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 5,
        py: 3,
        textAlign: "center",
        background: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Mentoring Platform
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        <Link href="/" underline="hover">Home</Link> |{" "}
        <Link href="/student" underline="hover">Courses</Link> |{" "}
        <Link href="/contact" underline="hover">Contact Us</Link>
      </Typography>

      <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
        Designed & Developed by Your Team 🚀
      </Typography>
    </Box>
  );
}
