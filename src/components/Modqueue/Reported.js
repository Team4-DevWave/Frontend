import React, { useEffect, useState } from 'react';

function Reported() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const subreddit = 'yourSubreddit'; // replace with your subreddit
        const where = 'reports'; // to get the reported posts

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
                // Set the reports state variable with the data
                setReports(data.data.users);
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            {reports.map((report, index) => (
                <div key={index}>
                    {/* Display the report reason and post data here */}
                    <h3>Report Reason: {report.reason}</h3>
                    <p>{report.post}</p>
                </div>
            ))}
        </div>
    );
}

export default Reported;