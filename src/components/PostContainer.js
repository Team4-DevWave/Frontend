import React, { useRef, useState, useEffect } from "react";
import "./PostContainer.css";
import { PropTypes } from "prop-types";
import PostDesign from "././Create_Post/PostDesign";
import { SlOptions } from "react-icons/sl";
import { Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Report from "./Report";
import Delete from "./Delete";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Edit from "./Edit";


function PostContainer({ postData }) {
  console.log("Is post saved:", postData.issaved);
  const shareMenu = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [edited, setEdited] = useState(null);

  const token = Cookies.get("token");
  const username = localStorage.getItem("username");
  const mentionedUsernames = postData.mentioned.map((obj) => obj.username);
  console.log("mention", mentionedUsernames);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  function toggleMenu() {
    if (shareMenu.current) {
      shareMenu.current.classList.toggle("open-menu");
    }
  }

  const [showAlert, setShowAlert] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  function copyLink() {
    // Get the URL of the current post
    var copyText =
      window.location.origin +
      `/comments/${postData.id}/${postData.title.toLowerCase().replace(/ /g, "-")}`;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(copyText);

    setShowAlert(true);

    //Hide the alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  }

  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }
      if (shareMenu.current && !shareMenu.current.contains(event.target)) {
        shareMenu.current.classList.remove("open-menu");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareMenu]);

  const postData2 = {
    username: "ismail mostafa",
    userpic: "https://randomuser.me/api/portraits/men/1.jpg",
    community: "ismail's Community",
    incommunity: true,
    Date: "March 24, 2024",
    title: "ismaaaaillll",
    text: "mohmmm",
    //image: "https://via.placeholder.com/400",
  };

  const [voteStatus, setVoteStatus] = useState(postData.userVote); // 0 = no vote, 1 = upvoted, -1 = downvoted
  const [upvoteCount, setUpVoteCount] = useState(postData?.votes?.upvotes || 0);
  const [downvoteCount, setDownVoteCount] = useState(
    postData?.votes?.downvotes || 0
  );
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [count, setCount] = useState(
    postData.votes.upvotes - postData.votes.downvotes
  );

  useEffect(() => {
    if (postData.userVote === "downvoted") {
      setVoteStatus(-1);
    } else if (postData.userVote === "upvoted") {
      setVoteStatus(1);
    } else {
      setVoteStatus(0);
    }
  }, [postData.userVote]);

  const handleUpvote = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/posts/${postData.id}/vote`,
        {
          voteType: 1,
        },
        config
      );
      console.log("Upvotes:", response.data.data.upvotes);
      console.log("Downvotes:", response.data.data.downvotes);
      console.log("UPPP:", response.data);
      // Assuming the response contains the updated upvote and downvote counts
      setUpVoteCount(Number(response.data.data.upvotes));
      setDownVoteCount(Number(response.data.data.downvotes));
      setCount(
        Number(response.data.data.upvotes) -
          Number(response.data.data.downvotes)
      );
      setVoteStatus((prevVoteStatus) => (prevVoteStatus === 1 ? 0 : 1));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/posts/${postData.id}/vote`,
        {
          voteType: -1,
        },
        config
      );
      console.log("Upvotes:", response.data.newUpvoteCount);
      console.log("Downvotes:", response.data.newDownvoteCount);
      console.log(response.data);
      // Assuming the response contains the updated upvote and downvote counts
      setUpVoteCount(Number(response.data.data.upvotes));
      setDownVoteCount(Number(response.data.data.downvotes));
      setCount(
        Number(response.data.data.upvotes) -
          Number(response.data.data.downvotes)
      );
      console.log("Downvoted 1", downvoted);

      setVoteStatus((prevVoteStatus) => (prevVoteStatus === -1 ? 0 : -1));

      console.log("voteStatus", voteStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/posts/${postData.id}/delete`,
        config
      );
      if (response.status === 204) {
        console.log("Post deleted successfully");
        setIsDeleted(true); // Set isDeleted to true
        console.log("delete", isDeleted);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = async (editedContent) => {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/posts/${postData.id}/edit`,
        { text_body: editedContent },
        config
      );
      if (response.status === 200) {
        console.log("Post editted successfully");
        setIsEdited(true); // Set isDeleted to true
        console.log("Edit", isEdited);
        const mappedData = response.data.data.post;
        setEdited(mappedData);
      }
    } catch (error) {
      console.error("Error Editing post:", error);
    }
  };

  if (!postData) {
    return <div>Loading...</div>; // or some loading spinner
  }
  const handelsavedpost = () => {
    console.log("id posstttttt=", postData.id);
    console.log("tokeeeen=", token);

    axios
      .patch(
        `http://localhost:8000/api/v1/posts/${postData.id}/save`,
        null,
        config
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Post Saved");

          window.location.href = "/";
        } else {
          console.log("post is not Save");
        }
        console.log("responeeeeesssss------->", response);
      })
      .catch((error) => {
        console.log(error);
        console.log("idd==", postData.id);
      });
  };

  const handleHidePost = () => {
    // Send API request to hide the post with postId using Axios
    setIsHidden(!isHidden);

    console.log("idddddddd:", postData.id);
    if (postData.ishide === true) {
      console.log("ishide===", postData.ishide);
      postData.ishide = false;
      axios
        .delete(
          `http://localhost:8000/api/v1/posts/${postData.id}/unhide`,

          config
        )
        .then((response) => {
          if (response.status === 201) {
            console.log("Doneeee");

            window.location.href = "/";
          } else {
            console.log("faliedddddddddddddd");
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          console.log("falissssss");
        });
    } else {
      console.log("ishide===", postData.ishide);

      axios
        .patch(
          `http://localhost:8000/api/v1/posts/${postData.id}/hide`,
          null,
          config
        )
        .then((response) => {
          // Handle response
          console.log("Post hidden successfully");
        })
        .catch((error) => {
          // Handle error
          console.error("Error hiding post:", error);
        });
      postData.ishide = true;
    }
  };
  const handelUnsaved = () => {
    console.log("id posstttttt=", postData.id);
    console.log("tokeeeen=", token);

    axios
      .patch(
        `http://localhost:8000/api/v1/posts/${postData.id}/save`,
        null,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("post deleted");

          //window.location.href = "/UserSavedPost";
        } else {
          console.log("post is not delete");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log("idd==", postData.id);
      });
  };
  const handleUnHidePost = () => {
    // Send API request to hide the post with postId using Axios
    console.log("idddddddd:", postData.id);
    if (postData.ishide === true) {
      console.log("ishide===", postData.ishide);
      postData.ishide = false;
      axios
        .delete(
          `http://localhost:8000/api/v1/posts/${postData.id}/unhide`,

          config
        )
        .then((response) => {
          if (response.status === 201) {
            console.log("Doneeee");

            window.location.href = "/";
          } else {
            console.log("faliedddddddddddddd");
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          console.log("falissssss");
        });
    } else {
      console.log("ishide===", postData.ishide);

      axios
        .patch(
          `http://localhost:8000/api/v1/posts/${postData.id}/hide`,
          null,
          config
        )
        .then((response) => {
          // Handle response
          console.log("Post hidden successfully");
        })
        .catch((error) => {
          // Handle error
          console.error("Error hiding post:", error);
        });
      postData.ishide = true;
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  const handleLock = () => {
    console.log("id===", postData.id);
    console.log("tokenn===", token);
    console.log("lockeddddd------->", postData.locked);
    axios
      .patch(
        `http://localhost:8000/api/v1/posts/${postData.id}/lock`,
        null,
        config
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Doneeee");

          window.location.href = "/";
        } else {
          console.log("faliedddddddddddddd");

        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log("falissssss");
      });
  };

  
  const handleSpoiler = () => {
    console.log("id===", postData.id);
    console.log("spoiler------->", postData.spoiler);
    axios
      .patch(
        `http://localhost:8000/api/v1/posts/${postData.id}/spoiler`,
        null,
        config
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Doneeee");

          window.location.href = "/";
        } else {
          console.log("faliedddddddddddddd");

        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log("falissssss");
      });
  };
  
  const handleNSFW = () => {
    console.log("id===", postData.id);
    console.log("nsfw------->", postData.spoiler);
    axios
      .patch(
        `http://localhost:8000/api/v1/posts/${postData.id}/nsfw`,
        null,
        config
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Doneeee");

          window.location.href = "/";
        } else {
          console.log("faliedddddddddddddd");

        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log("falissssss");
      });
  };

  /////////////////////////////////////////////////////////////////////////////
  
  return (
    <div id="postcontainer" className="max-width">
      {!isDeleted && (
        <>
          <div className="post-container">
            {isHidden ? (
              <p className="deleted-post">Post hidden</p>
            ) : (
              <>
                {" "}
                <a
                  className="post-link"
                  href={`/comments/${postData.id}/${postData.title.toLowerCase().replace(/ /g, "-")}`}
                  onClick={(event) => {
                    if (
                      event.target.tagName === "BUTTON" ||
                      window.location.pathname.includes("/comments/")
                    ) {
                      event.preventDefault();
                    }
                  }}
                >
                  <article>
                    {!isEdited ? (
                      <PostDesign
                        className="post-content"
                        data-testid="post"
                        username={postData.username}
                        userpic={postData2.userpic}
                        community={postData.community}
                        incommunity={postData2.incommunity}
                        Date={new Date(postData.time).toLocaleString([], {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        title={postData.title} // Pass the title from postData
                        text={postData.content} // Pass the content from postData as text
                        image={postData.image}
                        Link={postData.Link}
                        video={postData.video}
                        spoiler={postData.spoiler}
                        mentioned={mentionedUsernames}
                      />
                    ) : (
                      <PostDesign
                        className="post-content"
                        data-testid="post"
                        username={edited.userID.username}
                        userpic={postData2.userpic}
                        community={edited.subredditID}
                        Date={new Date(edited.lastEditedTime).toLocaleString(
                          [],
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                        title={edited.title} // Pass the title from edited
                        text={edited.text_body} // Pass the content from edited as text
                        image={edited.image}
                        video={edited.video}
                        spoiler={edited.spoiler}
                        mentioned={edited.mentioned.map((obj) => obj.username)}
                      />
                    )}
                  </article>
                </a>
                <div className="options-container">
                  <Button
                    variant="danger"
                    className="options-button"
                    onClick={toggleOptions}
                  >
                    <SlOptions />
                  </Button>
                  {showOptions && (
                    <div className="options-list">
                      <ul>
                        {postData.username === username ? (
                          <>
                            <li>
                              <Edit
                                onEdit={handleEdit}
                                postContent={postData.content}
                              />
                            </li>
                            <li
                              onClick={
                                postData.issaved
                                  ? handelUnsaved
                                  : handelsavedpost
                              }
                            >
                              {postData.issaved ? (
                                <>
                                  <BookmarkAddedIcon
                                    sx={{ marginRight: "10px" }}
                                  />
                                  Remove from saved
                                </>
                              ) : (
                                <>
                                  <BookmarkAddIcon
                                    sx={{ marginRight: "10px" }}
                                  />
                                  Save
                                </>
                              )}
                            </li>
                            <li
                              onClick={
                                postData.ishide
                                  ? handleUnHidePost
                                  : handleHidePost
                              }
                            >
                              {postData.ishide ? (
                                <>
                                  <VisibilityIcon
                                    sx={{
                                      marginRight: "10px",
                                      marginBottom: "3px",
                                    }}
                                  />
                                  Un Hide
                                </>
                              ) : (
                                <>
                                  <VisibilityOffIcon
                                    sx={{
                                      marginRight: "10px",
                                      marginBottom: "3px",
                                    }}
                                  />
                                  Hide
                                </>
                              )}
                            </li>
                            <li>
                              <Delete onDelete={handleDelete} />
                            </li>
                          </>
                        ) : (
                          <>
                            <li
                              onClick={
                                postData.issaved
                                  ? handelUnsaved
                                  : handelsavedpost
                              }
                            >
                              {postData.issaved ? "Remove from saved" : "Save"}
                            </li>
                            <li
                              onClick={
                                postData.ishide
                                  ? handleUnHidePost
                                  : handleHidePost
                              }
                            >
                              {postData.ishide ? "Un Hide" : "Hide"}
                            </li>
                            <li>
                              <Report />
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="post-buttons">
                  <span
                    className={`reach ${
                      voteStatus === 1
                        ? "upvoted"
                        : voteStatus === -1
                          ? "downvoted"
                          : ""
                    }`}
                  >
                    <span className="upvote-downvote">
                      <button
                        className={`upvote ${
                          voteStatus === 1
                            ? "upvoted"
                            : voteStatus === -1
                              ? "downvoted"
                              : ""
                        }`}
                        aria-label="upvote"
                        onClick={handleUpvote}
                      >
                        <span className="flex-text">
                          <svg
                            role="svg"
                            rpl=""
                            fill="black"
                            height="16"
                            icon-name="upvote-outline"
                            viewBox="0 0 20 20"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`upvoteButton ${
                              voteStatus === 1
                                ? "upvoted"
                                : voteStatus === -1
                                  ? "downvoted"
                                  : ""
                            }`}
                          >
                            <path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z"></path>
                          </svg>
                        </span>
                      </button>

                      <span data-testid="upvote-count">{count}</span>

                      <button
                        className={`downvote ${
                          voteStatus === 1
                            ? "upvoted"
                            : voteStatus === -1
                              ? "downvoted"
                              : ""
                        }`}
                        aria-label="downvote"
                        onClick={handleDownvote}
                      >
                        <span className="flex-text">
                          <svg
                            role="svg"
                            rpl=""
                            fill="black"
                            height="16"
                            icon-name="downvote-outline"
                            viewBox="0 0 20 20"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`downvoteButton ${
                              voteStatus === 1
                                ? "upvoted"
                                : voteStatus === -1
                                  ? "downvoted"
                                  : ""
                            }`}
                          >
                            <path d="M10 20a1.122 1.122 0 0 1-.834-.372l-7.872-8.581A1.251 1.251 0 0 1 1.118 9.7 1.114 1.114 0 0 1 2.123 9H6V2.123A1.125 1.125 0 0 1 7.123 1h5.754A1.125 1.125 0 0 1 14 2.123V9h3.874a1.114 1.114 0 0 1 1.007.7 1.25 1.25 0 0 1-.171 1.345l-7.876 8.589A1.128 1.128 0 0 1 10 20Zm-7.684-9.75L10 18.69l7.741-8.44H12.75v-8h-5.5v8H2.316Zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013Z"></path>
                          </svg>
                        </span>
                      </button>
                    </span>
                  </span>

                  <span className="comments">
                    {isHomePage ? (
                      <Link
                        className="comment-link"
                        to={`/comments/${postData.id}/${postData.title.toLowerCase().replace(/ /g, "-")}`}
                      >
                        <span className="comment-container">
                          <span className="flex-text">
                            <svg
                              role="svg"
                              rpl=""
                              aria-hidden="true"
                              className="icon-comment"
                              fill="black"
                              height="20"
                              icon-name="comment-outline"
                              viewBox="0 0 20 20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.725 19.872a.718.718 0 0 1-.607-.328.725.725 0 0 1-.118-.397V16H3.625A2.63 2.63 0 0 1 1 13.375v-9.75A2.629 2.629 0 0 1 3.625 1h12.75A2.63 2.63 0 0 1 19 3.625v9.75A2.63 2.63 0 0 1 16.375 16h-4.161l-4 3.681a.725.725 0 0 1-.489.191ZM3.625 2.25A1.377 1.377 0 0 0 2.25 3.625v9.75a1.377 1.377 0 0 0 1.375 1.375h4a.625.625 0 0 1 .625.625v2.575l3.3-3.035a.628.628 0 0 1 .424-.165h4.4a1.377 1.377 0 0 0 1.375-1.375v-9.75a1.377 1.377 0 0 0-1.374-1.375H3.625Z"></path>
                            </svg>
                          </span>
                        </span>
                        <span>{postData.commentsCount}</span>
                      </Link>
                    ) : (
                      <a className="comment-link" href="#comments">
                        <span className="comment-container">
                          <span className="flex-text">
                            <svg
                              role="svg"
                              rpl=""
                              aria-hidden="true"
                              className="icon-comment"
                              fill="black"
                              height="20"
                              icon-name="comment-outline"
                              viewBox="0 0 20 20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.725 19.872a.718.718 0 0 1-.607-.328.725.725 0 0 1-.118-.397V16H3.625A2.63 2.63 0 0 1 1 13.375v-9.75A2.629 2.629 0 0 1 3.625 1h12.75A2.63 2.63 0 0 1 19 3.625v9.75A2.63 2.63 0 0 1 16.375 16h-4.161l-4 3.681a.725.725 0 0 1-.489.191ZM3.625 2.25A1.377 1.377 0 0 0 2.25 3.625v9.75a1.377 1.377 0 0 0 1.375 1.375h4a.625.625 0 0 1 .625.625v2.575l3.3-3.035a.628.628 0 0 1 .424-.165h4.4a1.377 1.377 0 0 0 1.375-1.375v-9.75a1.377 1.377 0 0 0-1.374-1.375H3.625Z"></path>
                            </svg>
                          </span>
                        </span>
                        <span>{postData.commentsCount}</span>
                      </a>
                    )}
                  </span>

                  <span className="share">
                    <button
                      className="share-button"
                      ref={buttonRef}
                      onClick={toggleMenu}
                    >
                      <span className="flex-text">
                        <svg
                          role="svg"
                          rpl=""
                          aria-hidden="true"
                          className="icon-share"
                          fill="black"
                          height="20"
                          icon-name="share-ios-outline"
                          viewBox="0 0 20 20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 11v5.378A2.625 2.625 0 0 1 16.378 19H3.622A2.625 2.625 0 0 1 1 16.378V11h1.25v5.378a1.373 1.373 0 0 0 1.372 1.372h12.756a1.373 1.373 0 0 0 1.372-1.372V11H19ZM9.375 3.009V14h1.25V3.009l2.933 2.933.884-.884-4-4a.624.624 0 0 0-.884 0l-4 4 .884.884 2.933-2.933Z"></path>
                        </svg>
                      </span>
                      <span>Share</span>
                    </button>
                  </span>
                  <div
                    className="share-menu-wrap"
                    ref={shareMenu}
                    data-testid="menu"
                  >
                    <div className="share-menu">
                      <button className="share-menu-link" onClick={copyLink}>
                        <svg
                          role="svg"
                          rpl=""
                          className="mt-[1px] ml-[4px]"
                          fill="currentColor"
                          height="20"
                          icon-name="link-post-outline"
                          viewBox="0 0 20 20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M14.111 12.5a3.701 3.701 0 0 1-1.09 2.41c-.479.47-.928.922-1.378 1.373-.45.45-.894.9-1.368 1.366a3.852 3.852 0 0 1-2.698 1.099 3.852 3.852 0 0 1-2.698-1.099 3.738 3.738 0 0 1-1.116-2.659c0-.997.402-1.953 1.116-2.658.479-.472.928-.923 1.378-1.375.45-.45.893-.9 1.368-1.365A3.936 3.936 0 0 1 9.638 8.59a3.968 3.968 0 0 1 2.24.258c.27-.269.546-.54.812-.806l.131-.13a5.086 5.086 0 0 0-3.182-.624A5.052 5.052 0 0 0 6.732 8.71c-.48.471-.929.922-1.377 1.373-.449.451-.894.9-1.37 1.366A4.982 4.982 0 0 0 2.5 14.992c0 1.328.534 2.602 1.486 3.543A5.13 5.13 0 0 0 7.58 20a5.13 5.13 0 0 0 3.595-1.465c.478-.471.927-.923 1.377-1.374.451-.451.894-.9 1.368-1.366a4.993 4.993 0 0 0 1.263-2.071c.243-.781.288-1.61.132-2.412L14.11 12.5Z"></path>
                          <path d="M16.017 1.467A5.123 5.123 0 0 0 12.422 0a5.123 5.123 0 0 0-3.595 1.467c-.478.471-.926.923-1.377 1.374-.45.451-.894.9-1.367 1.366a4.966 4.966 0 0 0-1.106 1.624 4.907 4.907 0 0 0-.291 2.86l1.2-1.19a3.699 3.699 0 0 1 1.092-2.41c.478-.472.928-.923 1.377-1.374.45-.45.894-.9 1.368-1.366a3.844 3.844 0 0 1 2.698-1.101c1.012 0 1.982.396 2.698 1.101a3.736 3.736 0 0 1 1.116 2.66c0 .996-.401 1.953-1.116 2.658-.478.471-.927.922-1.377 1.373-.45.451-.893.9-1.368 1.367a3.933 3.933 0 0 1-2.014 1.003 3.966 3.966 0 0 1-2.24-.26c-.273.274-.551.549-.818.818l-.123.12a5.087 5.087 0 0 0 3.183.624 5.053 5.053 0 0 0 2.906-1.423c.477-.472.926-.923 1.376-1.375.45-.452.894-.9 1.368-1.365A4.977 4.977 0 0 0 17.5 5.008a4.977 4.977 0 0 0-1.488-3.543l.005.002Z"></path>
                        </svg>
                        <p>Copy Link</p>
                      </button>

                      <a
                        className="share-menu-link"
                        href={`/submit?source_id=t3_${postData.id}`}
                      >
                        <svg
                          rpl=""
                          className="mt-[1px] ml-[4px]"
                          fill="currentColor"
                          height="20"
                          icon-name="crosspost-outline"
                          viewBox="0 0 20 20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m15.944 11.926-.888.879 1.925 1.945H12A4.873 4.873 0 0 1 7.138 10 4.873 4.873 0 0 1 12 5.25h4.971l-1.915 1.936.888.878L18.875 5.1a.727.727 0 0 0-.007-1.025l-2.929-2.9-.878.888L17.011 4H12a6.128 6.128 0 0 0-6.056 5.25H1v1.625h4.981A6.117 6.117 0 0 0 12 16h5l-1.94 1.92.878.89 2.929-2.9a.726.726 0 0 0 .006-1.025l-2.929-2.96Z"></path>
                        </svg>
                        <p className="crosspost">Crosspost</p>
                      </a>
                    </div>
                  </div>
                </div>
                {showAlert && (
                  <Alert variant="success" className="alert">
                    Link copied to clipboard
                  </Alert>
                )}
              </>
            )}
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default PostContainer;

PostContainer.propTypes = {};
