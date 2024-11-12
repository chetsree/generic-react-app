import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  Container,
  Box,
  Link,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email address");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      const { message, data, user } = response.data;

      if (message === "Login successful") {
        localStorage.setItem("authToken", data);
        localStorage.setItem("loggedIn", "true");
        setSuccessMessage(`Login successful! Welcome, ${user.name}`);
        setErrorMessage("");
        setEmailError("");
        setPasswordError("");

        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        const { error: backendError } = error.response.data;
        if (backendError === "Invalid password") {
          setPasswordError("Password is not correct");
          setErrorMessage("");
        } else {
          setErrorMessage(backendError);
        }
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      if (!validateEmail(e.target.value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }
    if (e.target.name === "password") {
      setPasswordError("");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Card
            sx={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              p: 3,
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6">Log in to your account</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                {errorMessage && (
                  <Alert variant="filled" severity="error">
                    {errorMessage}
                  </Alert>
                )}
                {successMessage && (
                  <Alert variant="filled" severity="success">
                    {successMessage}
                  </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        error={!!emailError}
                        helperText={emailError}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        error={!!passwordError}
                        helperText={passwordError}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Log In
                      </Button>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/signup" variant="body2">
                          Don't have an account? Sign Up
                        </Link>
                        <Link href="/sample" variant="body2">
                          go to sample
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
