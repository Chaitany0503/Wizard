import React, { useContext } from "react";
import { providerContext } from "../../ContextProvider/Provider";

export default function Right_Component() {

  const folders = useContext(providerContext);
  console.log("Folders value:", folders);

  
  return (
    <div className="right-container">
      <div className="header">
        <strong>Code Wizard</strong>
        <button>New Folder</button>
      </div>
      {Array.isArray(folders) && folders.length ?(
        folders.map((folder) => (
          <div className="folder-container" key={folder.folderId}>
            <div className="header">
              <div className="folder-header-item">
                <span className="material-icons">folder</span>
                <span>{folder.folderTitle}</span>
              </div>
              <div>
                <span className="material-icons">delete</span>
                <button className="material-icons">edit</button>
              </div>
            </div>
            {folder.files?.map((file) => (
              <div className="files-container" key={file.fileId}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>{file?.fileTitle}</span>
                <span>Language: {file?.langauge}</span>
              </div>
              <div>
                <span className="material-icons">delete</span>
                <button className="material-icons">edit</button>
              </div>
            </div>
              
            ))
            }
          </div>
        ))) :(
          <p>No folders available.</p>
        )
       }
    </div>
  );
}
