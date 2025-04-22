// import React, { useEffect, useState } from "react";
// import { Editor } from "@monaco-editor/react";
// import {
//   Alert,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   DialogActions,
//   IconButton,
//   Modal,
//   Snackbar,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Close as CloseIcon } from "@mui/icons-material";
// import { AiCode, Run, saveCode } from "../../lib/api-wizard";
// import SideBar from "./SideBar";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

// export default function EditCode() {
//   const [query, setQuery] = useState('');
//   const [open,setOpen] = useState(false);
//     const [aiResponse, setAiResponse] = useState('');
//   const [toggle, setToggle] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [language, setLanguage] = useState("javascript");
//   const [theme, setTheme] = useState("vs-dark");
//   const [filename, setFilename] = useState("");

//   const handleModalClose = () => setOpenModal(false);
//   // async function fetchModels() {
//   //   const response = await fetch(
//   //     "https://generativelanguage.googleapis.com/v1/models?key=AIzaSyDjDIuoUbmqJ2D7fbx2TEcQ2yrqpnqNFg4"
//   //   );
//   //   const data = await response.json();
//   //   console.log("Available Models:", data);
//   // }
  
//   // useEffect(()=>{
//   //   fetchModels();
//   // },[]);
//   const handleEditorChange = (value) => {
//     setCode(value);
//   };
 
//   const handleSubmit = async () => {
//       try {
//         const response = await AiCode({ query });
//         setAiResponse(response.data.response);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   const handleSave = async () => {
//     setOpenModal(false);
    
//     try {
//       setOpen(true);
//      const  id = localStorage.getItem("uid");
//       const response = await saveCode({ filename, language, code,id });
//       console.log("Hit : ",response);
      
      
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleRunCode = async () => {
//     try {
//       const response = await Run({ code, language });
//       setOutput(response.data.output || "No output returned.");
//     } catch (error) {
//       setOutput(error.response?.data?.output || "Error executing code.");
//     }
//   };

//   return (
//     <Box sx={{ display: "flex",  height: "100vh" }}>
//       <SideBar />
//       <Box sx={{ display: "flex", flexDirection: "column",flex:1,flexShrink:1}}>
//         {/* Header */}
//         <Box
//           sx={{
//             padding: "10px",
//             backgroundColor: "#282c34",
//             color: "#fff",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             borderBottom: "2px solid white",
//           }}
//         >
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//             <strong>WIZARD</strong> Code Editor
//           </Typography>

//           <Box sx={{ display: "flex", gap: 2 }}>
//             {/* <Button
//                           variant="contained"
//                           fullWidth
//                           sx={{
//                             bgcolor: "#D2665A",
//                             color: "white",
//                             '&:hover': { bgcolor: "#C65550" },
//                           }}
//                           onClick={() => setToggle(true)}
//                         >
//                           Chat with AI
//                         </Button> */}
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "white", color: "black" }}
//               onClick={handleRunCode}
//             >
//               Run Code
//             </Button>
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "white", color: "black" }}
//               onClick={() => setOpenModal(true)}
//             >
//               Save
//             </Button>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 style={{ padding: "5px" }}
//               >
//                 <option value="javascript">JavaScript</option>
//                 <option value="python">Python</option>
//                 <option value="c">C</option>
//                 <option value="java">Java</option>
//               </select>
//               <select
//                 value={theme}
//                 onChange={(e) => setTheme(e.target.value)}
//                 style={{ padding: "5px" }}
//               >
//                 <option value="vs-dark">Vs-Dark</option>
//                 <option value="vs">Vs-Light</option>
//                 <option value="hc-black">hc-black</option>
//               </select>
//             </Box>
//           </Box>
//         </Box>

