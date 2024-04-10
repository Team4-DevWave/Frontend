import { useState, useEffect } from 'react';
import axios from 'axios';

const useCountry = () => {
  const [country, setCountry] = useState('');

  useEffect(() => {
    const getCountry = async () => {
      const result = await axios.get("https://ipapi.co/json/");
      setCountry(result.data.country_name);
    };
    getCountry();
  }, []);

  return country;
};

export default useCountry;