import { Container, Typography } from "@mui/material";

export default function ContactPage() {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3">Contact Us</Typography>

      <Typography sx={{ mt: 2 }}>
        Email: support@example.com  
        <br />
        Phone: +91-9876543210
      </Typography>
    </Container>
  );
}
