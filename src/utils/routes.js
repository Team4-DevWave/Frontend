import Login from "../pages/Login";
import Settings from "../pages/Settings/Settings";
import Signup from "../pages/Signup";
import Message from "../pages/messages/inbox.js";
import Notification from "../pages/Notification/Notificaton.js";
import Home from "../pages/Home";
import UserPage from "../pages/UserPage";
import ResetCredentials from "../pages/ResetCredentials";

const routes = {
  "/home": () => <Home />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/settings": () => <Settings />,
  "/messages": () => <Message />,
  "/user": () => <UserPage />,
  "/reset": () => <ResetCredentials />,
  "/Notification": () => <Notification />,
};
export default routes;
