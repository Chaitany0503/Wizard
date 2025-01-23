
import { React, useState, useEffect } from "react";
import { auth, db } from "./Firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";



export default function Profile() {
  const [userDetail, setUserDetail] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("User is logged out or not authenticated.");
        setUserDetail(null); // Clear user details on logout

        return; // Exit the callback
      }
      console.log("user Authenticated : ", user);
      setUserDetail(user);
      const docRef = doc(db, "User", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetail(docSnap.data());
        console.log("LoginSuccessfully");
        console.log(docSnap.data());
      } else {
        console.log("User is Not logged yet.");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  },[]);

  const handleLogOut = async () => {
    try {
      const user = auth.currentUser; // Get the current user
      if (!user) {
        console.error("No user is currently logged in.");
        return;
      }
      console.log("User UID:", user.uid); // Debugging
      await auth.signOut();
      console.log("User logged out successfully.");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div>
      <div>
      {userDetail ? (
        <div className="container-fluid">
          <strong>
          {userDetail.Username}
          </strong>
          
          <button onClick={handleLogOut}>Logout</button>
        </div>
      ) : (
        <p>Loading ....</p>
      )}
    
    </div>  
    <button className="btn btn-info" onClick={()=>navigate("/Editor")}>Editor</button>
    </div>
  );
}