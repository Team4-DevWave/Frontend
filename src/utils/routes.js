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

function CommentsRoute() {
  const { id, title } = useParams();
  return <Comments postID={id} postTitle={title} />;
}

const routes = {
  "/": () => <Home />,
  "/home": () => <Home />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/settings": () => <Settings />,
  "/messages": () => <Message />,
  "/user/:username": () => <UserPage />,
  "/reset": () => <ResetCredentials />,
  "/Notification": () => <Notification />,
  "/CreatePost": () => <CreatePost />,
  "/profile": () => <Profile />,
  "/r/:subredditName": () => (
    <Subreddit name="Persona3" description="h" rules="h" members="h" />
  ),
  "/modqueue": () => <ModQueue />,
  "/comments/:id/:title": CommentsRoute,
  "search/:query": () => <SearchPage />,

  //**These are test routes and will be removed upon integration */
  "/selectgender": () => <SelectGender />,
  "/selectinterests": () => <SelectInterests />,
  "/selectusername": () => <SelectUsername />,
  "/usersavedpost": () => <UserSavedPost />,
  "/userpost": () => <UserPost />,
  "/userhiddenpost": () => <UserHiddenPost />,
  "/usercomments": () => <UserComments />,
  "/overview": () => <OverView />,
  "/upvoted": () => <Upvoted />,
  "/downvoted": () => <Downvoted />,
  "/chat": () => <Chat />,
};
export default routes;
