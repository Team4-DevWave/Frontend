import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import { Chip, Button, IconButton, Box, Paper } from "@mui/material";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import CodeIcon from "@mui/icons-material/Code";
import { marked } from "marked";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../layouts/Header";
import SideBar from "../../layouts/Sidebar";
import "./Comments.css";
import { LiveCommentsContext } from "./Comments.js";

function AddComment(id, lock) {
  const textareaRef = useRef(null);
  const fakeAddCommentRef = useRef(null);
  const outline = useRef(null);
  const commentBar = useRef(null);
  const formattingOptions = useRef(null);
  const boldBG = useRef(null);
  const italicBG = useRef(null);
  const strikethroughBG = useRef(null);
  const codeBG = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isstrikethrough, setIsstrikethrough] = useState(false);
  const [isInlinecode, setIsInlinecode] = useState(false);
  const [commentDone, setcommentDone] = useState(false);
  const username = localStorage.getItem("username");

  //HANDLERS
  // useEffect(() => {
  //   if (textareaRef.current) {
  //     // textareaRef.current.style.fontWeight = isBold ? "bold" : "normal";
  //     textareaRef.current.style.fontStyle = isItalic ? "italic" : "normal";
  //     if (isstrikethrough) {
  //       textareaRef.current.style.textDecoration = "linethrough";
  //     }
  //   }
  // }, [isBold, isItalic, isstrikethrough, isInlinecode]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  function toggleComment() {
    if (fakeAddCommentRef.current) {
      fakeAddCommentRef.current.classList.toggle("open-textarea");
      setIsCommenting(!isCommenting);
    }
  }
  function handleCancel() {
    setIsCommenting(false);
    setComment(""); // Add this line
  }

  function toggleFormat() {
    if (formattingOptions.current) {
      formattingOptions.current.classList.toggle("open-format-options");
      setIsClicked(!isClicked);
    }
  }
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

    setComment(newValue);
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

    setComment(newValue);
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

    setComment(newValue);
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
    setComment(newValue);

    // Update the selection to be after the inserted backticks
    textareaRef.current.selectionStart = start + 1;
    textareaRef.current.selectionEnd = end + 1;
    if (codeBG.current) {
      codeBG.current.classList.toggle("code");
    }
  };

  const setRefs = (element) => {
    commentBar.current = element;
    outline.current = element;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentBar.current && !commentBar.current.contains(event.target)) {
        commentBar.current.style.border = "1px solid #ccc";
      } else if (commentBar.current) {
        commentBar.current.style.border = "2px solid #FF4500";
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]);

  const { addLiveComment } = useContext(LiveCommentsContext);

  //API
  function handleClickComment() {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log("Token:", token);
    console.log("id", id);

    axios
      .post(
        `http://localhost:8000/api/v1/posts/${id.postID}/comments/`,
        { content: comment },
        config
      )
      .then((response) => {
        setcommentDone(true);
        setComment("");
        setIsBold(false);
        setIsItalic(false);
        setIsstrikethrough(false);
        setIsInlinecode(false);
        console.log("success");
        const livecomment = { ...response.data.data.comment };
        livecomment.user = username; // Replace "New User" with the new value
        livecomment.time = response.data.data.comment.createdAt;
        addLiveComment(livecomment);
        console.log("Live comment time:", livecomment.time);
      })
      .catch((error) => console.error("Error:", error));
  }

  function colorUsernames(text) {
    const regex = /(u\/\w+)/g;

    // Replace all instances of u/"something" with a span with the "username" class
    return text.replace(regex, '<a class="username-mention" href="#u">$1</a>');
  }

  return (
    <>
      {!isCommenting && (
        <div
          className="fake-addcomment"
          onClick={toggleComment}
          ref={fakeAddCommentRef}
        >
          <p className="add-comment-p">Add a comment</p>
        </div>
      )}

      {isCommenting && (
        <div className="addcomment-container" ref={setRefs}>
          {isClicked && (
            <div className="text-formatting-options">
              <IconButton
                aria-label="fingerprint"
                color="error"
                onClick={handleBoldClick}
              >
                <FormatBoldIcon />
              </IconButton>

              <IconButton
                aria-label="fingerprint"
                color="error"
                onClick={handleItalicClick}
              >
                <FormatItalicIcon />
              </IconButton>

              <IconButton
                aria-label="fingerprint"
                color="error"
                onClick={handleStrikeClick}
              >
                <StrikethroughSIcon />
              </IconButton>

              <IconButton
                aria-label="fingerprint"
                color="error"
                onClick={handleCodeClick}
              >
                <CodeIcon />
              </IconButton>
            </div>
          )}
          <textarea
            ref={textareaRef}
            className="addcomment-box"
            value={comment}
            onChange={handleCommentChange}
            disabled={id.lock}
          />
          {comment && (
            <h6
              style={{
                color: "black",
                fontSize: "14px",
                fontStyle: "italic",
              }}
            >
              Preview:
            </h6>
          )}

          <div
            style={{
              whiteSpace: "pre-wrap",
              overflow: "auto",
              wordWrap: "break-word",
            }} // Add this style
            dangerouslySetInnerHTML={{
              __html: marked(colorUsernames(comment)),
            }}
          />
          <IconButton
            aria-label="fingerprint"
            color="error"
            onClick={toggleFormat}
            ref={formattingOptions}
          >
            <TextFormatIcon />
          </IconButton>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{
                borderRadius: 25,
                margin: "4px",
              }}
              onClick={handleCancel}
              variant={"outlined"}
            >
              Cancel
            </Button>
            <Button
              sx={{
                borderRadius: 25,
                margin: "4px",
              }}
              onClick={handleClickComment}
              variant={"contained"}
            >
              Comment
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddComment;
