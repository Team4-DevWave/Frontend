import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaBold } from "react-icons/fa";
import { Chip, Button, IconButton, Box, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import './Post.css'; // Import your CSS file for styling
import { FiPlus } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import CodeIcon from "@mui/icons-material/Code";
import { marked } from "marked";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const codeBG = useRef(null);
  const [isInlinecode, setIsInlinecode] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState(null);
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
  const [draftDialogOpen, setDraftDialogOpen] = useState(false);

  var community = localStorage.getItem("communitynamechoosed");



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



    console.log("usernammmeeee==", username);
    console.log("community in post file==", community);

    if (community === "username") {
      axios
        .post(
          `https://www.threadit.tech/api/v1/posts/submit/u/${username}`,
          {
            title: title,
            text_body: content,
            type: 'text',
            locked: false,
            image: "",
            video: "",
            spoiler: spoiler1,
            nsfw: NFSW,
          },
          config
        )
        .then((response) => {
          console.log("sent spoiler=", spoiler1);
          setPostDone(true);
          setTitle('');
          setContent('');
          setIsBold(false);
          setIsItalic(false);
          setIsstrikethrough(false);
          setSpoiler(false);
          setNFSW(false);
          navigate(`/comments/${response.data.data.post._id}/${response.data.data.post.title.toLowerCase().replace(/ /g, "-").replace(/\//g, "-")} `);

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
    }
    else {
      axios
        .post(
          `https://www.threadit.tech/api/v1/posts/submit/r/${community}`,
          {
            title: title,
            text_body: content,
            type: 'text',
            locked: false,
            image: "",
            video: "",
            spoiler: spoiler1,
            nsfw: NFSW,
          },
          config
        )
        .then((response) => {
          console.log("sent spoiler=", spoiler1);
          setPostDone(true);
          setTitle('');
          setContent('');
          setIsBold(false);
          setIsItalic(false);
          setIsstrikethrough(false);
          setSpoiler(false);
          setNFSW(false);
          navigate(`/comments/${response.data.data.post._id}/${response.data.data.post.title.toLowerCase().replace(/ /g, "-").replace(/\//g, "-")} `);
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
    }




  };

  // const handleBoldClick = () => {
  //     setIsBold(!isBold);
  // };

  // const handleItalicClick = () => {
  //     setIsItalic(!isItalic);
  // };
  // const handlestrikeClick = () => {
  //     setIsstrikethrough(!isstrikethrough);
  // };




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
    const updatedDrafts = [...savedDrafts, draft];
    setSavedDrafts(updatedDrafts);
    localStorage.setItem('savedDrafts', JSON.stringify(updatedDrafts));
    setTitle('');
    setContent('');
    setIsBold(false);
    setIsItalic(false);
    setIsstrikethrough(false);
    setSpoiler(false);
  };


  const handleEditDraft = (draft) => {
    setTitle(draft.title);
    setContent(draft.content);
    setDraftDialogOpen(false);
  };

  const handleShowSavedDrafts = () => {
    setDraftDialogOpen(true);
  };
  const handleDeleteDraft = (index) => {
    const updatedDrafts = savedDrafts.filter((_, i) => i !== index);
    setSavedDrafts(updatedDrafts);
    localStorage.setItem('savedDrafts', JSON.stringify(updatedDrafts));
  };

  ///////////////////////////////////////////////////////////////////
  const handleBoldClick = () => {
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const value = textareaRef.current.value;

    let newValue;
    if (start === end) {
      // No text is selected, insert a default bold string
      newValue =
        value.substring(0, start) + "**bold text**" + value.substring(start);
    } else {
      // Text is selected, wrap it with **
      newValue =
        value.substring(0, start) +
        "**" +
        value.substring(start, end) +
        "**" +
        value.substring(end);
    }

    setContent(newValue);
    textareaRef.current.selectionStart = start + 2;
    textareaRef.current.selectionEnd = end + 2;
  };
  const handleItalicClick = () => {
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const value = textareaRef.current.value;

    let newValue;
    if (start === end) {
      // No text is selected, insert a default italic string
      newValue =
        value.substring(0, start) + "*italic text*" + value.substring(start);
    } else {
      // Text is selected, wrap it with *
      newValue =
        value.substring(0, start) +
        "*" +
        value.substring(start, end) +
        "*" +
        value.substring(end);
    }

    setContent(newValue);
    textareaRef.current.selectionStart = start + 1;
    textareaRef.current.selectionEnd = end + 1;
  };

  const handleStrikeClick = () => {
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const value = textareaRef.current.value;

    let newValue;
    if (start === end) {
      // No text is selected, insert a default strikethrough string
      newValue =
        value.substring(0, start) +
        "~~strikethrough text~~" +
        value.substring(start);
    } else {
      // Text is selected, wrap it with ~~
      newValue =
        value.substring(0, start) +
        "~~" +
        value.substring(start, end) +
        "~~" +
        value.substring(end);
    }

    setContent(newValue);
    textareaRef.current.selectionStart = start + 2;
    textareaRef.current.selectionEnd = end + 2;
  };

  const handleCodeClick = () => {
    setIsInlinecode(!isInlinecode);

    // Get the current selection
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;

    // Get the current value of the textarea
    const value = textareaRef.current.value;

    // Create the new value by wrapping the selected text with backticks
    const newValue =
      value.substring(0, start) +
      "`" +
      value.substring(start, end) +
      "`" +
      value.substring(end);

    // Update the value of the textarea
    setContent(newValue);

    // Update the selection to be after the inserted backticks
    textareaRef.current.selectionStart = start + 1;
    textareaRef.current.selectionEnd = end + 1;
    if (codeBG.current) {
      codeBG.current.classList.toggle("code");
    }
  };

  useEffect(() => {
    const storedDrafts = localStorage.getItem('savedDrafts');
    if (storedDrafts) {
      setSavedDrafts(JSON.parse(storedDrafts));
    }
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Enable/disable buttons based on whether title is empty
    const areButtonsDisabled = title.trim() === '';
    document.getElementById('createcss').disabled = areButtonsDisabled;
    document.getElementById('createcss').disabled = areButtonsDisabled;
  }, [title]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontWeight = isBold ? 'bold' : 'normal';
      textareaRef.current.style.fontStyle = isItalic ? 'italic' : 'normal';
      if (isstrikethrough) {
        textareaRef.current.style.textDecoration = 'linethrough';
      }

      //            textAreaRef.current.style.textDecoration = isstrikethrough ? 'linethrough' : 'normal';

    }
  }, [isBold, isItalic, isstrikethrough]); // Include isItalic in the dependency array

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
  function colorUsernames(text) {
    const regex = /(u\/\w+)/g;

    // Replace all instances of u/"something" with a span with the "username" class
    return text.replace(regex, '<a class="username-mention" href="#u">$1</a>');
  }
  return (

    <div className="create-post-container" id="grid-1">

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
            <IconButton
              aria-label="fingerprint"
              color="error"
              className="ptn2"
              onClick={handleBoldClick}
            >
              <FormatBoldIcon />
            </IconButton>

            <IconButton
              aria-label="fingerprint"
              color="error"
              className="ptn2"
              onClick={handleItalicClick}
            >
              <FormatItalicIcon />
            </IconButton>

            <IconButton
              aria-label="fingerprint"
              color="error"
              className="ptn2"

              onClick={handleStrikeClick}
            >
              <StrikethroughSIcon />
            </IconButton>

            <IconButton
              aria-label="fingerprint"
              color="error"
              className="ptn2"

              onClick={handleCodeClick}
            >
              <CodeIcon />
            </IconButton>
          </div>
          <textarea
            ref={textareaRef}
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Text"
            data-testid="text"

          ></textarea>

          {/* <div
            dangerouslySetInnerHTML={{
              __html: marked(colorUsernames(content)),
            }}
          /> */}

          <div>
            <button type="button" onClick={handleSaveDraft} id="createcss" disabled={!title} className={!title ? 'disabled-button' : ''}>Save Draft</button>
            <button type="submit" id="createcss" onClick={handelpostclick} data-testid="post" disabled={!title || community === ""} className={!title || community === "" ? 'disabled-button' : ''} >Post</button>
            {postDone && <script>alert("Post done");</script>}

          </div>

        </form>
        <div>


          <Button
            variant="danger"
            id="button22"
            onClick={handleOc}
            style={{ background: OC ? 'green' : '#c1cad3' }}
          >
            <FiPlus /> OC
          </Button>
          <Button
            variant="danger"
            id="button22"
            onClick={handleSpoiler}
            style={{ background: spoiler1 ? 'green' : '#c1cad3' }}

          >
            <FiPlus /> Spoiler
          </Button>
          <Button
            variant="danger"
            id="button22"
            onClick={handleNSFW}
            style={{ background: NFSW ? 'green' : '#c1cad3' }}
          >
            <FiPlus /> NSFW
          </Button>

          <Button
            variant="danger"
            id="button22"
            onClick={handleFlair}
            style={{ background: Flair ? 'green' : '#c1cad3' }}
          >
            <IoPricetagOutline /> Flair
          </Button>
        </div>

      </div>
      <button className='Draftbt' onClick={handleShowSavedDrafts}>Drafts</button>


      <Dialog open={draftDialogOpen} onClose={() => setDraftDialogOpen(false)}>
        <DialogTitle>Saved Drafts</DialogTitle>
        <DialogContent>
          <ul>
            {savedDrafts.map((draft, index) => (
              <li key={index}>
                <div fontWeight='bold'>Post:{index + 1}</div>
                <div>Title: {draft.title}</div>
                <div>Content: {draft.content}</div>
                <Button onClick={() => { setSelectedDraft(draft); setDraftDialogOpen(false); handleEditDraft(draft)}}>Edit</Button>
                <Button onClick={() => handleDeleteDraft(index)}>Delete</Button>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDraftDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default CreatePost;