//         {/* Editor and Output Area (Horizontal) */}
//         {/* <BoX */}
//         <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
//           {/* Editor */}
//           <Box sx={{ flex: 1, borderRight: "1px solid #ddd" }}>
//             <Editor
//               height="500px"
//               theme={theme}
//               language={language}
//               value={
//                 language === "javascript"
//                   ? "console.log('Hello');\n"
//                   : language === "python"
//                   ? "print('Hello')\n"
//                   : language === "java"
//                   ? 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}'
//                   : language === "c"
//                   ? '#include <stdio.h>\n\nint main() {\n    printf("Hello\\n");\n    return 0;\n}'
//                   : ""
//               }
//               onChange={handleEditorChange}
//               options={{ fontSize: 14, automaticLayout: true }}
//             />
//           </Box>

//           {/* Output */}
//           <Box sx={{ flex: 0.4, p: 2, backgroundColor: "#f5f5f5" }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               Output
//             </Typography>
//             <pre
//               style={{
//                 whiteSpace: "pre-wrap", // Ensure that long lines of text wrap within the container
//                 wordWrap: "break-word", // Enable word wrapping
//                 maxHeight: "90px", // Set the maximum height
//                 overflow: "auto", // Add a scrollbar when content exceeds the height
//                 background: "#222",
//                 color: "#fff",
//                 padding: "10px",
//                 borderRadius: "5px",
//               }}
//             >
//               {output || "Your output will appear here..."}
//             </pre>
//           </Box>
//         </Box>

//         {/* Save File Modal */}
//         <Modal
//           open={openModal}
//           onClose={handleModalClose}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Box
//             sx={{
//               width: "90%",
//               maxWidth: 400,
//               bgcolor: "#fff",
//               borderRadius: 2,
//               boxShadow: 24,
//               p: 3,
//               position: "relative",
//             }}
//           >
//             <IconButton
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 color: "#9A616D",
//               }}
//               onClick={handleModalClose}
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight: "bold",
//                 marginBottom: 2,
//                 color: "#393f81",
//                 textAlign: "center",
//               }}
//             >
//               Save
//             </Typography>
//             <TextField
//               size="small"
//               label="File Name"
//               fullWidth
//               onChange={(e) => setFilename(e.target.value)}
//             />
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{ mt: 2 }}
//               onClick={handleSave}
//             >
//               Save
//             </Button>
//             <DialogActions
//               sx={{ justifyContent: "center", flexDirection: "column" }}
//             >
//               <Button
//                 onClick={handleModalClose}
//                 color="error"
//                 sx={{
//                   textTransform: "uppercase",
//                   fontWeight: "bold",
//                   fontSize: "0.85rem",
//                 }}
//               >
//                 Cancel
//               </Button>
//             </DialogActions>
//           </Box>
//         </Modal>
//       </Box>
//       { toggle ?
//       <Box sx={{height:"100vh",flex:1}} >
//         <Card
//           sx={{
//             borderRadius: 0,
//             height: "100vh",
//             bgcolor: "#2E3B55",
//             color: "white",
//             // width: 400,
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
        
//       </Box> :
//          <></>
//         }
//         <Snackbar
//         open={open}
//         autoHideDuration={3000}  // Closes after 3 seconds
//         onClose={()=>setOpen(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position
//       >
//         <Alert onClose={()=>setOpen(false)} 
//           severity="success" 
//           variant="filled" // Filled background
//           sx={{ fontSize: "0.75rem", padding: "4px 12px", minWidth: "200px" }}
//         >
//           File Saved Successfully...!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

//2nd code 

