
import { React, useState, createContext } from "react";
import { Tabs, Tab } from '@mui/material';
import Post from "./Post";
import Img from "./Img";
import Link from "./Link";
import Poll from "./Poll";

export const Datadraft = createContext([]);

// export default function Datashared1(num) {


//     function handleAddItems(item) {

//         setdraftItems((items) => [...items, item]);
//     }
//     if (num === 1) {
//         return (draftitems);

//     }

// }

const DatadraftProvider = ({ children }) => {
    const [name, setName] = useState(undefined);
 
    return (
        <Datadraft.Provider value={{ name, setName }}>
            {children}
        </Datadraft.Provider>
    );
};
const Datashared1 = () => {
    return (
        <div>
            <DatadraftProvider>
                <Post />
                <Img />
            </DatadraftProvider>
        </div>
    );
};
export default Datashared1