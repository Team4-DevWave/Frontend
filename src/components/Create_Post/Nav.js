import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import Post from "./Post";
import Link from "./Link";
import Poll from "./Poll";
import Img from './Img';
import Header from '../Header';
function Nav() {
    const [activeNavItem, setActiveNavItem] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveNavItem(newValue);
    };

    return (
        <>
        <Header />
            <div className="posting-to-reddit-box">
            <a className="navbar-brand" href style={{fontWeight: 'bold'}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-reddit"
              viewBox="0 0 16 16"
            >
              <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165" />
            </svg>{" "}
            Threaddit
          </a>

                <ol style={{fontWeight: 'bold'}}> 
                    <li>1-Remember the human</li>
                    <li>2-Behave like you would in real life</li>
                    <li>3-Look for the original source of content</li>
                    <li>4-Search for duplicates before posting</li>
                    <li>5-Read the communitys rules</li>
                </ol>
            </div>

            <div >
                <div className="draft">
                    <h1 className='title'>Create a post</h1>
                    <div class="horizontalLine"></div>
                    <div class="dropdown-container">
                        <select id="community-dropdown" class="dropdown-select">
                            <option disabled selected>Choose a community</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>

                </div>

            </div>



            <Tabs
                className="navListsizeLg"
                value={activeNavItem}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                left
            >
                <Tab label="Post" sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: 'var(--font-medium)', '&:hover': { color: 'var(--color-black)', } }} />
                <Tab label="Image & Video" sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: 'var(--font-medium)', '&:hover': { color: 'var(--color-black)', } }} />
                <Tab label="Link" sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: 'var(--font-medium)', '&:hover': { color: 'var(--color-black)', } }} />
                <Tab label="Poll" sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: 'var(--font-medium)', '&:hover': { color: 'var(--color-black)', } }} />

            </Tabs>

            {activeNavItem === 0 && <Post />}
            {activeNavItem === 1 && <Img />}
            {activeNavItem === 2 && <Link />}
            {activeNavItem === 3 && <Poll />}


        </>
    );

}

export default Nav;
