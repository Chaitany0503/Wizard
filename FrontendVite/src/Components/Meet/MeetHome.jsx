
import { customAlphabet } from 'nanoid';
import React, { useState } from 'react';
import './MeetHome.css';
import { useNavigate } from 'react-router-dom';

const MeetHome = () => {
  const [meetingId,setMeetingId]  = useState("");
    const navigate = useNavigate();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const username = localStorage.getItem("username");
  const nanoid = customAlphabet(alphabet, 3); // 3-letter parts
    const handleJoinMeet = () => {
        if(meetingId.trim() === ''){
            console.log("Please Enter the Meeting Id");
            return;
        }
        navigate(`/videocall/${meetingId}`)
      }
      const generateMeetingCode = () => {
        return `${nanoid()}-${nanoid()}-${nanoid()}`;
      };
      const handleNewJoinMeet = () => {
        const newMeetingId = generateMeetingCode();
        navigate(`/videocall/${newMeetingId}`)
      }
      const hadleInput = (e) =>{
        setMeetingId(e.target.value);
      }
  return (
    <div className="app">
      {/* Dark Theme Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Code Wizard</h1>
          <div className="user-info">Welcome, {username}</div>
        </div>
      </header>
      <div style={{display:'flex',flexDirection:'column',padding:'50px'}}>
          <h1 style={{color:"black",marginBottom:'30px',fontFamily: "'Poppins', sans-serif"}}>Welcome, {username}</h1>
          <hr style={{width:'100%'}}></hr>
        </div>
      {/* Light Theme Body */}
      <main className="main-contentt">
        
        <div className="meet-container">
          <h1 className="meet-title">Video calls and meetings for everyone</h1>
          <p className="meet-subtitle">Connect, collaborate, and celebrate from anywhere with Code Wizard Meet</p>
          
          <div className="action-buttons">
            <button className="primary-button" onClick={handleNewJoinMeet}>New meeting</button>
            <div className="join-section">
              <input type="text" value={meetingId} placeholder="Enter a code or link" className="meeting-input" onChange={(e)=>hadleInput(e)} />
              <button className="secondary-button" onClick={handleJoinMeet}>Join</button>
            </div>
          </div>

          <div className="divider"></div>

          <div className="info-section">
            <p className="info-text">Learn more about Code Wizard Meet</p>
            <div className="tip-box">
              <p className="tip-text">Click New meeting to get a link you can send to people you want to meet with</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetHome;