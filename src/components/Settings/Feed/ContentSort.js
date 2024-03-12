import React, { useState } from 'react';
import CustomSelect from '../../MUIEdited/CustomSelect';
import CustomSelectFeed from '../../MUIEdited/CustomSelectFeed';
import CustomSnackbar from '../../MUIEdited/CustomSnackbar';

function ContentSort() {
    const [isSnackbarOpenContentSort, setIsSnackbarOpenContentSort] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Hot');

    const handleChangeContentSort = () => {
        setIsSnackbarOpenContentSort(true);
    };

    const handleCloseSnackbarContentSort = () => {
        setIsSnackbarOpenContentSort(false);
    };

    return (
        <div className="settingsItem">
            <div>
                <h2 className="titleBody-2">Community content sort</h2>
                <p className="settingsParagraph">Choose how you would like content organized in communities you visit. This will not affect global feeds such as Home, or Popular.</p>
            </div>
            <CustomSelectFeed setSelectedOption={setSelectedOption} defaultValue="Hot" values={['Hot', 'New', 'Top', 'Rising']} mr='none' ml='auto' onSelection={handleChangeContentSort}/>
            {selectedOption === 'Top' && (
                <CustomSelect defaultValue="Now" values={['Now', 'Today', 'This Week', 'This Month', 'This Year']}  mr='none' ml='auto' />
            )}
            <CustomSnackbar
                isOpen={isSnackbarOpenContentSort}
                message="Content Sort changed successfully!"
                severity="success"
                onClose={handleCloseSnackbarContentSort}
            />
        </div>
    );
}

export default ContentSort;
