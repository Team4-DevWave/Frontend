import React from 'react';

function Header() {
  return (
    <header id="header">
      {/* NAV BAR */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="#header">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-reddit" viewBox="0 0 16 16">
              <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165" />
            </svg> Threaddit
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#header">
                  <svg rpl="" fill="currentColor" height="20" icon-name="conversion" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.75799 11.0341L7.34299 12.4641C6.50628 12.3459 5.71928 11.9962 5.07089 11.4543C4.4225 10.9124 3.93855 10.2001 3.67371 9.39764C3.40887 8.59521 3.3737 7.73471 3.57217 6.91334C3.77063 6.09198 4.19483 5.34248 4.79684 4.74951C5.39885 4.15653 6.15468 3.74372 6.97895 3.5577C7.80323 3.37168 8.66309 3.41986 9.46142 3.69681C10.2598 3.97375 10.9647 4.46842 11.4967 5.12494C12.0287 5.78145 12.3665 6.57366 12.472 7.41205L11.054 6.81805C10.8579 6.31223 10.5393 5.863 10.1267 5.51068C9.7142 5.15836 9.22065 4.91397 8.69037 4.79945C8.16009 4.68492 7.60967 4.70383 7.0885 4.8545C6.56733 5.00516 6.09172 5.28285 5.70435 5.66266C5.31697 6.04247 5.02995 6.51251 4.86904 7.0306C4.70813 7.5487 4.67836 8.09864 4.7824 8.63107C4.88645 9.16351 5.12105 9.66179 5.46516 10.0812C5.80928 10.5006 6.25213 10.828 6.75399 11.0341H6.75799ZM3.22699 12.7721C2.60032 12.1453 2.10325 11.4012 1.76415 10.5823C1.42505 9.76335 1.25056 8.88568 1.25066 7.99934C1.25084 6.20931 1.96211 4.49266 3.22799 3.22705C4.49387 1.96144 6.21066 1.25053 8.0007 1.25072C9.79073 1.2509 11.5074 1.96217 12.773 3.22805C13.4019 3.85308 13.9005 4.59672 14.2398 5.41587C14.5792 6.23502 14.7526 7.11339 14.75 8.00005C14.75 8.12105 14.739 8.24005 14.732 8.36005L15.95 8.87005C15.9823 8.58116 15.9989 8.29074 16 8.00005C16 6.41776 15.5309 4.87098 14.6518 3.55534C13.7728 2.23969 12.5233 1.21426 11.0615 0.60874C9.59965 0.00321448 7.99107 -0.155213 6.43919 0.153493C4.8873 0.462199 3.46181 1.22417 2.34299 2.34305C1.22411 3.46187 0.462138 4.88736 0.153432 6.43925C-0.155274 7.99113 0.00315344 9.59971 0.608679 11.0616C1.2142 12.5234 2.23963 13.7729 3.55528 14.6519C4.87092 15.5309 6.4177 16.0001 7.99999 16.0001C8.25799 16.0001 8.51566 15.9877 8.77299 15.9631L8.27299 14.7381C7.34155 14.7782 6.41195 14.6241 5.54325 14.2857C4.67455 13.9472 3.88576 13.4318 3.22699 12.7721ZM12.851 19.9131L14.051 17.0391L16.072 19.0501C16.2032 19.181 16.3811 19.2546 16.5665 19.2546C16.7519 19.2546 16.9298 19.181 17.061 19.0501L18.947 17.1801C19.0789 17.0497 19.1537 16.8724 19.155 16.687C19.1564 16.5016 19.0841 16.3232 18.954 16.1911L16.96 14.1531L19.46 13.1291C19.5877 13.0759 19.6969 12.986 19.7736 12.8709C19.8503 12.7557 19.8911 12.6204 19.891 12.4821L19.852 12.0001L8.71099 7.26205C8.51114 7.17944 8.29138 7.15756 8.07916 7.19915C7.86695 7.24075 7.6717 7.34398 7.51783 7.49593C7.36396 7.64788 7.25829 7.84181 7.21404 8.05348C7.16978 8.26516 7.18889 8.48518 7.26899 8.68605L11.717 19.5251C11.7696 19.6532 11.8591 19.7628 11.9741 19.8401C12.0891 19.9174 12.2245 19.9588 12.363 19.9591L12.851 19.9131ZM17.764 12.4771L14.772 13.7001L17.684 16.6771L16.572 17.7771L13.621 14.8391L12.371 17.8201L8.61299 8.64205L17.764 12.4771Z" fill="currentColor"></path>
                  </svg>
                </a>
              </li>
              {/* Other list items */}
            </ul>
            <div className="container">
              <div className="search-box">
                <input type="text" placeholder="Search in r/" />
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <hr />
    </header>
  );
}

export default Header;