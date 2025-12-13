import { useState, useContext } from "react";
import { register } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem,
  CircularProgress,
  Box
} from "@mui/material";

export default function Register() {
  const { loginUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await register(form);
      loginUser(res.data);

      const role = res.data.user.role;

      if (role === "student") window.location.href = "/student";
      else if (role === "instructor") window.location.href = "/instructor";
      else if (role === "admin") window.location.href = "/admin";
    } catch (err) {
      console.log(err);
      setError("Registration failed. Try a different email.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Create Account
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={submit}>
            <TextField
              label="Full Name"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <TextField
              label="Email"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <TextField
              select
              label="Select Role"
              fullWidth
              sx={{ mb: 3 }}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </form>

          {/* 👉 Login Link */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <a
                href="/login"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Login here
              </a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
