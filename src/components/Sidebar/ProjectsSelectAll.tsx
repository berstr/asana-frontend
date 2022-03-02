import React from "react";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';


interface ProjectsSelectAllProps {
    onClickHandler: any;
}


export default  function ProjectsSelectAll({onClickHandler}:ProjectsSelectAllProps): JSX.Element {
    
    return (
        <Stack direction="row" spacing={3} >
                <button style={{ fontSize: '12px' }} onClick={() => { onClickHandler('selectAll')}}>Select All</button>
                <button style={{ fontSize: '12px' }} onClick={() => { onClickHandler('deselectAll')}}>Deselect All</button>
        </Stack>
    )
}
