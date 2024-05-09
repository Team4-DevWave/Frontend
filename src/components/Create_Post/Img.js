import React, { useState } from 'react';
import deleteIcon from './image/WhatsApp Image 2024-03-16 at 16.15.11_80aefda1.jpg';
import { Button } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
// import axios from 'axios';
import { FiPlus } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Img() {
    const [title, setTitle] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [captions, setCaptions] = useState([]);
    const [spoiler1, setSpoiler] = useState(false);
    const [OC, setOc] = useState(false);
    const [NFSW, setNFSW] = useState(false);
    const [Flair, setFlair] = useState(false);
    const token = Cookies.get("token");
    var community = localStorage.getItem("communitynamechoosed");
    const navigate = useNavigate();

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const username = localStorage.getItem('username');

    const handelpostclick = async (event) => {
        event.preventDefault();

        // Create an object to hold the post data
        const base64Strings = await Promise.all(uploadedFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result.split(',')[1]; // Extract the Base64 part
                    console.log("Base64 Encoded:", base64String); // Print the Base64 string to console
                    resolve(base64String);
                };
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
            });
        }));

        // Create an object to hold the post data
        const postData = {
            title: title,
            files: uploadedFiles.map((file, index) => ({
                type: file.type.startsWith('image/') ? 'image' : 'video',
                url: base64Strings[index], // Use Base64 string here
                caption: captions[index]
            }))
        };
        console.log("imageeee/videooo=", base64Strings);
        console.log("usernammmeeee==", username);

        if (community === "username") {
            console.log("community in image/video file11==", community);

            axios
                .post(
                    `https://www.threadit.tech/api/v1/posts/submit/u/${username}`,
                    {
                        title: postData.title,
                        text_body: "",
                        type: "image/video",
                        nsfw: NFSW,
                        spoiler: spoiler1,
                        locked: false,
                        image: postData.files.find(file => file.type === 'image')?.url || "",
                        video: postData.files.find(file => file.type === 'video')?.url || ""
                    },
                    config
                )
                .then((response) => {
                    setFlair(false);
                    setNFSW(false);
                    setSpoiler(false);
                    setOc(false);

                    if (response.status === 201) {
                        console.log("post is created");

                    } else {
                        console.log("post is not created");
                    }
                    console.log(response);
                    navigate(`/comments/${response.data.data.post._id}/${response.data.data.post.title.toLowerCase().replace(/ /g, "-").replace(/\//g, "-")} `);

                })
                .catch((error) => {
                    console.log(error);
                    console.log("ssssssssssss");
                });
        }
        else {
            console.log("community in image/video file22==", community);

            axios
                .post(
                    `https://www.threadit.tech/api/v1/posts/submit/r/${community}`,
                    {
                        title: postData.title,
                        text_body: "",
                        type: "image/video",
                        nsfw: NFSW,
                        spoiler: spoiler1,
                        locked: false,
                        image: postData.files.find(file => file.type === 'image')?.url || "",
                        video: postData.files.find(file => file.type === 'video')?.url || ""
                    },
                    config
                )
                .then((response) => {
                    setFlair(false);
                    setNFSW(false);
                    setSpoiler(false);
                    setOc(false);

                    if (response.status === 201) {
                        console.log("post is created");

                    } else {
                        console.log("post is not created");
                    }
                    console.log(response);
                    navigate(`/comments/${response.data.data.post._id}/${response.data.data.post.title.toLowerCase().replace(/ /g, "-").replace(/\//g, "-")} `);

                })
                .catch((error) => {
                    console.log(error);
                    console.log("ssssssssssss");
                });
        }





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
                    <button type="submit" id="createcss" onClick={handelpostclick} data-testid="post" disabled={!title || community === ""} className={!title || community === "" ? 'disabled-button' : ''}>
                        Post
                    </button>
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

export default Img;
