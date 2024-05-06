import React, { useState } from 'react';
import './overlay.css'; // Import CSS file for styling



import Chat from '../Chat/ChatWindow.js';
function Overlay({ toggleOverlay, showOverlay }) {
  console.log("overlayrendered")
  // const [showOverlay, setShowOverlay] = useState(false);
  // const [newMessage, setNewMessage] = useState('');



  return (
    <div>
      
      {
        <div className="overlay">
          <div className="overlay-content">
            <Chat toggleOverlay={toggleOverlay} showOverlay={showOverlay} />
          </div>
        </div>
      }
    </div>
  );
}

export default Overlay;

