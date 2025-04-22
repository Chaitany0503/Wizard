// import { Box, Button, DialogActions, IconButton, Modal, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { deleteFile, getFileData, getFiles, updateFileName } from "../../lib/api-wizard";
// import { Delete, Edit } from "@mui/icons-material";
// import SideBar from "./SideBar";
// import { useNavigate } from "react-router-dom";
// import { Close as CloseIcon } from "@mui/icons-material";

// function Files() {
//   const [filesData, setFilesData] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//     const [filename, setFilename] = useState("");
//   const [id,setId] = useState();
//   const navigate = useNavigate();
//   const handleOpenFile = async (id) => {
//     console.log("File ID:", id);
//     try {
//       const response = await getFileData({ id });
//       console.log(response.data.result);
//       const data = response.data.result;
//       navigate('/editcode',{state : data });
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const handleModalClose = () => setOpenModal(false);
//   const handleDeleteFile = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete?");
//     console.log("Delete file with ID:", id);
//     if(confirmed){
//       try{
//         const response = await deleteFile({id});
//         console.log(response.data.message);
//         fetchFiles();
//       }catch(err){
//         console.log(err);
//       }
//     }

//     // Implement deletion logic here
//   };

//   const handleEditFile = async (id) => {
//     setOpenModal(true)
//     console.log("Edit file with ID:", id);
//     setId(id);
//     // Implement edit logic here
//   };

//   const handleEdit = async() =>{
//     setOpenModal(false)
//     console.log("file : ",filename);
//     try{
//       const  response = await updateFileName({filename,id})
//       console.log("Updated : ",response.data.message);
//       fetchFiles();
//     }catch(err){
//       console.log(err);
//     }
//   }
//   const columns = [
//     {
//       field: "serialNumber",
//       headerName: "Sr. No",
//       width: 80,
//       renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
//     },
//     {
//       field: "filename",
//       headerName: "File Name",
//       flex: 1,
//       minWidth: 150,
//       renderCell: (params) => (
//         <Typography
//           variant="body2"
//           sx={{
//             cursor: "pointer",
//             "&:hover": { color: "blue" },
//             whiteSpace: "nowrap", // Prevents text from breaking
//             overflow: "hidden",
//             textOverflow: "ellipsis", // Show "..." for overflow
//           }}
//           onClick={() => handleOpenFile(params.row.id)}
//         >
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "created_at",
//       headerName: "Created At",
//       flex: 1,
//       minWidth: 130,
//     },
//     {
//       field: "updated_at",
//       headerName: "Updated At",
//       flex: 1,
//       minWidth: 130,
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 120,
//       renderCell: (params) => (
//         <>
//           <IconButton size="small" onClick={() => handleEditFile(params.row.id)}>
//             <Edit />
//           </IconButton>
//           <IconButton
//             size="small"
//             onClick={() => handleDeleteFile(params.row.id)}
//           >
//             <Delete />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   const fetchFiles = async () => {
//     try {
//       const id = localStorage.getItem("uid")
//       const response = await getFiles({id});
//       console.log("Files:", response.data);
//       setFilesData(response.data.result);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   console.log(filesData)
//   const rows = filesData.map((row, index) => ({
//     id: row.id, // Ensure a unique ID
//     filename: row.name,
//     created_at: row.created_at || "",
//     updated_at: row.updated_at || "",
//   }));

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         display: "flex",
//         bgcolor: "darkslategray",
//         flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on large
//         height: "100vh",
//       }}
//     >
//       {/* Sidebar (Hidden on small screens) */}
//       <Box
//         sx={{
//           width: { xs: "100%", md: "300px" }, // Full width on small screens
//           display: { xs: "none", md: "block" }, // Hide on extra small screens
//         }}
//       >
//         <SideBar />
//       </Box>

