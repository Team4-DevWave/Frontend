/* this is reddit clone system for message sending

 */
// styling messages using mui library
import React from 'react';
import '../../pages/messages/messages.css';

function SendMessage() {
    return (
        <div >
            <div  className="header">
                <h1 className='title'>Send a Message</h1>
                <div class="horizontalLine"></div>
            </div >
            <h2>Send a Message</h2>
            <center>
            <form className="SendMessageform" >

                <label for="to">To   :</label>
                <input type="text" id="input-field" name="to" required></input>
                <br></br>
                <label for="subject">Subject:</label>
                <input type="text" id="input-field" name="subject" required></input>
                <br></br>
                <label for="message">Message:</label>
                <textarea id="message-content" name="message" required></textarea>
                <button type="submit">Send</button>

            </form>
            </center>

        </div>
    );
}

export default SendMessage;