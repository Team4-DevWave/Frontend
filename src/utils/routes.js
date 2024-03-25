import Login from "../pages/Login";
import Settings from "../pages/Settings/Settings";
import Signup from "../pages/Signup";
import Message from "../pages/messages/inbox.js";
import Notification from "../pages/Notification/Notificaton.js";
import Home from "../pages/Home";
import UserPage from "../pages/UserPage";
import ResetCredentials from "../pages/ResetCredentials";
import CreatePost from "../components/Create_Post/Nav.js";
import CreatePost from "../components/Create_Post/Nav";

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
};
export default routes;
