import React from "react";
import { Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    input: {
      height: "20px",
      boxSizing: "border-box" // <-- add this
    }
  });

interface TasksTagsAllProps {
    onTagsAllClick: () => void;
    checked: boolean;
}

export default function TasksTagsAll({onTagsAllClick, checked}:TasksTagsAllProps): JSX.Element {

    const classes = useStyles();
    const check: JSX.Element = <Checkbox color="primary" classes={{ root: classes.input }} style={{ fontSize: '10px' }} checked={checked} onClick={() => onTagsAllClick()} />
    const label: string = 'All Tags'

    return (
        <FormGroup >
            <FormControlLabel control={check} label={<span style={{ fontSize: '10px' }}>{label}</span>} />
        </FormGroup>
    )
}

