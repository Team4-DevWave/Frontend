import React, { useEffect, useState } from 'react';

function Removed() {
    const [removedPosts, setRemovedPosts] = useState([]);

    useEffect(() => {
        const subreddit = 'yourSubreddit'; // replace with your subreddit
        const where = 'removed'; // to get the removed posts

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
                // Set the removedPosts state variable with the data
                setRemovedPosts(data.data.users);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            {removedPosts.map((post, index) => (
                <div key={index}>
                    {/* Display the removed post data here */}
                    <p>{post}</p>
                </div>
            ))}
        </div>
    );
}

export default Removed;