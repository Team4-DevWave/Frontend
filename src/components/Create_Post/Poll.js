import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import { FaBold } from "react-icons/fa";

import './CreatePost.css'; // Import your CSS file for styling
import { Button } from 'react-bootstrap';
import { FiPlus } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { RiDeleteBin6Line } from "react-icons/ri";
function Poll() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isstrikethrough, setIsstrikethrough] = useState(false);

    const [savedDrafts, setSavedDrafts] = useState([]);
    const [showSavedDrafts, setShowSavedDrafts] = useState(false);
    const [postDone, setPostDone] = useState(false);
    const [spoiler1, setSpoiler] = useState(false);
    const [OC, setOc] = useState(false);
    const [NFSW, setNFSW] = useState(false);
    const [Flair, setFlair] = useState(false);

    var community = localStorage.getItem("communitynamechoosed");


    const textAreaRef = useRef(null);

    const token = Cookies.get("token");

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };


    const username = localStorage.getItem('username');
    ////////////////////////////////////////////////////////////////////////


    const [options, setOptions] = useState(['', '']); // Initial options

    const handleAddOption = () => {
        setOptions([...options, '']); // Add an empty option when the button is clicked
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value; // Update the option value at the specified index
        setOptions(updatedOptions);
    };

    const handleDeleteOption = (index) => {
        if (index >= 2) {
            const updatedOptions = options.filter((_, i) => i !== index); // Remove the option at the specified index
            setOptions(updatedOptions);
        }
    };


    //////////////////////////////////////////////////////////////////////////////////

    const handelpostclick = async (e) => {
        e.preventDefault();
    
        console.log("usernammmeeee==", username);
        console.log("community in post file==", community);
    
        // Create an object to hold the poll options
        const pollOptions = {};
        options.forEach((option, index) => {
            // Skip empty options
            // if (option.trim() !== '') {
            //     // Assign the option name as the key and set the value to 0
            //     pollOptions[option] = 0;
            // }
        });
    
        // Prepare the data to be sent in the Axios request
        const postData = {
            title: title,
            text_body: content,
            type: 'poll',
            locked: false,
            image: "",
            video: "",
            spoiler: spoiler1,
            nsfw: NFSW,
            // Assign the poll options object to the 'poll' property
            poll: pollOptions
        };
    
        // Make the Axios request
        try {
            const response = await axios.post(
                community === "username" ? `http://localhost:8000/api/v1/posts/submit/u/${username}` : `http://localhost:8000/api/v1/posts/submit/r/${community}`,
                postData,
                config
            );
    console.log("dataaaa==",pollOptions);
            console.log("sent spoiler=", spoiler1);
            setPostDone(true);
            setTitle('');
            setContent('');
            setIsBold(false);
            setIsItalic(false);
            setIsstrikethrough(false);
            setSpoiler(false);
            setNFSW(false);
    
            if (response.status === 201) {
                console.log("post is created");
            } else {
                console.log("post is not created");
            }
            console.log(response);
            alert("Post done");
        } catch (error) {
            console.log(error);
            console.log("ssssssssssss");
        }
    };
    
    //////////////////////////////////////////////////////



    const handleContentChange = (e) => {
        setContent(e.target.value);
    };


    useEffect(() => {
        // Enable/disable buttons based on whether title is empty
        const areButtonsDisabled = title.trim() === '';
        document.getElementById('postbtn1').disabled = areButtonsDisabled;
    }, [title]);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.fontWeight = isBold ? 'bold' : 'normal';
            textAreaRef.current.style.fontStyle = isItalic ? 'italic' : 'normal';
            if (isstrikethrough) {
                textAreaRef.current.style.textDecoration = 'linethrough';
            }

            //            textAreaRef.current.style.textDecoration = isstrikethrough ? 'linethrough' : 'normal';

        }
    }, [isBold, isItalic, isstrikethrough]); // Include isItalic in the dependency array

    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if there are no options added
        if (options.every(option => option.trim() === '')) {
            // Reset form fields after submission only if no options are added
            setTitle('');
            setContent('');
            setIsBold(false);
            setIsItalic(false);
        }
        console.log("Title:", title);
        console.log("Content:", content);
    };
    const handleSpoiler = (event) => {
        console.log("spoilerzft=", spoiler1);
        setSpoiler((prevSpoiler) => !prevSpoiler);
    };
    const handleOc = (event) => {
        setOc((prevOC) => !prevOC);
    };
    const handleNSFW = (event) => {
        setNFSW((prevNSFW) => !prevNSFW);
    };
    const handleFlair = (event) => {
        setFlair((prevFlair) => !prevFlair);
    };
    return (

        <div className="create-post-container">

            <div className="create-post-form-section">
                <form className="create-post-form" onSubmit={handleSubmit}>
                    <label htmlFor="title"></label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        data-testid="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                    <label htmlFor="content"></label>

                    <textarea
                        ref={textAreaRef}
                        id="content"
                        name="content"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Text"
                        data-testid="text"

                    ></textarea>


                    <div>
                        {/* Render text input fields for the first two options */}
                        {[...Array(2)].map((_, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={options[index]}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                />
                            </div>
                        ))}
                        {/* Render text input fields and delete buttons for the dynamically added options */}
                        {options.slice(2).map((option, index) => (
                            <div key={index + 2} className="option-container">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index + 2, e.target.value)}
                                    placeholder={`Option ${index + 3}`}
                                />
                                {/* Button to delete the option */}
                                <Button
                                    variant="danger"
                                    id="delete-option-button"
                                    onClick={() => handleDeleteOption(index + 2)}
                                >
                                    <RiDeleteBin6Line />
                                </Button>
                            </div>
                        ))}
                        {/* Button to add more options */}
                        <button id="add-option-button" onClick={handleAddOption}>Add Option</button>
                    </div>



                    <div>
                        <button type="submit" id="postbtn1" onClick={handelpostclick} data-testid="post" disabled={!title || community === ""} className={!title || community === "" ? 'disabled-button' : ''} >Post</button>
                        {postDone && <script>alert("Post done");</script>}

                    </div>

                </form>
                <div>


                    <Button
                        variant="danger"
                        className="ptnn3"
                        onClick={handleOc}
                        style={{ background: OC ? 'green' : '#c1cad3' }}
                    >
                        <FiPlus /> OC
                    </Button>
                    <Button
                        variant="danger"
                        className="ptnn3"
                        onClick={handleSpoiler}
                        style={{ background: spoiler1 ? 'green' : '#c1cad3' }}

                    >
                        <FiPlus /> Spoiler
                    </Button>
                    <Button
                        variant="danger"
                        className="ptnn3"
                        onClick={handleNSFW}
                        style={{ background: NFSW ? 'green' : '#c1cad3' }}
                    >
                        <FiPlus /> NSFW
                    </Button>

                    <Button
                        variant="danger"
                        className="ptnn3"
                        onClick={handleFlair}
                        style={{ background: Flair ? 'green' : '#c1cad3' }}
                    >
                        <IoPricetagOutline /> Flair
                    </Button>
                </div>

            </div>




        </div>
    );
}

export default Poll;
