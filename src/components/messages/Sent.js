function Sent({ sentMessages }) {
    return (
        <div>
            <div className="header">
                <h1 className='title'>Sent Messages</h1>
                <div className="horizontalLine"></div>
            </div>
            {sentMessages.length === 0 && <p>There doesn't seem to be anything here</p>}
            {sentMessages.map((message, index) => (
                <div key={index}>
                    <h2>To: {message.to}</h2>
                    <h3>Subject: {message.subject}</h3>
                    <h4>{message.message}</h4>
                </div>
            ))}
        </div>
    );
}

export default Sent;