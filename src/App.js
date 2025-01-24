import "./App.css";
import Login from "./Components/Login";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Registration from "./Components/Registration";
import { ToastContainer } from "react-toastify";
import Profile from "./Components/Profile";
import { useEffect, useState } from "react";
import { auth } from "./Components/Firebase";
import Editor from "./Components/Editor/Editor";
import Provider from "./ContextProvider/Provider";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/profile" /> : <Login />}
            ></Route>
            <Route path="/Register" element={<Registration />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/Editor" element={<Editor />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </div>
  );
}

export default App;