import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  DialogActions,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { AiCode, Run, saveCode } from "../../lib/api-wizard";
import SideBar from "./SideBar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function EditCode() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [toggle, setToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleModalClose = () => setOpenModal(false);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await AiCode({ query });
      setAiResponse(response.data.response);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get AI response", {
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

  const handleSave = async () => {
    if (!filename) {
      toast.error("Please enter a filename", {
        position: "top-center",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        }
      });
      return;
    }

    try {
      setIsLoading(true);
      const id = localStorage.getItem("uid");
      await saveCode({ filename, language, code, id });
      setOpen(true);
      handleModalClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save file", {
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

  const handleRunCode = async () => {
    try {
      setIsLoading(true);
      const response = await Run({ code, language });
      setOutput(response.data.output || "No output returned.");
    } catch (error) {
      setOutput(error.response?.data?.output || "Error executing code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      <SideBar />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            bgcolor: "black",
            color: "#8fcccf",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #60b9bc",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: "'Roboto', sans-serif" }}>
            <span style={{ color: "#60b9bc" }}>CODE</span> WIZARD
          </Typography>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label=""
                sx={{ 
                  bgcolor: "white",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#60b9bc",
                  },
                }}
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="java">Java</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Theme</InputLabel>
              <Select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                label=""
                sx={{ 
                  bgcolor: "white",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#60b9bc",
                  },
                }}
              >
                <MenuItem value="vs-dark">Vs-Dark</MenuItem>
                <MenuItem value="vs">Vs-Light</MenuItem>
                <MenuItem value="hc-black">hc-black</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleRunCode}
              disabled={isLoading}
              sx={{
                bgcolor: "#43989b",
                color: "white",
                "&:hover": { bgcolor: "#60b9bc" },
                fontWeight: 500,
                minWidth: 100,
              }}
            >
              {isLoading ? "Running..." : "Run"}
            </Button>

            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              sx={{
                bgcolor: "#60b9bc",
                color: "white",
                "&:hover": { bgcolor: "#43989b" },
                fontWeight: 500,
                minWidth: 100,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>

        {/* Editor and Output Area */}
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Box sx={{ flex: 1 }}>
            <Editor
              height="100%"
              theme={theme}
              language={language}
              value={
                language === "javascript"
                  ? "// Write your JavaScript code here\nconsole.log('Hello, World!');"
                  : language === "python"
                  ? "# Write your Python code here\nprint('Hello, World!')"
                  : language === "java"
                  ? '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
                  : language === "c"
                  ? '// Write your C code here\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
                  : ""
              }
              onChange={handleEditorChange}
              options={{ 
                fontSize: 14, 
                automaticLayout: true,
                minimap: { enabled: false },
              }}
            />
          </Box>

          <Box sx={{ 
            p: 2, 
            bgcolor: "#1e1e1e", 
            borderTop: "1px solid #60b9bc",
            maxHeight: "30vh",
            overflow: "auto"
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: "#8fcccf",
              mb: 1 
            }}>
              Output
            </Typography>
            <Box component="pre" sx={{ 
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              bgcolor: "#222",
              color: "#fff",
              p: 2,
              borderRadius: 1,
              fontFamily: "monospace",
              fontSize: "0.875rem",
              m: 0,
              // overflow:"auto",
              // maxHeight:'100px',
            }}>
              {output || "Your output will appear here..."}
            </Box>
          </Box>
        </Box>

        {/* Save File Modal */}
        <Modal open={openModal} onClose={handleModalClose}>
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}>
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              borderBottom: "1px solid #60b9bc",
              pb: 1
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                color: "#43989b"
              }}>
                Save Your Code
              </Typography>
              <IconButton onClick={handleModalClose}>
                <CloseIcon sx={{ color: "#43989b" }} />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              size="small"
              label="File Name"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                onClick={handleModalClose}
                sx={{
                  color: "#43989b",
                  borderColor: "#43989b",
                  "&:hover": {
                    borderColor: "#60b9bc",
                  },
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                sx={{
                  bgcolor: "#43989b",
                  color: "white",
                  "&:hover": { bgcolor: "#60b9bc" },
                  "&:disabled": { bgcolor: "#8fcccf" },
                }}
                variant="contained"
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </Box>
          </Box>
        </Modal>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert 
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ 
              bgcolor: "#43989b",
              color: "white",
              width: "100%",
            }}
          >
            File saved successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
