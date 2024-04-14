import { useGoogleLogin } from "@react-oauth/google";
export const googleLogin = useGoogleLogin({
    clientId:
      "500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
    onSucess: (response) => {
      console.log(response);
    },
    onFail: (response) => {
      console.log(response);
    },
    onRequest: () => {
      console.log("loading");
    },
    onLogout: () => {
      console.log("logout");
    },
  });