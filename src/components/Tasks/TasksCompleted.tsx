import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    input: {
      height: "20px",
      boxSizing: "border-box" // <-- add this
    }
  });

interface TasksCompletedProps {
    onClickHandler: any;
    checked:boolean;
}


export default  function TasksCompleted({onClickHandler, checked}:TasksCompletedProps): JSX.Element {

    const classes = useStyles();
    const check: JSX.Element = <Checkbox color="primary" size="medium" classes={{ root: classes.input }} checked={checked} onClick={onClickHandler} />

    return (
        <FormGroup>
            <FormControlLabel control={check} label={<span style={{ fontSize: '12px' }}>Completed Tasks</span>} />
        </FormGroup>
    )
  }

