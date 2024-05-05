import React, { useState, useRef, useEffect } from 'react';
import { FaBold } from "react-icons/fa";
// import axios from 'axios';
import './CreatePost.css'; // Import your CSS file for styling
import { Button } from 'react-bootstrap';

import { FiPlus } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import Cookies from "js-cookie";

function Link() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [savedDrafts, setSavedDrafts] = useState([]);
    const [showSavedDrafts, setShowSavedDrafts] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [postDone, setPostDone] = useState(false);
    const [spoiler1, setSpoiler] = useState(false);
    const [OC, setOc] = useState(false);
    const [NFSW, setNFSW] = useState(false);
    const [Flair, setFlair] = useState(false);
    const textAreaRef = useRef(null);
    const token = Cookies.get("token");
    var community = localStorage.getItem("communitynamechoosed");

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const username = localStorage.getItem('username');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileUploaded(true); // Enable the buttons when a file is uploaded
        } else {
            setFileUploaded(false); // Disable the buttons if no file is uploaded
        }
    };

    const handelpostclick = async (e) => {
        e.preventDefault();
        const postdata = {
            title: title,
            content: content,
        };
        console.log("usernammmeeee==", username);
        if (community === "username") {
            axios
                .post(
                    `http://localhost:8000/api/v1/posts/submit/u/${username}`,
                    {
                        title: title,
                        url: content,
                        type: 'url',
                        nsfw: NFSW,
                        spoiler: spoiler1,
                        locked: false,
                        image: "",
                        video: ""
                    },
                    config
                )
                .then((response) => {
                    setNFSW(false);
                    setSpoiler(false);
                    setFlair(false);
                    setOc(false);
                    setPostDone(true);
                    setTitle('');
                    setContent('');

                    if (response.status === 201) {
                        console.log("post is created");

                    } else {
                        console.log("post is not created");
                    }
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    console.log("errorr");
                });
        }
        else {
            axios
                .post(
                    `http://localhost:8000/api/v1/posts/submit/r/${community}`,
                    {
                        title: title,
                        url: content,
                        type: 'url',
                        nsfw: NFSW,
                        spoiler: spoiler1,
                        locked: false,
                        image: "",
                        video: ""
                    },
                    config
                )
                .then((response) => {
                    setNFSW(false);
                    setSpoiler(false);
                    setFlair(false);
                    setOc(false);
                    setPostDone(true);
                    setTitle('');
                    setContent('');

                    if (response.status === 201) {
                        console.log("post is created");

                    } else {
                        console.log("post is not created");
                    }
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    console.log("errorr");
                });
        }

        alert("Post done");

    };


    const handleContentChange = (e) => {
        const inputValue = e.target.value;
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        if (urlRegex.test(inputValue) || inputValue === '') {
            setContent(inputValue);
        }
    };
    //save draft handel
    const handleSaveDraft = (e) => {
        e.preventDefault();
        const draft = {
            title: title,
            content: content
        };
        setSavedDrafts([...savedDrafts, draft]);
        // Reset form fields after saving draft
        setTitle('');
        setContent('');

    };

    const handleEditDraft = (draft) => {
        setTitle(draft.title);
        setContent(draft.content);
    };

    const handleShowSavedDrafts = () => {
        setShowSavedDrafts(true);
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle form submission here

        // Reset form fields after submission
        setTitle('');
        setContent('');

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
                        value={title}
                        data-testid="title"
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
                        placeholder="URL"
                        data-testid="text"
                    ></textarea>






                    <div>
                        <button type="button" onClick={handleSaveDraft} id="savedefaultbtn" data-testid="savedraft" disabled={!title || community==="" || !content} className={!title || community==="" || !content ? 'disabled-button' : ''}>Save Draft</button>
                        <button type="submit" id="postbtn1" onClick={handelpostclick} data-testid="post" disabled={!title || community==="" || !content} className={!title || community==="" || !content ? 'disabled-button' : ''}>Post</button>
                        {postDone && <p>Post done</p>}

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
            {/* <div>
                <button className='Draftbt' onClick={handleShowSavedDrafts}>Drafts</button>
                {showSavedDrafts && (
                    <div className="saved-drafts-popup">
                        <h3>Saved Drafts</h3>
                        <ul>
                            {savedDrafts.map((draft, index) => (
                                <li key={index}>
                                    <div>Title: {draft.title}</div>
                                    <div>Content: {draft.content}</div>
                                    <button onClick={() => handleEditDraft(draft)}>Edit</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div> */}



        </div>
    );
}

export default Link;

//in link
Link.propTypes = {
    /**  title for the post*/
    title: PropTypes.string,
    /** text area for URL */
    textAreaRef: PropTypes.string    
  };