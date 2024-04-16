import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import { FaBold } from "react-icons/fa";

import './CreatePost.css'; // Import your CSS file for styling
import { Button } from 'react-bootstrap';
import { FiPlus } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import Cookies from "js-cookie";

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isstrikethrough, setIsstrikethrough] = useState(false);
    const [isInlinecode, setIsInlinecode] = useState(false);
    const [savedDrafts, setSavedDrafts] = useState([]);
    const [showSavedDrafts, setShowSavedDrafts] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [postDone, setPostDone] = useState(false);
    const[spoiler1, setSpoiler] = useState(false);
    const[OC, setOc] = useState(false);
    const[NFSW, setNFSW] = useState(false);
    const[Flair, setFlair] = useState(false);



    const textAreaRef = useRef(null);

    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // const handleFileChange = (e) => {
    //     if (e.target.files.length > 0) {
    //         setFileUploaded(true); // Enable the buttons when a file is uploaded
    //     } else {
    //         setFileUploaded(false); // Disable the buttons if no file is uploaded
    //     }
    // };

    const username = localStorage.getItem('username');
    const handelpostclick = async (e) => {
        e.preventDefault();


    
        console.log("usernammmeeee==",username);

        axios
        .post(
          `http://localhost:8000/api/v1/posts/submit/u/${username}`,
          {
            title: title,
            text_body: content,
            type: 'text',
            nsfw: false,
            spoiler: false,
            locked: false,
            image:"",
            video:"",
            spoiler:spoiler1,
            NFSW:NFSW,
          },
          config
        )
        .then((response) => {
            console.log("sent spoiler=",spoiler1);
            setPostDone(true);
            setTitle('');
            setContent('');
            setIsBold(false);
            setIsItalic(false);
            setIsstrikethrough(false);
            setIsInlinecode(false);
            setSpoiler(false);
            setNFSW(false);
          if (response.status === 201) {
            console.log("post is created");

          } else {
            console.log("post is not created");
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          console.log("ssssssssssss");
        });
        alert("Post done");

    };

    const handleBoldClick = () => {
        setIsBold(!isBold);
    };

    const handleItalicClick = () => {
        setIsItalic(!isItalic);
    };
    const handlestrikeClick = () => {
        setIsstrikethrough(!isstrikethrough);
    };
    const handleinlinecode = () => {
        setIsInlinecode(!isInlinecode);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
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
        setIsBold(false);
        setIsItalic(false);
        setIsstrikethrough(false);
        setIsInlinecode(false);
        setSpoiler(false);
    };

    const handleEditDraft = (draft) => {
        setTitle(draft.title);
        setContent(draft.content);
    };

    const handleShowSavedDrafts = () => {
        setShowSavedDrafts(true);
    };

    useEffect(() => {
        // Enable/disable buttons based on whether title is empty
        const areButtonsDisabled = title.trim() === '';
        document.getElementById('savedefaultbtn').disabled = areButtonsDisabled;
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
    }, [isBold, isItalic, isstrikethrough, isInlinecode]); // Include isItalic in the dependency array

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle form submission here
        console.log("Title:", title);
        console.log("Content:", content);
        // Reset form fields after submission
        setTitle('');
        setContent('');
        setIsBold(false);
        setIsItalic(false);
    };
    const handleSpoiler = (event) => {
        console.log("spoilerzft=",spoiler1);
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
                    <div className="toolbar1">
                        <Button
                            variant="danger"
                            className={isBold ? 'active' : ''}
                            onClick={handleBoldClick}
                            data-testid="Bold"
                        >
                            <FaBold />
                        </Button>
                        <button type="button" onClick={handleItalicClick} className={isItalic ? 'active' : ''}>I</button>
                        <button type="button" onClick={handlestrikeClick} className={isstrikethrough ? 'active' : ''}>S</button>
                        <button type="button" onClick={handlestrikeClick} className={isstrikethrough ? 'active' : ''}>code</button>


                    </div>
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
                        <button type="button" onClick={handleSaveDraft} id="savedefaultbtn" disabled ={!title}   className={!title ? 'disabled-button' : ''}>Save Draft</button>
                        <button type="submit" id="postbtn1" onClick={handelpostclick} data-testid="post" disabled={!title}   className={!title ? 'disabled-button' : ''} >Post</button>
                        {postDone &&<script>alert("Post done");</script>}

                    </div>

                </form>
                <div>

                    <Button
                        variant="danger"
                        className="ptnn3"
                        onClick={handleOc}
                        style={{ background: OC ? 'green' : 'gray' }} 
                    >
                        <FiPlus /> OC
                    </Button>
                    <Button
                        variant="danger"
                        className="ptnn3"
                        onClick={handleSpoiler}
                        style={{ background: spoiler1 ? 'green' : 'gray' }} 

                    >
                        <FiPlus /> Spoiler
                    </Button>
                    <Button
                        variant="danger"
                        className="ptnn3"
                        onClick={handleNSFW}
                        style={{ background: NFSW ? 'green' : 'gray' }} 
                    >
                        <FiPlus /> NSFW
                    </Button>

                    <Button
                        variant="danger"
                        className="ptnn3"
                        onClick={handleFlair}
                        style={{ background: Flair ? 'green' : 'gray' }} 
                    >
                        <IoPricetagOutline /> Flair
                    </Button>
                </div>

            </div>




        </div>
    );
}

export default CreatePost;
