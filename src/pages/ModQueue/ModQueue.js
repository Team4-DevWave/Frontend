//this is page for modquue
import React from 'react';
import Header from '../../layouts/Header';
import SideBar from "../../layouts/Sidebar";
import ModNav from '../../components/Modqueue/ModqueueNavBar';
import {Meta} from '@storybook/react';

function ModQueue() {
    return (
        <div className="navbar-padding">
            <Header />
<div
></div>


            <div  sx={{ alignItems: 'center', justifyContent: 'center',paddingLeft:'0px', width: '100%', margin: 'auto', }}
            >

                <h1 className="title"
                >Modqueue</h1>
                <ModNav/>

            </div>
        </div>

    );

}
export default ModQueue;
