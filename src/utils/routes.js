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

const routes = {
  "/": () => <Home />,
  "/home": () => <Home />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/settings": () => <Settings />,
  "/messages": () => <Message />,
  "/user": () => <UserPage />,
  "/reset": () => <ResetCredentials />,
  "/Notification": () => <Notification />,
  "/CreatePost": () => <CreatePost />,
  "/profile": () => <Profile />,
 "/r/:subreddit":() => <Subreddit name = "Persona3" description = "h" rules = "h" members="h" />,

 //**These are test routes and will be removed upon integration */
 "/selectgender": () => <SelectGender />,
 "/selectinterests": () => <SelectInterests />,
 "/selectusername": () => <SelectUsername />,
};
export default routes;
