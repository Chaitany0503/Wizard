import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, AppBar, Toolbar, Container, TextField } from "@mui/material";
import { customAlphabet } from 'nanoid';
export default function Profile() {
  const [userDetail, setUserDetail] = useState(null);
  const [meetingId,setMeetingId]  = useState("");
  const navigate = useNavigate();

  const login = localStorage.getItem("login");
  const username = localStorage.getItem("username");
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 3); // 3-letter parts
  const handleLogOut = async () => {
    try {localStorage.setItem("login", false);
      localStorage.setItem("username", null);
      navigate("/");
      // localStorage.setItem("login", false);
      // localStorage.setItem("username", null);
      
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const handleJoinMeet = () => {
    navigate(`/videocall/${meetingId}`)
  }
  const generateMeetingCode = () => {
    return `${nanoid()}-${nanoid()}-${nanoid()}`;
  };
  const handleNewJoinMeet = () => {
    const newMeetingId = generateMeetingCode();
    navigate(`/videocall/${newMeetingId}`)
  }

  return (
    <Box sx={{ bgcolor: "whitesmoke", minHeight: "100vh" }}>
      {/* Header Bar */}
      <AppBar position="static" sx={{ bgcolor: "#2E3B55", boxShadow: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
            User Dashboard
          </Typography>
          {login ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "white", fontSize: "1rem" }}>{username}</Typography>
              <Button variant="contained" color="error" onClick={handleLogOut}>
                Logout
              </Button>
            </Box>
          ) : (
             <Typography sx={{ color: "white" }}>Loading...</Typography>
           )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          {/* Editor Card */}
          <Card sx={{ bgcolor: "#F2B28C", boxShadow: 4, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Code Editor
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate("/Editor")}>
                Open Editor
              </Button>
            </CardContent>
          </Card>

          {/* Google Meet Card */}
          <Card sx={{ bgcolor: "#D2665A", boxShadow: 4, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
                Google Meet
              </Typography>
              <TextField
              size="small"
              label="Meeting ID"
              variant="outlined"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              sx={{bgcolor:"white", border:true,mt:2}}
              />
              <Button onClick={handleJoinMeet} variant="contained" sx={{ml:2,mt:2}}>Join Meeting</Button>
              <Button onClick={handleNewJoinMeet} variant="contained" sx={{mt:2}}>+New Meeting</Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
