// import React, { useState } from "react";
// import { Editor } from "@monaco-editor/react";
// import {
//   Alert,
//   Box,
//   Button,
//   Snackbar,
//   // DialogActions,
//   // IconButton,
//   // Modal,
//   // TextField,
//   Typography,
// } from "@mui/material";
// // import { Close as CloseIcon } from "@mui/icons-material";
// import { Run, UpdateCode } from "../../lib/api-wizard";
// import SideBar from "./SideBar";
// import { useLocation } from "react-router-dom";

// export default function EditCode() {
//   // const [openModal, setOpenModal] = useState(false);
//   const  location  = useLocation();
//   const codeData = location.state;
//   const [open,setOpen] = useState(false);
//   const [code, setCode] = useState(codeData[0]?.code || "");
//   const [output, setOutput] = useState("");
//   const [language, setLanguage] = useState(codeData[0]?.langauge || "");
//   const [theme, setTheme] = useState("vs-dark");
//   // const [filename, setFilename] = useState("");
  
//   console.log("Code : ",codeData);

//   // const handleModalClose = () => setOpenModal(false);

//   const handleEditorChange = (value) => {
//     setCode(value);
//   };

//   const handleUpdate = async () => {
//     // setOpenModal(false);
//     const id = codeData[0].id;
//     try {
//       const response = await UpdateCode({  language, code,id });
//       console.log(response);
//       setOpen(true);
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
//     <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
//       <SideBar />
//       <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
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
//               onClick={() => handleUpdate()}
//             >
//               Update
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
//         <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
//           {/* Editor */}
//           <Box sx={{ flex: 1, borderRight: "1px solid #ddd" }}>
//             <Editor
//               height="500px"
//               theme={theme}
//               language={language}
//               value={code
//                 // language === "javascript"
//                 //   ? "console.log('Hello');\n"
//                 //   : language === "python"
//                 //   ? "print('Hello')\n"
//                 //   : language === "java"
//                 //   ? 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}'
//                 //   : language === "c"
//                 //   ? '#include <stdio.h>\n\nint main() {\n    printf("Hello\\n");\n    return 0;\n}'
//                 //   : ""
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
//         {/* <Modal
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
//         </Modal> */}

//         <Snackbar
//                 open={open}
//                 autoHideDuration={3000}  // Closes after 3 seconds
//                 onClose={()=>setOpen(false)}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position
//               >
//                 <Alert onClose={()=>setOpen(false)} 
//                   severity="success" 
//                   variant="filled" // Filled background
//                   sx={{ fontSize: "0.75rem", padding: "4px 12px", minWidth: "200px" }}
//                 >
//                   File Updated Successfully...!
//                 </Alert>
//               </Snackbar>
//       </Box>
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
  Snackbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Run, UpdateCode } from "../../lib/api-wizard";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

export default function EditCode() {
  const location = useLocation();
  const codeData = location.state;
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(codeData[0]?.code || "");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState(codeData[0]?.langauge || "javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [isLoading, setIsLoading] = useState(false);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const id = codeData[0].id;
      await UpdateCode({ language, code, id });
      setOpen(true);
    } catch (err) {
      console.error(err);
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
                label="Language"
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
                label="Theme"
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
              onClick={handleUpdate}
              disabled={isLoading}
              sx={{
                bgcolor: "#60b9bc",
                color: "white",
                "&:hover": { bgcolor: "#43989b" },
                fontWeight: 500,
                minWidth: 100,
              }}
            >
              {isLoading ? "Updating..." : "Update"}
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
              value={code}
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
            }}>
              {output || "Your output will appear here..."}
            </Box>
          </Box>
        </Box>

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
            File updated successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}