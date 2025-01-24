import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { v4 } from "uuid";

// here we created the context provider
export const providerContext = createContext([]);

const initialData = [
  {
    folderId: v4(),
    folderTitle: "React Appp",
    files: [
      {
        fileId: v4(),
        fileTitle: "DemoApp",
        code: 'console.log("Hello world");',
        langauge: "JavaScript",
      },
    ],
  },
  {
    folderId: v4(),
    folderTitle: "Test",
    files: [
      {
        fileId: v4(),
        fileTitle: "demo",
        code: 'print("Hello World")',
        langauge: "Python",
      },
    ],
  },
];

export default function Provider({ children }) {
  const [folders, setFolders] = useState(initialData);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(folders));
  }, []);
  return (
    <providerContext.Provider value={folders}>
        {children}
    </providerContext.Provider>
  );
}
