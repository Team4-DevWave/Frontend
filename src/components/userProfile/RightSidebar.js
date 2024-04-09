const RightSidebar = ({ username = "Anonymous", postKarma = 0, commentKarma = 0, cakeDay = "Unknown", goldReceived = 0, socialLinks = [], moderationTools = [] }) => {
  return (
    <div className="right-sidebar">
      <div className="user-info">
        <img src="/avatar.jpg" alt={username} className="avatar" />
        <h3>{username}</h3>
        <p>Post Karma: {postKarma}</p>
        <p>Comment Karma: {commentKarma}</p>
        <p>Cake Day: {cakeDay}</p>
        <p>Gold Received: {goldReceived}</p>
      </div>
      <hr />
      <div className="settings">
        <button className="edit-profile">Edit Profile</button>
      </div>
      <hr />
      <div className="moderation">
        <h3>Moderation</h3>
        <ul>
          {moderationTools.map((tool, index) => (
            <li key={index}>{tool}</li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="links">
        <h3>Links</h3>
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
