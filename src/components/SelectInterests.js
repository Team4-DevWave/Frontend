import React, { useEffect } from "react";
import { useState } from "react";
import { Chip, Button, Box, Paper } from "@mui/material";
import { FiLogIn } from "react-icons/fi";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  trending,
  humor,
  gaming,
  nfl,
  learning,
  art,
  music,
  movies,
  books,
  food,
  travel,
  nature,
} from "../utils/preferences";

export default function SelectInterests(props) {

  const [hasPicked, setHasPicked] = React.useState(false);

  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prevSelectedInterests) =>
        prevSelectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests((prevSelectedInterests) => [
        ...prevSelectedInterests,
        interest,
      ]);
    }
  };
  useEffect(() => {
    if (selectedInterests.length > 0) {
        console.log(selectedInterests);
      setHasPicked(true);
    } else {
      setHasPicked(false);
    }
  }, [selectedInterests]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setPreferences(selectedInterests);
    console.log(selectedInterests);
  };

  return (
    
      <form className="login-form">
        <Button>
            <ArrowBackIcon onClick={() => props.setStage((prevStep) => prevStep - 1)} />
        </Button>
       

        <Paper style={{ height: 400, width: "100%", overflow: "auto",borderRadius: 25, padding: 20 }}>
        <h3>Intersests</h3>
        <h5>Pick things you'd like to see in your home feed.</h5>
          <h6>📈 Trending</h6>
          <div>
            {trending.map((interest,i) => (
              <Button
               
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
               
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🤣 Humor & Memes</h6>
          <div>
            {humor.map((interest,i) => (
              <Button
             
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🕹 Gaming</h6>
          <div>
            {gaming.map((interest,i) => (
              <Button
             
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🏈 NFL</h6>
          <div>
            {nfl.map((interest,i) => (
              <Button
              
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🧠 Learning & Science</h6>
          <div>
            {learning.map((interest,i) => (
              <Button
            
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🎨 Art & Design</h6>
          <div>
            {art.map((interest,i) => (
              <Button
              
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🎵 Music</h6>
          <div>
            {music.map((interest,i) => (
              <Button
             
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🎥 Movies & TV</h6>
          <div>
            {movies.map((interest,i) => (
              <Button
            
              sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>📚 Books</h6>
          <div>
            {books.map((interest,i) => (
              <Button
          
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🍔 Food</h6>
          <div>
            {food.map((interest,i) => (
              <Button
             
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🌍 Travel</h6>
          <div>
            {travel.map((interest,i) => (
              <Button
            
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
          <h6>🏞 Nature</h6>
          <div>
            {nature.map((interest,i) => (
              <Button
            
               sx={{borderRadius: 25, margin: "4px"}}
                key={i}
                onClick={() => toggleInterest(interest)}
              variant={selectedInterests.includes(interest) ? "contained" : "outlined"}
                style={{ margin: "4px" }}
              >
                {interest}
              </Button>
            ))}
          </div>
        </Paper>

        <Button
          data-testid="signup-btn"
          variant="contained"
          onClick={(e) => {
            props.setStage((prevStep) => prevStep + 1);
            handleSubmit(e);
          }}
          sx={{
            width: "100%",
            borderRadius: "25px",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#FF5700",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
          startIcon={<FiLogIn />}
          disabled={!hasPicked}
          type="submit"
        >
          {hasPicked ? "Continue" : "Pick at least one interest"}
        </Button>
      </form>
    
  );
}
