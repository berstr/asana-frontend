import React from "react";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

interface RefeshProps {
    onClickHandler: any;
}

export default  function Refesh({onClickHandler}:RefeshProps): JSX.Element {

    return (
        <button style={{ fontSize: '12px' }} onClick={onClickHandler}>Refresh</button>
    )
}
