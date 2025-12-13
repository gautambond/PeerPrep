import { useState, useContext } from "react";
import { login } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box
} from "@mui/material";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("FORM DATA:", form); // 🔥 Debug: Check sent email/password

    try {
      const res = await login(form);

      console.log("LOGIN RESPONSE:", res.data); // 🔥 Debug

      loginUser(res.data);

      const role = res.data.user.role;

      if (role === "student") window.location.href = "/student";
      else if (role === "instructor") window.location.href = "/instructor";
      else if (role === "admin") window.location.href = "/admin";
      else window.location.href = "/";
      
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={submit}>

            {/* EMAIL INPUT */}
            <TextField
              label="Email"
              fullWidth
              sx={{ mb: 2 }}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            {/* PASSWORD INPUT */}
            <TextField
              label="Password"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>

          {/* Register link */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <a
                href="/register"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Register here
              </a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
