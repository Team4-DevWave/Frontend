import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../layouts/Header";
import SideBar from "../../layouts/Sidebar";
import "./Comments.css";
import { LiveCommentsContext } from "./Comments.js";

function AddComment(id) {
  const textareaRef = useRef(null);
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
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontWeight = isBold ? "bold" : "normal";
      textareaRef.current.style.fontStyle = isItalic ? "italic" : "normal";
      if (isstrikethrough) {
        textareaRef.current.style.textDecoration = "linethrough";
      }
    }
  }, [isBold, isItalic, isstrikethrough, isInlinecode]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  function toggleComment() {
    if (commentBar.current) {
      commentBar.current.classList.toggle("open-textarea");
      setIsCommenting(!isCommenting);
    }
  }

  function toggleFormat() {
    if (formattingOptions.current) {
      formattingOptions.current.classList.toggle("open-format-options");
      setIsClicked(!isClicked);
    }
  }
  const handleBoldClick = () => {
    setIsBold(!isBold);
    if (boldBG.current) {
      boldBG.current.classList.toggle("bold");
    }
  };

  const handleItalicClick = () => {
    setIsItalic(!isItalic);
    if (italicBG.current) {
      italicBG.current.classList.toggle("italic");
    }
  };
  const handlestrikeClick = () => {
    setIsstrikethrough(!isstrikethrough);
    if (italicBG.current) {
      strikethroughBG.current.classList.toggle("strikethrough");
    }
  };
  const handleinlinecode = () => {
    setIsInlinecode(!isInlinecode);
    if (italicBG.current) {
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
        commentBar.current.style.outline = "none";
      } else if (commentBar.current) {
        commentBar.current.style.outline = "1px solid black";
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
        `https://www.threadit.tech/api/v1/posts/${id.postID}/comments/`,
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

  return (
    <>
      {!isCommenting && (
        <div
          className="fake-addcomment"
          onClick={toggleComment}
          ref={commentBar}
        >
          <p className="add-comment-p">Add a comment</p>
        </div>
      )}

      <div className="addcomment-container" ref={setRefs}>
        {isClicked && (
          <div className="text-formatting-options">
            <button
              className="text-formatting-button"
              onClick={handleBoldClick}
              ref={boldBG}
            >
              <svg
                rpl=""
                fill="#60686e"
                height="16"
                icon-name="bold-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.209 10.95c.545.7.825 1.571.791 2.458a4.36 4.36 0 0 1-.668 2.394 4.448 4.448 0 0 1-1.855 1.623 6.155 6.155 0 0 1-2.715.575H5V2h4.511a6.981 6.981 0 0 1 2.817.521 4.183 4.183 0 0 1 1.828 1.443c.425.617.647 1.35.636 2.1a4.243 4.243 0 0 1-.476 1.96 4.33 4.33 0 0 1-1.256 1.509 4.5 4.5 0 0 1 2.149 1.417Zm-7.59-6.215v3.951h2.127a2.016 2.016 0 0 0 1.513-.564 2.04 2.04 0 0 0 .551-1.487 1.7 1.7 0 0 0-.61-1.422 2.619 2.619 0 0 0-1.657-.478H7.619Zm3.057 10.53a2.372 2.372 0 0 0 1.657-.571 1.95 1.95 0 0 0 .631-1.524 1.852 1.852 0 0 0-.674-1.531 2.792 2.792 0 0 0-1.806-.543H7.619v4.169h3.057Z"></path>
              </svg>
            </button>
            <button
              className="text-formatting-button"
              onClick={handleItalicClick}
              ref={italicBG}
            >
              <svg
                rpl=""
                fill="#60686e"
                height="16"
                icon-name="italic-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.989 18a3.117 3.117 0 0 1-1.833-.765 2.1 2.1 0 0 1-.546-1.509c.007-.328.043-.655.109-.977l1.659-8.181h1.909l-1.735 8.563a1.03 1.03 0 0 0-.021.245.7.7 0 0 0 .3.626c.26.156.55.258.851.3L9.989 18Zm.267-13.424a1.364 1.364 0 0 1 0-2.392 1.44 1.44 0 0 1 1.943.5 1.35 1.35 0 0 1 0 1.381 1.447 1.447 0 0 1-1.943.5v.011Z"></path>
              </svg>
            </button>
            <button
              className="text-formatting-button"
              onClick={handlestrikeClick}
              ref={strikethroughBG}
            >
              <svg
                rpl=""
                fill="#60686e"
                height="16"
                icon-name="strikethrough-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.308 8h-2.4a4.048 4.048 0 0 1-.5-2.006 3.916 3.916 0 0 1 .557-2.1A3.722 3.722 0 0 1 7.529 2.5 5.212 5.212 0 0 1 9.858 2a5.083 5.083 0 0 1 2.914.8c.76.5 1.369 1.2 1.756 2.024l-1.745.691a3.7 3.7 0 0 0-1.13-1.22A2.993 2.993 0 0 0 9.88 3.77a3.036 3.036 0 0 0-1.28.265 2.208 2.208 0 0 0-.928.777c-.239.363-.36.79-.349 1.225-.012.521.156 1.03.477 1.441.152.19.322.365.508.522ZM19 9.007H1v1.25h8.467l.042.017.219.077c.53.184 1.05.4 1.554.649.475.24.898.572 1.244.976.376.43.577.984.562 1.555.006.49-.137.972-.409 1.38-.273.41-.65.742-1.091.961a3.218 3.218 0 0 1-1.468.343 3.174 3.174 0 0 1-1.495-.36 3.643 3.643 0 0 1-1.167-.96 4.227 4.227 0 0 1-.72-1.32l-1.838.758c.235.668.605 1.28 1.086 1.8a5.777 5.777 0 0 0 1.844 1.353 5.336 5.336 0 0 0 2.312.514 5.2 5.2 0 0 0 2.406-.573 4.563 4.563 0 0 0 1.789-1.615 4.283 4.283 0 0 0 .672-2.373A3.72 3.72 0 0 0 14.217 11a6.283 6.283 0 0 0-.716-.743H19v-1.25Z"></path>
              </svg>
            </button>
            <button
              className="text-formatting-button"
              onClick={handleinlinecode}
              ref={codeBG}
            >
              {" "}
              <svg
                rpl=""
                fill="#60686e"
                height="16"
                icon-name="code-inline-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.713 18.656.114 10.687a.622.622 0 0 1 0-.718L5.714 2l1.022.719-5.344 7.609 5.344 7.609-1.023.719Zm7.417-5.528-1.016-1.016a2.581 2.581 0 0 1-3.564 0 2.523 2.523 0 0 1 0-3.566 2.581 2.581 0 0 1 3.564 0l1.016-1.018a3.957 3.957 0 1 0 0 5.6Zm6.756-2.44a.622.622 0 0 0 0-.718l-5.6-7.969-1.021.719 5.346 7.608-5.343 7.609 1.022.719 5.596-7.968Z"></path>
              </svg>
            </button>
            <button className="text-formatting-button">
              <svg
                rpl=""
                fill="#60686e"
                height="16"
                icon-name="spoiler-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.463 15.384A1.092 1.092 0 0 1 9.076 15a1.033 1.033 0 0 1-.143-.537c-.002-.186.047-.369.143-.529.093-.16.227-.293.387-.387.16-.097.345-.148.533-.147a1.05 1.05 0 0 1 .537.141 1.076 1.076 0 0 1 .537.921c0 .188-.051.373-.148.535-.096.159-.23.292-.39.386a1.042 1.042 0 0 1-.536.143 1.026 1.026 0 0 1-.533-.142Zm-.141-3.329L9.13 5.342h1.73l-.192 6.713H9.322Zm.667 7.935a4.6 4.6 0 0 1-3.27-1.354l-5.367-5.365a4.634 4.634 0 0 1 0-6.542l5.367-5.365a4.626 4.626 0 0 1 6.54 0l5.366 5.364a4.627 4.627 0 0 1 0 6.542l-5.364 5.365a4.6 4.6 0 0 1-3.272 1.355Zm0-18.73a3.353 3.353 0 0 0-2.386.988L2.237 7.614a3.375 3.375 0 0 0 0 4.772l5.366 5.366a3.46 3.46 0 0 0 4.771 0l5.365-5.366a3.374 3.374 0 0 0 0-4.772L12.374 2.25A3.349 3.349 0 0 0 9.99 1.26Z"></path>
              </svg>
            </button>
          </div>
        )}
        <textarea
          ref={textareaRef}
          className="addcomment-box"
          value={comment}
          onChange={handleCommentChange}
        />
        <button className="cancel-btn" onClick={toggleComment}>
          Cancel
        </button>

        <button className="comment-btn" onClick={handleClickComment}>
          Comment
        </button>
        <button
          className="text-formatting"
          onClick={toggleFormat}
          ref={formattingOptions}
        >
          T
        </button>
      </div>
    </>
  );
}

export default AddComment;
