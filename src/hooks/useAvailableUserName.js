import React from "react";
import { useEffect } from "react";
import axios from "axios";

export default function useAvailableUserName(name) {
  const [available, setAvailable] = React.useState(false);
  
  useEffect(() => {
    axios
      .get(`https://www.threadit.tech/api/v1/users/check/${name}`)
      .then((response) => {
        if (response.status === 200) {
          setAvailable(true);
        }
      }).catch((error) => {
        setAvailable(false);
      });
  }, [name]);

  return available;
}