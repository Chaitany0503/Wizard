import React from "react";

export default function Right_Component() {
  return (
    <div className="right-container">
      <div className="header">
        <strong>Code Wizard</strong>
        <button>New Folder</button>
      </div>
      <div className="folder-container">
        <div className="header">
          <div className="folder-header-item">
            <span className="material-icons">folder</span>
            <span>Folder Name</span>
          </div>
          <div className="folder-header-item">
            <button><span className="material-icons">delete</span></button>
            <button><span className="material-icons">edit</span></button>
            <button>New File</button>
          </div>
        </div>
        <div className="files">files</div>
      </div>
    </div>
  );
}
