import React from "react";
//import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

interface TasksPriorityProps {
    label: string;
    checked: boolean;
    onClickHandler: any;
}

const useStyles = makeStyles({
    input: {
        height: "2px",
        margin: '0px',
        //boxSizing: "border-box" // <-- add this
    }
  });

export default  function TasksPriority({label, checked, onClickHandler}:TasksPriorityProps): JSX.Element {

    const classes = useStyles();
    
    const check: JSX.Element = <Checkbox size="small" color="primary" classes={{ root: classes.input }}style={{ margin: '0px' }}  onClick={() => onClickHandler(label)} />

    

    return (
        <FormGroup >
            <FormControlLabel control={check} checked={checked} label={<span style={{fontSize: '10px', margin: '0px'}}>{label}</span>} />
        </FormGroup>
    )
  }

