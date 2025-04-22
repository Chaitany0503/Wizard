// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Button, Card, CardContent, Typography, AppBar, Toolbar, Container, TextField } from "@mui/material";

// export default function Profile() {
//   const [userDetail, setUserDetail] = useState(null);
  
//   const navigate = useNavigate();

//   const login = localStorage.getItem("login");
//   const username = localStorage.getItem("username");
  
//   const handleLogOut = async () => {
//     try {localStorage.setItem("login", false);
//       localStorage.setItem("username", null);
//       navigate("/");
//       // localStorage.setItem("login", false);
//       // localStorage.setItem("username", null);
      
//     } catch (error) {
//       console.error("Logout Error:", error.message);
//     }
//   };
// const handleGoToMeet = () =>{
//   navigate("/meetHome");
// }
  

//   return (
//     <Box sx={{ bgcolor: "whitesmoke", minHeight: "100vh" }}>
//       {/* Header Bar */}
//       <AppBar position="static" sx={{ bgcolor: "#2E3B55", boxShadow: 3 }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
//             User Dashboard
//           </Typography>
//           {login ? (
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <Typography sx={{ color: "white", fontSize: "1rem" }}>{username}</Typography>
//               <Button variant="contained" color="error" onClick={handleLogOut}>
//                 Logout
//               </Button>
//             </Box>
//           ) : (
//              <Typography sx={{ color: "white" }}>Loading...</Typography>
//            )}
//         </Toolbar>
//       </AppBar>

//       {/* Main Content */}
//       <Container sx={{ py: 6 }}>
//         <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
//           {/* Editor Card */}
//           <Card sx={{ bgcolor: "#F2B28C", boxShadow: 4, borderRadius: 3 }}>
//             <CardContent sx={{ textAlign: "center", py: 4 }}>
//               <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//                 Code Editor
//               </Typography>
//               <Button variant="contained" color="primary" onClick={() => navigate("/Editor")}>
//                 Open Editor
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Google Meet Card */}
//           <Card sx={{ bgcolor: "#D2665A", boxShadow: 4, borderRadius: 3 }}>
//             <CardContent sx={{ textAlign: "center", py: 4 }}>
//               <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
//                 Google Meet
//               </Typography>
//               {/* <TextField
//               size="small"
//               label="Meeting ID"
//               variant="outlined"
//               value={meetingId}
//               onChange={(e) => setMeetingId(e.target.value)}
//               sx={{bgcolor:"white", border:true,mt:2}}
//               /> */}
//               <Button onClick={handleGoToMeet} variant="contained" sx={{ml:2,mt:2}}>Go To Meeting Page</Button>
//               {/* <Button onClick={handleNewJoinMeet} variant="contained" sx={{mt:2}}>+New Meeting</Button> */}
//             </CardContent>
//           </Card>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

//2nd code 

import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  AppBar, 
  Toolbar, 
  Container, 
  Avatar,
  Grid,
  Divider
} from "@mui/material";
import { Code, VideoCall } from "@mui/icons-material";

export default function Profile() {
  const navigate = useNavigate();
  const login = localStorage.getItem("login");
  const username = localStorage.getItem("username");
  
  const handleLogOut = () => {
    localStorage.setItem("login", false);
    localStorage.setItem("username", null);
    navigate("/");
  };

  const handleGoToMeet = () => {
    navigate("/meetHome");
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header Bar */}
      <AppBar position="static" sx={{ bgcolor: "black", boxShadow: "none" }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: "#60b9bc",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.5rem"
            }}
          >
            Code Wizard
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {login ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar 
                sx={{ 
                  bgcolor: "#43989b",
                  width: 36,
                  height: 36,
                  fontSize: "1rem"
                }}
              >
                {username ? username.charAt(0).toUpperCase() : "U"}
              </Avatar>
              <Typography 
                sx={{ 
                  color: "white", 
                  fontSize: "0.9rem",
                  fontWeight: 500 
                }}
              >
                {username}
              </Typography>
              <Button 
                variant="outlined" 
                sx={{ 
                  color: "white",
                  borderColor: "white",
                  '&:hover': {
                    borderColor: "#60b9bc",
                    color: "#60b9bc"
                  }
                }}
                onClick={handleLogOut}
              >
                Sign Out
              </Button>
            </Box>
          ) : (
            <Typography sx={{ color: "white" }}>Loading...</Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 4,
            color: "black",
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Welcome, {username}
        </Typography>
        
        <Divider sx={{ mb: 4, bgcolor: "#e0e0e0" }} />
        
        <Grid container spacing={4}>
          {/* Editor Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: "100%",
              borderRadius: 2,
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              '&:hover': {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 20px rgba(0,0,0,0.15)"
              }
            }}>
              <CardContent sx={{ 
                p: 4, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                bgcolor: "#f5f5f5"
              }}>
                <Box sx={{
                  bgcolor: "#60b9bc",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3
                }}>
                  <Code sx={{ fontSize: 32, color: "white" }} />
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: "black",
                    textAlign: "center"
                  }}
                >
                  Collaborative Code Editor
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3, 
                    color: "#555",
                    textAlign: "center"
                  }}
                >
                  Real-time collaborative coding environment with syntax highlighting and live execution.
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: "#43989b",
                    '&:hover': {
                      bgcolor: "#60b9bc"
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600
                  }}
                  onClick={() => navigate("/Editor")}
                >
                  Launch Editor
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Google Meet Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: "100%",
              borderRadius: 2,
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              '&:hover': {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 20px rgba(0,0,0,0.15)"
              }
            }}>
              <CardContent sx={{ 
                p: 4, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                bgcolor: "#f5f5f5"
              }}>
                <Box sx={{
                  bgcolor: "#8fcccf",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3
                }}>
                  <VideoCall sx={{ fontSize: 32, color: "white" }} />
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: "black",
                    textAlign: "center"
                  }}
                >
                  Video Meetings
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3, 
                    color: "#555",
                    textAlign: "center"
                  }}
                >
                  Start or join video meetings with screen sharing and real-time collaboration.
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: "#8fcccf",
                    '&:hover': {
                      bgcolor: "#60b9bc"
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    color: "black"
                  }}
                  onClick={handleGoToMeet}
                >
                  Go To Meetings
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}