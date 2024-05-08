import React, { useState } from 'react';
import './overlay.css'; // Import CSS file for styling



import Chat from '../Chat/ChatWindow.js';
function Overlay({ toggleOverlay, showOverlay }) {

  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  console.log("overlayrendered")
  // const [showOverlay, setShowOverlay] = useState(false);
  // const [newMessage, setNewMessage] = useState('');



  return (
    <div onClick={stopPropagation}>
      
      {
        <div className="overlay">
          <div className="overlay-content">
            <Chat toggleOverlay={toggleOverlay} showOverlay={showOverlay} stopPropagation={stopPropagation} />
          </div>
        </div>
        //           <div className="overlay">

        //             <Chat toggleOverlay={toggleOverlay} showOverlay={showOverlay} stopPropagation={stopPropagation} />
        // </div>

      }
    </div>
  );
}

export default Overlay;

