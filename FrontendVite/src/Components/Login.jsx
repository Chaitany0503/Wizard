// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   AppBar,
//   Toolbar,
//   Container,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import { login } from "../lib/api-wizard";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [open,setOpen] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     if (!username || !password) {
//       setError("Please fill all fields.");
//       return;
//     }
//     try {
//       const response = await login({ username, password });
//       if (response.data.success) {
//         // console.log("Response:", response.data);
//         const username = response.data.result.username;
//         const uid = response.data.result.id;

//         // toast.success("User Login Successful", { position: "top-center" });
//         toast.success("User Login Successful", {
//           position: "top-center",
//           style: {
//             fontSize: "0.75rem", // Small text
//             padding: "6px 12px", // Compact size
//             minWidth: "200px", // Ensures smaller width
//           },
//           className: "custom-toast", // Custom class for more styling
//         });
//         localStorage.setItem("login", true);
//         localStorage.setItem("username", username);
//         localStorage.setItem("uid", uid);
//         // setOpen(true);
//         navigate("/profile");
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       // console.log(error.message);
//       toast.error("User not found", { position: "top-center" });
//     }
//   };

//   return (
//     <Box sx={{ bgcolor: "whitesmoke", minHeight: "100vh" }}>
//       {/* AppBar Header */}
//       <AppBar position="static" sx={{ bgcolor: "#2E3B55", boxShadow: 3 }}>
//         <Toolbar>
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: "bold", color: "white", flexGrow: 1 }}
//           >
//             Login to Your Account
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Main Content */}
//       <Container
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "85vh",
//         }}
//       >
//         <Card sx={{ width: 380, p: 4, borderRadius: 3, boxShadow: 5 }}>
//           <CardContent
//             sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//           >
//             <Typography
//               variant="h5"
//               sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
//             >
//               Login
//             </Typography>

//             {/* Username Field */}
//             <TextField
//               fullWidth
//               size="small"
//               type="text"
//               label="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               sx={{ mb: 1 }}
//             />

//             {/* Password Field */}
//             <TextField
//               fullWidth
//               size="small"
//               type="password"
//               label="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             {/* Error Message */}
//             {error && (
//               <Typography
//                 color="error"
//                 sx={{ mt: 1, textAlign: "center", fontSize: "0.9rem" }}
//               >
//                 {error}
//               </Typography>
//             )}

//             {/* Login Button */}
//             <Button
//               variant="contained"
//               fullWidth
//               color="success"
//               onClick={handleSubmit}
//               sx={{ mt: 2 }}
//             >
//               Login
//             </Button>

//             {/* Register Link */}
//             <Typography sx={{ textAlign: "center", mt: 2 }}>
//               New User? <Link to={"/Register"}>Register</Link>
//             </Typography>

            
//           </CardContent>
//         </Card>
//       </Container>
//       <Snackbar
//         open={open}
//         autoHideDuration={3000} // Closes after 3 seconds
//         onClose={() => setOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position
//       >
//         <Alert
//           onClose={() => setOpen(false)}
//           severity="success"
//           variant="filled" // Filled background
//           sx={{ fontSize: "0.75rem", padding: "4px 12px", minWidth: "200px" }}
//         >
//           User Login Successfully...!
//         </Alert>
//       </Snackbar>
      
//     </Box>
//   );
// }


// // 2nd code
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   AppBar,
//   Toolbar,
//   Container,
//   Fade,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { login } from "../lib/api-wizard";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Check if user is already logged in
//   useEffect(() => {
//     if (localStorage.getItem("login")) {
//       navigate("/profile");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
    
//     if (!username || !password) {
//       setError("Please fill all fields.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await login({ username, password });
      
//       if (response.data.success) {
//         const { username: responseUsername, id: uid } = response.data.result;
        
//         toast.success("Login Successful", {
//           position: "top-center",
//           style: {
//             backgroundColor: "#60b9bc",
//             color: "#000",
//             fontSize: "0.875rem",
//             padding: "8px 16px",
//             borderRadius: "4px",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           },
//         });
        
//         localStorage.setItem("login", true);
//         localStorage.setItem("username", responseUsername);
//         localStorage.setItem("uid", uid);
//         navigate("/profile");
//       } else {
//         setError(response.data.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       setError("Invalid credentials or server error");
//       toast.error("Login Failed", {
//         position: "top-center",
//         style: {
//           backgroundColor: "#ffebee",
//           color: "#d32f2f",
//           fontSize: "0.875rem",
//         },
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSubmit(e);
//     }
//   };

