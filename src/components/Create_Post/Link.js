import React, { useState, useRef, useEffect } from 'react';
import { FaBold } from "react-icons/fa";
// import axios from 'axios';
import './CreatePost.css'; // Import your CSS file for styling
import { Button } from 'react-bootstrap';

import { FiPlus } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";

function Link() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [savedDrafts, setSavedDrafts] = useState([]);
    const [showSavedDrafts, setShowSavedDrafts] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [postDone, setPostDone] = useState(false);

    const textAreaRef = useRef(null);

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
        // try {
        //     const response = await axios.post('http://localhost:3001/posts', { content: postdata });
        //     setPostDone(true);
        //     setTitle('');
        //     setContent('');

        // }
        // catch (error) {
        //     console.error('Error submitting post:', error);


        // }

    };


    const handleContentChange = (e) => {
        const text = e.target.value;
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const replacedText = text.replace(urlRegex, (url) => `[${url}](${url})`);
        setContent(replacedText);
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
                    ></textarea>






                    <div>
                        <button type="button" onClick={handleSaveDraft} id="savedefaultbtn">Save Draft</button>
                        <button type="submit" id="postbtn1" onClick={handelpostclick}>Post</button>
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
            <div>
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
            </div>



        </div>
    );
}

export default Link;
