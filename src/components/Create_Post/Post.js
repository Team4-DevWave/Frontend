import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import { FaBold } from "react-icons/fa";
import PropTypes from 'prop-types';
import './CreatePost.css'; // Import your CSS file for styling
import { Button } from 'react-bootstrap';
import { FiPlus } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";

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

    const textAreaRef = useRef(null);

    // const handleFileChange = (e) => {
    //     if (e.target.files.length > 0) {
    //         setFileUploaded(true); // Enable the buttons when a file is uploaded
    //     } else {
    //         setFileUploaded(false); // Disable the buttons if no file is uploaded
    //     }
    // };
    const handelpostclick = async (e) => {
        e.preventDefault();
        const postdata = {
            title: title,
            content: content,
            bold: isBold,
            italic: isItalic
        };
        try {
            const response = await axios.post('http://localhost:3001/posts', { content: postdata });
            setPostDone(true);
            setTitle('');
            setContent('');
            setIsBold(false);
            setIsItalic(false);
            setIsstrikethrough(false);
            setIsInlinecode(false);

        }
        catch (error) {
            console.error('Error submitting post:', error);


        }

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
                        {postDone && <p>Post done</p>}

                    </div>

                </form>
                <div>

                    <Button
                        variant="danger"
                        className="ptnn3"

                    >
                        <FiPlus /> OC
                    </Button>
                    <Button
                        variant="danger"
                        className="ptnn3"

                    >
                        <FiPlus /> Spoiler
                    </Button>
                    <Button
                        variant="danger"
                        className="ptnn3"

                    >
                        <FiPlus /> NSFW
                    </Button>

                    <Button
                        variant="danger"
                        className="ptnn3"

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

export default CreatePost;
CreatePost.propTypes = {
    /**  title for the post*/
    title: PropTypes.string,
    /** text area for the post */
    textAreaRef: PropTypes.string
};