//   return (
//     <Box sx={{ 
//       bgcolor: "#f5f5f5", 
//       minHeight: "100vh",
//       background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
//     }}>
//       {/* AppBar Header */}
//       <AppBar position="static" sx={{ 
//         bgcolor: "black", 
//         boxShadow: "none",
//         borderBottom: "1px solid rgba(96, 185, 188, 0.2)",
//       }}>
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           <Typography
//             variant="h6"
//             sx={{ 
//               fontWeight: 700, 
//               color: "#60b9bc",
//               letterSpacing: "0.5px",
//             }}
//           >
//             CodeEditor Pro
//           </Typography>
//           <Button 
//             component={Link} 
//             to="/register"
//             sx={{ 
//               color: "#60b9bc",
//               border: "1px solid #60b9bc",
//               borderRadius: "20px",
//               px: 3,
//               "&:hover": {
//                 bgcolor: "rgba(96, 185, 188, 0.1)",
//               }
//             }}
//           >
//             Sign Up
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Main Content */}
//       <Container maxWidth="sm" sx={{ py: 8 }}>
//         <Fade in={true} timeout={500}>
//           <Card sx={{ 
//             borderRadius: "12px",
//             boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//             overflow: "hidden",
//             border: "1px solid rgba(96, 185, 188, 0.3)",
//           }}>
//             <Box sx={{
//               height: "4px",
//               bgcolor: "#60b9bc",
//               width: "100%",
//             }} />
            
//             <CardContent sx={{ p: 4 }}>
//               <Typography
//                 variant="h4"
//                 sx={{ 
//                   fontWeight: 700, 
//                   textAlign: "center", 
//                   mb: 3,
//                   color: "black",
//                 }}
//               >
//                 Welcome Back
//               </Typography>
              
//               <Typography 
//                 variant="body2" 
//                 sx={{ 
//                   textAlign: "center", 
//                   mb: 4,
//                   color: "text.secondary",
//                 }}
//               >
//                 Sign in to access your code editor and projects
//               </Typography>

//               <Box component="form" onSubmit={handleSubmit}>
//                 {/* Username Field */}
//                 <TextField
//                   fullWidth
//                   size="medium"
//                   type="text"
//                   label="Username"
//                   variant="outlined"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   sx={{ mb: 3 }}
//                   InputProps={{
//                     sx: {
//                       borderRadius: "8px",
//                       "& fieldset": {
//                         borderColor: "rgba(0, 0, 0, 0.23)",
//                       },
//                       "&:hover fieldset": {
//                         borderColor: "#60b9bc !important",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#60b9bc !important",
//                         borderWidth: "1px",
//                       },
//                     },
//                   }}
//                   InputLabelProps={{
//                     sx: {
//                       "&.Mui-focused": {
//                         color: "#60b9bc",
//                       },
//                     },
//                   }}
//                 />

