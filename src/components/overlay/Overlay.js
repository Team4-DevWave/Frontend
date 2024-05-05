import React, { useState } from 'react';
import './overlay.css'; // Import CSS file for styling

import Chat from '../Chat/ChatWindow.js';
function Overlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div>
      <button onClick={toggleOverlay}>Open Chat</button>
      { (showOverlay &&
        <div className="overlay">
          <div className="overlay-content">
            <Chat onClose={toggleOverlay}/>

          </div>
        </div>
      )}
    </div>
  );
}

export default Overlay;

