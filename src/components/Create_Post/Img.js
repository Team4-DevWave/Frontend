import React, { useState } from 'react';
import deleteIcon from './image/WhatsApp Image 2024-03-16 at 16.15.11_80aefda1.jpg';
import './CreatePost.css'; // Import your CSS file for styling
import { Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
// import axios from 'axios';
import { FiPlus } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import PropTypes from 'prop-types';
function Img() {
    const [title, setTitle] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [captions, setCaptions] = useState([]);



    const handelpostclick = async (event) => {
        event.preventDefault();
        
        // Create an object to hold the post data
        const postData = {
            title: title,
            files: uploadedFiles.map((file, index) => ({
                type: file.type.startsWith('image/') ? 'image' : 'video',
                url: URL.createObjectURL(file),
                caption: captions[index]
            }))
        };
    // try {
    //     const response = await axios.post('http://localhost:3001/posts', { content: postData });

    // } catch (error) {
        
    // }
        //console.log('Post Data:', postData);
    
        // Reset form fields after submission
        setTitle('');
        setUploadedFiles([]);
        setCaptions([]);
    };
    
    
    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files);
        const newCaptions = filesArray.map(() => ''); // Initialize captions array for new files
        setUploadedFiles(prevFiles => [...prevFiles, ...filesArray]);
        setCaptions(prevCaptions => [...prevCaptions, ...newCaptions]);
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles.splice(index, 1);
        setUploadedFiles(updatedFiles);
        const updatedCaptions = [...captions];
        updatedCaptions.splice(index, 1);
        setCaptions(updatedCaptions);
    };

    const handleCaptionChange = (e, index) => {
        const updatedCaptions = [...captions];
        updatedCaptions[index] = e.target.value;
        setCaptions(updatedCaptions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTitle('');
        setUploadedFiles([]);
        setCaptions([]);
    };

    return (
        <div className="create-post-container">
            <div className="create-post-form-section">
                <form className="create-post-form" onSubmit={handleSubmit}>
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

                    {uploadedFiles.length > 0 && (
                        <div className="uploaded-content">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="uploaded-file">
                                    {file.type.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(file)} alt="Uploaded Image" />
                                    ) : file.type.startsWith('video/') ? (
                                        <video controls>
                                            <source src={URL.createObjectURL(file)} type={file.type} />
                                        </video>
                                    ) : (
                                        <p>Unsupported file type</p>
                                    )}
                                    <input
                                        type="text"
                                        value={captions[index]}
                                        onChange={(e) => handleCaptionChange(e, index)}
                                        placeholder="Caption"
                                    />
                                    <Button
                                        id="deleteicon1"
                                        variant="danger"
                                        onClick={() => handleRemoveFile(index)}
                                    >
                                        <AiOutlineDelete />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    <input
                        type="file"
                        id="content"
                        name="content"
                        onChange={handleFileChange}
                        data-testid="content"
                        accept="image/*, video/*"
                        multiple
                    />
                    <button type="submit" onClick={handelpostclick} data-testid="post" disabled={!title}   className={!title ? 'disabled-button' : ''}>
                        Post
                    </button>
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
        </div>
    );
}

export default Img;

Img.propTypes = {
    /**  title for the post*/
    title: PropTypes.string,
    /** area for file upload  */
    file: PropTypes.string
};
