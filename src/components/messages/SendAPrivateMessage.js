import React from 'react';
import Button from '@mui/material/Button';
import '../../pages/messages/messages.css';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import { Cookie } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SendAPrivateMessage({ initialFrom = "", initialTo = "", initialSubject = "", initialMessage = "" }) {

    const [from, setFrom] = useState(initialFrom);
    const [to, setTo] = useState(initialTo);
    const [subject, setSubject] = useState(initialSubject);
    const [message, setMessage] = useState(initialMessage);
    const read = false;

    let bearerToken = Cookies.get('token');
    const userName = localStorage.getItem('username');

    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
    };
    const handleSubmit = (e) => {

        const usernameWithoutPrefix = to.replace('u/', '');

        if (userName === usernameWithoutPrefix) {
            toast.error("You can't send a message to yourself.");
        } 
        else if (!to.startsWith('u/')) {
            toast.error("Username must start with 'u/'.");
        }
        
        else {

        axios
            .post(
                "https://www.threadit.tech/api/v1/messages/compose",
                {
                    from: from,
                    to: to,
                    subject: subject,
                    message: message,
                    read: read
                },
                config

            )
            .then((response) => {
                if (response.status === 201) {
                    console.log("Message sent successfully");
                    toast.success('Message sent successfully');
                } else {
                    console.log("Failed to send message");
                }
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 404) {
                    toast.error('Not a valid user.');
                }
            });
        console.log('from1233333333:', from);
        }
    };

    const SendMessage = async (event) => {
        event.preventDefault();

        // try {
        //     const response = await axios({
        //         method: 'post',
        //         url: 'http://localhost:8000/api/v1/messages/compose',
        //         data: messageData,
        //         headers: {
        //             Authorization: `Bearer ${yourToken}`
        //         }
        //     });            
        //     alert('Message sent successfully');

        //     setFrom(initialFrom);
        //     setTo(initialTo);
        //     setSubject(initialSubject);
        //     setMessage(initialMessage);


        // } catch (error) {
        //     console.error('Failed to send message:', error);
        // }

        handleSubmit();

    };
    return (
        <div className="SendMessageform">
            <form onSubmit={SendMessage}>

                <label htmlFor="from">From:</label>
                <select id="from" name="from" value={from} onChange={e => setFrom(e.target.value)}>
                    <option value={'/u' + userName}>{'u/' + userName}</option>
                </select>
                <label htmlFor="to">To:</label>
                <input type="text" id="to" name="to" value={to} onChange={e => setTo(e.target.value)} required />

                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" value={subject} onChange={e => setSubject(e.target.value)} required />


                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    required
                />
                {/* 
                     <div id="robotBox">
                    <label htmlFor="robotCheck" id="robotLabel">
                        I'm not a robot
                    </label>
                    <ReCAPTCHA sitekey="6LdfsqUpAAAAANHJI04i3JAk-rOSEKtrJFT5QY-k" className="robotCheckbox" /> */}

                {/* 6LdfsqUpAAAAAHtwlBE_xNZ7Mb9K2kE9_hWsRNn4    the secreate key*/}
                {/* </div> */}

                <Button variant="contained" color="primary" type="submit" id="submitButton-PrivateMessage">
                    Send Message
                </Button>
                <ToastContainer />
            </form>
        </div>

    );

}
export default SendAPrivateMessage;


SendAPrivateMessage.propTypes = {
    /**  (mandatory) in case no group*/
    from: PropTypes.string,
    /** (mandatory) to know the person */
    to: PropTypes.string,
    /** (mandatory) to determine which subject*/
    subject: PropTypes.string,
    /**(mandatory) to determine message */
    message: PropTypes.string,
    /** Handles changning the community type */

};