//                 {/* Password Field */}
//                 <TextField
//                   fullWidth
//                   size="medium"
//                   type={showPassword ? "text" : "password"}
//                   label="Password"
//                   variant="outlined"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                           sx={{ color: "rgba(0, 0, 0, 0.54)" }}
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                     sx: {
//                       borderRadius: "8px",
//                       "& fieldset": {
//                         borderColor: "rgba(0, 0, 0, 0.23)",
//                       },
//                       "&:hover fieldset": {
//                         borderColor: "#60b9bc !important",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#60b9bc !important",
//                         borderWidth: "1px",
//                       },
//                     },
//                   }}
//                   InputLabelProps={{
//                     sx: {
//                       "&.Mui-focused": {
//                         color: "#60b9bc",
//                       },
//                     },
//                   }}
//                 />

//                 {/* Forgot Password Link */}
//                 <Box sx={{ textAlign: "right", mt: 1 }}>
//                   <Link 
//                     to="/forgot-password" 
//                     style={{ 
//                       color: "#60b9bc",
//                       fontSize: "0.875rem",
//                       textDecoration: "none",
//                       "&:hover": {
//                         textDecoration: "underline",
//                       },
//                     }}
//                   >
//                     Forgot password?
//                   </Link>
//                 </Box>

//                 {/* Error Message */}
//                 {error && (
//                   <Typography
//                     color="error"
//                     sx={{ 
//                       mt: 2, 
//                       textAlign: "center", 
//                       fontSize: "0.875rem",
//                       bgcolor: "rgba(255, 0, 0, 0.05)",
//                       p: 1,
//                       borderRadius: "4px",
//                     }}
//                   >
//                     {error}
//                   </Typography>
//                 )}

//                 {/* Login Button */}
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   fullWidth
//                   disabled={isLoading}
//                   sx={{ 
//                     mt: 3,
//                     py: 1.5,
//                     borderRadius: "8px",
//                     bgcolor: "#60b9bc",
//                     color: "black",
//                     fontWeight: 600,
//                     textTransform: "none",
//                     fontSize: "1rem",
//                     "&:hover": {
//                       bgcolor: "#4ea5a8",
//                       boxShadow: "0 4px 12px rgba(96, 185, 188, 0.3)",
//                     },
//                     "&:disabled": {
//                       bgcolor: "rgba(96, 185, 188, 0.5)",
//                     },
//                   }}
//                 >
//                   {isLoading ? "Signing In..." : "Sign In"}
//                 </Button>

//                 {/* Divider */}
//                 <Box sx={{ 
//                   display: "flex", 
//                   alignItems: "center", 
//                   my: 3,
//                   color: "text.secondary",
//                 }}>
//                   <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
//                   <Typography variant="body2" sx={{ px: 2 }}>OR</Typography>
//                   <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
//                 </Box>

//                 {/* Social Login Options */}
//                 <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     sx={{ 
//                       borderRadius: "8px",
//                       py: 1.5,
//                       borderColor: "rgba(0, 0, 0, 0.23)",
//                       color: "text.primary",
//                       "&:hover": {
//                         borderColor: "#60b9bc",
//                         bgcolor: "rgba(96, 185, 188, 0.05)",
//                       },
//                     }}
//                   >
//                     Google
//                   </Button>
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     sx={{ 
//                       borderRadius: "8px",
//                       py: 1.5,
//                       borderColor: "rgba(0, 0, 0, 0.23)",
//                       color: "text.primary",
//                       "&:hover": {
//                         borderColor: "#60b9bc",
//                         bgcolor: "rgba(96, 185, 188, 0.05)",
//                       },
//                     }}
//                   >
//                     GitHub
//                   </Button>
//                 </Box>

//                 {/* Register Link */}
//                 <Typography 
//                   variant="body2" 
//                   sx={{ 
//                     textAlign: "center", 
//                     mt: 2,
//                     color: "text.secondary",
//                   }}
//                 >
//                   Don't have an account?{" "}
//                   <Link 
//                     to="/register" 
//                     style={{ 
//                       color: "#60b9bc",
//                       fontWeight: 600,
//                       textDecoration: "none",
//                       "&:hover": {
//                         textDecoration: "underline",
//                       },
//                     }}
//                   >
//                     Create one
//                   </Link>
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Fade>
//       </Container>
//     </Box>
//   );
// }

//3rd code 

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Container,
  Alert,
  Snackbar,
  CssBaseline,
} from "@mui/material";
import { login } from "../lib/api-wizard";

export default function Login() {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Please fill all fields.");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await login({ username, password });
      if (response.data.success) {
        const { username: responseUsername, id: uid } = response.data.result;
        
        toast.success("User Login Successful", {
          position: "top-center",
          style: {
            fontSize: "0.75rem",
            padding: "6px 12px",
            minWidth: "200px",
            backgroundColor: "#43989b",
            color: "#fff",
          },
        });
        
        localStorage.setItem("login", true);
        localStorage.setItem("username", responseUsername);
        localStorage.setItem("uid", uid);
        navigate("/profile");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      toast.error("User not found", { 
        position: "top-center",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        }
      });
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
        {/* AppBar Header */}
        <AppBar 
          position="static" 
          sx={{ 
            bgcolor: "black", 
            boxShadow: 3,
            mb: 4
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: "bold", 
                color: "#8fcccf", 
                flexGrow: 1,
                fontFamily: "'Roboto', sans-serif",
                letterSpacing: 1
              }}
            >
              Code Wizard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container
          maxWidth="xs"
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
            maxWidth: 400,
            borderRadius: 2, 
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}>
            <Box sx={{
              bgcolor: "#60b9bc",
              height: 5,
              width: "100%",
            }} />
            
            <CardContent sx={{ 
              p: 4,
              display: "flex", 
              flexDirection: "column", 
              gap: 3 
            }}>
              <Typography
                variant="h5"
                sx={{ 
                  fontWeight: 600, 
                  textAlign: "center", 
                  mb: 1,
                  color: "black",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                Welcome Back
              </Typography>
              
              <Typography
                variant="body2"
                sx={{ 
                  textAlign: "center", 
                  mb: 3,
                  color: "text.secondary",
                }}
              >
                Sign in to continue to Code Wizard
              </Typography>

              {/* Username Field */}
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    borderRadius: 1,
                  }
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                size="small"
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                InputProps={{
                  sx: {
                    borderRadius: 1,
                  }
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />

              {/* Error Message */}
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mt: 1,
                    fontSize: "0.75rem",
                    py: 0.5,
                  }}
                >
                  {error}
                </Alert>
              )}

              {/* Login Button */}
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={isLoading}
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  borderRadius: 1,
                  bgcolor: "#43989b",
                  "&:hover": {
                    bgcolor: "#60b9bc",
                  },
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              {/* Register Link */}
              <Typography 
                variant="body2" 
                sx={{ 
                  textAlign: "center", 
                  mt: 2,
                  color: "text.secondary",
                }}
              >
                Don't have an account?{" "}
                <Link 
                  to="/Register" 
                  style={{ 
                    color: "#43989b",
                    fontWeight: 500,
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    }
                  }}
                >
                  Create one
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Container>
        
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            variant="filled"
            sx={{ 
              fontSize: "0.75rem", 
              padding: "4px 12px", 
              minWidth: "200px",
              bgcolor: "#43989b",
            }}
          >
            User Login Successfully...!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}