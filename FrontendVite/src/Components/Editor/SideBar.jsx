// import { Box, Button, Card, CardContent, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AiCode } from '../../lib/api-wizard';
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

// function SideBar() {
//   const [toggle, setToggle] = useState(false);
//   const [query, setQuery] = useState('');
//   const [aiResponse, setAiResponse] = useState('');
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleSubmit = async () => {
//     try {
//       const response = await AiCode({ query });
//       setAiResponse(response.data.response);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Box>
//       {toggle ? (
//         <Card
//           sx={{
//             borderRadius: 0,
//             height: "100vh",
//             bgcolor: "#2E3B55",
//             color: "white",
//             width: isMobile ? '100%' : 400,
//             overflowY: "auto",
//             p: 2
//           }}
//         >
//           <CardContent>
//             <Button
//               variant="contained"
//               sx={{
//                 bgcolor: "white",
//                 color: "black",
//                 '&:hover': { bgcolor: "#f0f0f0" },
//                 mb: 2,
//               }}
//               onClick={() => setToggle(false)}
//             >
//               Close AI Chat
//             </Button>

//             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//               🤖 AI Assistant
//             </Typography>

//             <TextField
//               fullWidth
//               size="small"
//               label="Ask Your Query..."
//               variant="outlined"
//               sx={{ bgcolor: "white", borderRadius: 1, mb: 2 }}
//               onChange={(e) => setQuery(e.target.value)}
//             />

//             <Button
//               variant="contained"
//               fullWidth
//               sx={{ bgcolor: "#D2665A", color: "white", '&:hover': { bgcolor: "#C65550" } }}
//               onClick={handleSubmit}
//             >
//               Submit
//             </Button>

//             {aiResponse && (
//               <Box sx={{ mt: 3, bgcolor: "#1E1E1E", p: 2, borderRadius: 2, overflowY: "auto", maxHeight: "400px" }}>
//                 <Typography variant="subtitle1" sx={{ color: "white", mb: 1 }}>
//                   Generated Code:
//                 </Typography>
//                 <SyntaxHighlighter language="c" style={dracula}>
//                   {aiResponse}
//                 </SyntaxHighlighter>
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       ) : (
//         <Card
//           sx={{
//             borderRadius: 0,
//             height: "100vh",
//             bgcolor: "#2E3B55",
//             color: "white",
//             width: isMobile ? '100%' : 200,
//             p: 2
//           }}
//         >
//           <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
//               🎯 Quick Actions
//             </Typography>

//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 bgcolor: "white",
//                 color: "black",
//                 '&:hover': { bgcolor: "#f0f0f0" },
//               }}
//               onClick={() => navigate('/file')}
//             >
//               My Projects
//             </Button>

//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 bgcolor: "white",
//                 color: "black",
//                 '&:hover': { bgcolor: "#f0f0f0" },
//               }}
//               onClick={() => navigate('/Editor')}
//             >
//               Create New Project
//             </Button>

//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 bgcolor: "white",
//                 color: "black",
//                 '&:hover': { bgcolor: "#f0f0f0" },
//               }}
//               onClick={() => navigate('/profile')}
//             >
//               Dashboard
//             </Button>

//             <Button
//               variant="contained"
//               fullWidth
//               sx={{
//                 bgcolor: "#D2665A",
//                 color: "white",
//                 '&:hover': { bgcolor: "#C65550" },
//               }}
//               onClick={() => setToggle(true)}
//             >
//               Chat with AI
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// }

// export default SideBar;

//2nd code 
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  TextField, 
  Typography, 
  useMediaQuery, 
  useTheme,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AiCode } from '../../lib/api-wizard';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function SideBar() {
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async () => {
    if (!query.trim()) {
      setOpenSnackbar(true);
      return;
    }

    try {
      setIsLoading(true);
      const response = await AiCode({ query });
      setAiResponse(response.data.response);
    } catch (err) {
      console.error(err);
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: "My Projects", path: "/file", icon: "📂" },
    { label: "New Project", path: "/Editor", icon: "🆕" },
    { label: "Dashboard", path: "/profile", icon: "📊" },
  ];

  return (
    <Box sx={{ height: "100vh" }}>
      {toggle ? (
        <Card
          sx={{
            height: "100%",
            bgcolor: "#1e1e1e",
            color: "#8fcccf",
            width: isMobile ? '100%' : 350,
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ 
            p: 2, 
            bgcolor: "black", 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #60b9bc",
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              🤖 AI Assistant
            </Typography>
            <IconButton onClick={() => setToggle(false)} sx={{ color: "#8fcccf" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <TextField
              fullWidth
              size="small"
              label="Ask Your Query..."
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ 
                bgcolor:'white',
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#60b9bc",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8fcccf",
                  },
                },
              }}
              multiline
              rows={3}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{
                mb: 3,
                bgcolor: "#43989b",
                color: "white",
                "&:hover": { bgcolor: "#60b9bc" },
                "&:disabled": { bgcolor: "#8fcccf" },
              }}
            >
              {isLoading ? "Generating..." : "Generate Code"}
            </Button>

            {aiResponse && (
              <Box sx={{ 
                flex: 1, 
                bgcolor: "#2e2e2e", 
                p: 2, 
                borderRadius: 1,
                overflow: "auto",
                maxHeight: "450px",
              }}>
                <Typography variant="subtitle1" sx={{ 
                  color: "#8fcccf",
                  mb: 1,
                  fontWeight: 500,
                }}>
                  Generated Code:
                </Typography>
                <SyntaxHighlighter 
                  language="c" 
                  style={dracula}
                  customStyle={{
                    margin: 0,
                    borderRadius: 4,
                    fontSize: "0.85rem",
                    overflow: "auto",
                  }}
                >
                  {aiResponse}
                </SyntaxHighlighter>
              </Box>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            height: "100%",
            bgcolor: "#1e1e1e",
            color: "#8fcccf",
            width: isMobile ? '100%' : 250,
            borderRadius: 0,
          }}
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              textAlign: "center", 
              mb: 2,
              color: "#60b9bc",
              fontFamily: "'Roboto', sans-serif",
            }}>
              CODE WIZARD
            </Typography>

            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="contained"
                fullWidth
                startIcon={<span>{action.icon}</span>}
                onClick={() => navigate(action.path)}
                sx={{
                  justifyContent: "flex-start",
                  bgcolor: "#2e2e2e",
                  color: "#8fcccf",
                  "&:hover": { 
                    bgcolor: "#43989b",
                    color: "white",
                  },
                  textTransform: "none",
                  py: 1.5,
                  px: 2,
                }}
              >
                {action.label}
              </Button>
            ))}

            <Button
              variant="contained"
              fullWidth
              startIcon={<span>🤖</span>}
              onClick={() => setToggle(true)}
              sx={{
                justifyContent: "flex-start",
                bgcolor: "#43989b",
                color: "white",
                "&:hover": { 
                  bgcolor: "#60b9bc",
                },
                textTransform: "none",
                py: 1.5,
                px: 2,
                mt: 2,
              }}
            >
              AI Assistant
            </Button>
          </CardContent>
        </Card>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ 
            bgcolor: "#f44336",
            color: "white",
          }}
        >
          Please enter a query to generate code
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SideBar;