//       {/* DataGrid Wrapper for responsiveness */}
//       <Box
//         sx={{
//           flex: 1,
//           overflowX: "auto", // Allows horizontal scrolling if needed
//           p: 2,
//           bgcolor: "white",
//           borderRadius: 2,
//           boxShadow: 2,
//           minWidth: 300,
//         }}
//       >
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           rowHeight={40}
//           sx={{
//             "& .MuiTablePagination-displayedRows": { display: "none" }, // Hide "X–Y of Z"
//             "& .MuiToolbar-root": { display: "none" }, // Hide selection count
//             "& .MuiDataGrid-selectedRowCount": { display: "none" }, // Hides "1 row selected"
//           }}
//           components={{
//             Footer: () => <div />, // Removes default footer
//           }}
//           // pageSizeOptions={[5]}
//           // paginationModel={{ pageSize: 5, page: 0 }}
//           // pagination
//           autoHeight // Makes DataGrid adapt to content height
//         />
//       </Box>
//       <Modal
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
//               Edit
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
//               onClick={handleEdit}
//             >
//               Edit
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
//     </Box>
//   );
// }

// export default Files;
//2nd code 

import React, { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  DialogActions, 
  IconButton, 
  Modal, 
  TextField, 
  Typography,
  
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Close as CloseIcon } from "@mui/icons-material";
import { deleteFile, getFileData, getFiles, updateFileName } from "../../lib/api-wizard";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

function Files() {
  const [filesData, setFilesData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filename, setFilename] = useState("");
  const [id, setId] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleOpenFile = async (id) => {
    try {
      const response = await getFileData({ id });
      navigate('/editcode', { state: response.data.result });
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to open file", "error");
    }
  };

  const handleModalClose = () => setOpenModal(false);

  const handleDeleteFile = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this file?");
    if (confirmed) {
      try {
        await deleteFile({ id });
        showSnackbar("File deleted successfully", "success");
        fetchFiles();
      } catch (err) {
        console.error(err);
        showSnackbar("Failed to delete file", "error");
      }
    }
  };

  const handleEditFile = async (id, currentName) => {
    setOpenModal(true);
    setId(id);
    setFilename(currentName);
  };

  const handleEdit = async () => {
    if (!filename) {
      showSnackbar("Please enter a filename", "error");
      return;
    }

    try {
      await updateFileName({ filename, id });
      handleModalClose();
      showSnackbar("File updated successfully", "success");
      fetchFiles();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to update file", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const fetchFiles = async () => {
    try {
      const id = localStorage.getItem("uid");
      const response = await getFiles({ id });
      setFilesData(response.data.result);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to fetch files", "error");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const columns = [
    {
      field: "serialNumber",
      headerName: "Sr. No",
      width: 80,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "filename",
      headerName: "File Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            "&:hover": { color: "#60b9bc" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          onClick={() => handleOpenFile(params.row.id)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      minWidth: 130,
      
      
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton 
            size="small" 
            onClick={() => handleEditFile(params.row.id, params.row.filename)}
            sx={{ color: "#60b9bc" }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDeleteFile(params.row.id)}
            sx={{ color: "#D2665A" }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = filesData.map((row) => ({
    id: row.id,
    filename: row.name,
    created_at: row.created_at || "-",
    updated_at: row.updated_at || "-",
  }));

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      <SideBar />
      <Box sx={{ flex: 1, p: 3, overflow: "hidden" }}>
        <Typography variant="h4" sx={{ 
          mb: 3, 
          fontWeight: 600,
          color: "#43989b",
          fontFamily: "'Roboto', sans-serif",
        }}>
          My Projects
        </Typography>
        
        <Box sx={{ 
          height: "calc(100% - 64px)", 
          width: "100%",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={50}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#1e1e1e",
                color: "#8fcccf",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #f0f0f0",
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
          />
        </Box>

        {/* Edit File Modal */}
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
                Edit File Name
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
                onClick={handleEdit}
                sx={{
                  bgcolor: "#43989b",
                  color: "white",
                  "&:hover": { bgcolor: "#60b9bc" },
                }}
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Modal>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ 
              bgcolor: snackbarSeverity === "success" ? "#43989b" : "#f44336",
              color: "white",
              width: "100%",
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default Files;