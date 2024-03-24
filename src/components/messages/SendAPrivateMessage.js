import React from 'react';
import '../../pages/messages/messages.css';

function SendAPrivateMessage() {
    return (
        <div className="container">
            <form className="SendMessageform">
                <label htmlFor="from">From:</label>
                <select id="from" name="from"> {/* select tag is for drop down */}
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                    {/* Add more options as needed */}
                </select>
                <label htmlFor="to">To:</label>
                <input type="text" id="to" name="to" required />

                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required></textarea>

                <input type="submit" value="Send Message" />
            </form>
        </div>

    );
}
export default SendAPrivateMessage;




// <div >
// <div  className="header">
//     <h1 className='title'>Send a private Message</h1>
//     <div class="horizontalLine"></div>
// </div >
// <center>
// <form className="SendMessageform" >

//     <label for="to">To   :</label>
//     <input type="text" id="input-field" name="to" required></input>
//     <br></br>
//     <label for="subject">Subject:</label>
//     <input type="text" id="input-field" name="subject" required></input>
//     <br></br>
//     <label for="message">Message:</label>
//     <textarea id="message-content" name="message" required></textarea>
//     <button type="submit">Send</button>

// </form>
// </center>

// </div>