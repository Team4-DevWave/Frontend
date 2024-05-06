import Login from "../pages/Login";
import Settings from "../pages/Settings/Settings";
import Signup from "../pages/Signup";
import Message from "../pages/messages/inbox.js";
import Notification from "../pages/Notification/Notificaton.js";
import Home from "../pages/Home";
import UserPage from "../pages/UserPage";
import ResetCredentials from "../pages/ResetCredentials";
import CreatePost from "../components/Create_Post/Nav";
import Profile from "../pages/Profile.js";
import Subreddit from "../pages/Subreddit";
import SelectGender from "../components/SelectGender.js";
import SelectInterests from "../components/SelectInterests.js";
import SelectUsername from "../components/SelectUsername.js";
import Comments from "../components/UserTabs/Comments.js";
import UserSavedPost from "../components/UserTabs/UserSavedPost.js";
import UserPost from "../components/UserTabs/UserPost.js";
import UserHiddenPost from "../components/UserTabs/UserHiddenPost.js";
import UserComments from "../components/UserTabs/UserComments.js";
import OverView from "../components/UserTabs/Overview.js";
import Upvoted from "../components/UserTabs/Upvoted.js";
import Downvoted from "../components/UserTabs/Downvoted.js";
import { useParams } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import Chat from "../pages/chat/ChatPage.js";
import ModQueue from "../pages/ModQueue/ModQueue";

function CommentsRoute({ toggleTheme }) {
  const { id, title } = useParams();
  return <Comments postID={id} postTitle={title} toggleTheme={toggleTheme} />;
}

const routes = {
  "/": ({ toggleTheme }) => <Home toggleTheme={toggleTheme} />,
  "/home": ({ toggleTheme }) => <Home toggleTheme={toggleTheme} />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/settings": ({ toggleTheme }) => <Settings toggleTheme={toggleTheme} />,
  "/messages": ({ toggleTheme }) => <Message toggleTheme={toggleTheme} />,
  "/user/:username": ({ toggleTheme }) => (
    <UserPage toggleTheme={toggleTheme} />
  ),
  "/reset": () => <ResetCredentials />,
  "/Notification": ({ toggleTheme }) => (
    <Notification toggleTheme={toggleTheme} />
  ),
  "/CreatePost": ({ toggleTheme }) => <CreatePost toggleTheme={toggleTheme} />,
  "/profile": ({ toggleTheme }) => <Profile toggleTheme={toggleTheme} />,
  "/r/:subredditName": ({ toggleTheme }) => (
    <Subreddit toggleTheme={toggleTheme} />
  ),
  "/modqueue": ({ toggleTheme }) => <ModQueue toggleTheme={toggleTheme} />,
  "/comments/:id/:title": CommentsRoute,
  "search/:query": ({ toggleTheme }) => (
    <SearchPage toggleTheme={toggleTheme} />
  ),

  //**These are test routes and will be removed upon integration */
  "/selectgender": () => <SelectGender />,
  "/selectinterests": () => <SelectInterests />,
  "/selectusername": () => <SelectUsername />,
  "/usersavedpost": ({ toggleTheme }) => (
    <UserSavedPost toggleTheme={toggleTheme} />
  ),
  "/userpost": ({ toggleTheme }) => <UserPost toggleTheme={toggleTheme} />,
  "/userhiddenpost": ({ toggleTheme }) => (
    <UserHiddenPost toggleTheme={toggleTheme} />
  ),
  "/usercomments": ({ toggleTheme }) => (
    <UserComments toggleTheme={toggleTheme} />
  ),
  "/overview": ({ toggleTheme }) => <OverView toggleTheme={toggleTheme} />,
  "/upvoted": ({ toggleTheme }) => <Upvoted toggleTheme={toggleTheme} />,
  "/downvoted": ({ toggleTheme }) => <Downvoted toggleTheme={toggleTheme} />,
  "/chat": ({ toggleTheme }) => <Chat toggleTheme={toggleTheme} />,
};
export default routes;
