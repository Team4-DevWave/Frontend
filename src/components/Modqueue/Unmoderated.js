import React, { useEffect, useState } from 'react';

function Unmoderated() {
    const [unmoderatedPosts, setUnmoderatedPosts] = useState([]);

    useEffect(() => {
        const subreddit = 'yourSubreddit'; // replace with your subreddit
        const where = 'unmoderated'; // to get the unmoderated posts

        // Construct the URL for the API request
        const url = `http://localhost:8000/api/v1/r/${subreddit}/about/${where}`;

        // Use fetch API to make a GET request
        fetch(url)
            .then(response => {
                // Check if request was successful
                if(response.ok) {
                    return response.json();
                } else {
                    throw new Error('API request failed');
                }
            })
            .then(data => {
                // Set the unmoderatedPosts state variable with the data
                setUnmoderatedPosts(data.data.users);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            {unmoderatedPosts.map((post, index) => (
                <div key={index}>
                    {/* Display the unmoderated post data here */}
                    <p>{post}</p>
                </div>
            ))}
        </div>
    );
}

export default Unmoderated;