

//2nd code 

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Box, 
  Button, 
  Card, 
  TextField, 
  Typography, 
  AppBar, 
  Toolbar, 
  Container,
  Alert,
  CssBaseline,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getUserName, Registor } from "../lib/api-wizard";

export default function Registration() {
  const [error, setError] = useState("");
  const [usernameList, setUserNameList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    mobile: "",
  });

  const handleInput = (value, field) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    if (error) setError("");
  };

  const navigate = useNavigate();

  const fetchUsername = async () => {
    try {
      const response = await getUserName();
      setUserNameList(response.data.result);
    } catch (err) {
      console.error("Error fetching usernames:", err);
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetchUsername();
    
    const { name, mobile, email, username, password, confirmPassword } = formData;

    if (!name || !mobile || !email || !username || !password || !confirmPassword) {
      setError("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    const userExists = usernameList.some((u) => u.username.trim() === username.trim());
    if (userExists) {
      setError("Username already exists.");
      setIsLoading(false);
      return;
    }

    try {
      const updatedFormData = { ...formData, username: formData.username.trim() };
      const response = await Registor(updatedFormData);

      if (response.data.success) {
        toast.success("Registration Successful! Redirecting to login...", { 
          position: "top-center",
          style: {
            backgroundColor: "#43989b",
            color: "#fff",
          }
        });
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Registration Failed: " + response.data.message, { 
          position: "top-center",
          style: {
            backgroundColor: "#f44336",
            color: "#fff",
          }
        });
      }
    } catch (error) {
      toast.error(error.message || "Registration Failed", { 
        position: "top-center",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        }
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ 
        bgcolor: "#f5f5f5", 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* App Bar (Header) */}
        <AppBar position="static" sx={{ 
          bgcolor: "black", 
          boxShadow: 3,
          mb: 4
        }}>
          <Toolbar>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: "#8fcccf", 
              flexGrow: 1,
              fontFamily: "'Roboto', sans-serif",
              letterSpacing: 1
            }}>
              Code Wizard
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate("/login")}
              sx={{
                bgcolor: "#60b9bc",
                "&:hover": {
                  bgcolor: "#43989b",
                },
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Back to Login
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container 
          maxWidth="sm"
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            flexGrow: 1,
            py: 4,
          }}
        >
          <Card sx={{ 
            width: "100%", 
            maxWidth: 500,
            borderRadius: 2, 
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}>
            <Box sx={{
              bgcolor: "#60b9bc",
              height: 5,
              width: "100%",
            }} />
            
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                mb: 3, 
                textAlign: "center",
                color: "black",
                fontFamily: "'Roboto', sans-serif",
              }}>
                Create Your Account
              </Typography>

              <TextField
                fullWidth
                size="small"
                type="text"
                label="Full Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => handleInput(e.target.value, "name")}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { borderRadius: 1 }
                }}
              />
              
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Username"
                variant="outlined"
                value={formData.username}
                onChange={(e) => handleInput(e.target.value, "username")}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { borderRadius: 1 }
                }}
                helperText="Must be unique"
              />
              
              <TextField
                fullWidth
                size="small"
                type="email"
                label="Email"
                variant="outlined"
                value={formData.email}
                onChange={(e) => handleInput(e.target.value, "email")}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { borderRadius: 1 }
                }}
              />
              
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Mobile Number"
                variant="outlined"
                value={formData.mobile}
                onChange={(e) => handleInput(e.target.value, "mobile")}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { borderRadius: 1 },
                  inputProps: { maxLength: 10 }
                }}
                helperText="10 digits without country code"
              />
              
              <TextField
                fullWidth
                size="small"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                value={formData.password}
                onChange={(e) => handleInput(e.target.value, "password")}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { borderRadius: 1 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText="At least 6 characters"
              />
              
              <TextField
                fullWidth
                size="small"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={(e) => handleInput(e.target.value, "confirmPassword")}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { borderRadius: 1 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />

              {/* Error Message */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Buttons */}
              <Box sx={{ 
                display: "flex", 
                justifyContent: "space-between",
                gap: 2,
                mt: 3
              }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: 1,
                    bgcolor: "#43989b",
                    "&:hover": {
                      bgcolor: "#60b9bc",
                    },
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: 1,
                    borderColor: "#43989b",
                    color: "#43989b",
                    "&:hover": {
                      borderColor: "#60b9bc",
                      backgroundColor: "rgba(96, 185, 188, 0.08)",
                    },
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Login Instead
                </Button>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
}