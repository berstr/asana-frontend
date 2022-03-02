import React from "react";
//import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    input: {
      height: "20px",
      boxSizing: "border-box" // <-- add this
    }
  });

export interface TasksDatesI {
    past: boolean;
    pastQuarter: boolean;
    today:boolean;
    tomorrow: boolean;
    week:boolean;
    none:boolean;
    // twoWeeks:boolean;
    month:boolean;
    // nextMonth:boolean;
    quarter:boolean;
    // nextQuarter:boolean;
}

interface TasksDatesProps {
    dates: TasksDatesI;
    onClickHandler: any;
}



export default  function TasksDates({dates, onClickHandler}:TasksDatesProps): JSX.Element {

    const classes = useStyles();
    const checkPast: JSX.Element = <Checkbox size="small" color="primary" classes={{ root: classes.input }} onClick={() => onClickHandler('past')} />
    const checkPastQuarter: JSX.Element = <Checkbox size="small" color="primary" classes={{ root: classes.input }} onClick={() => onClickHandler('pastQuarter')} />
    const checkToday: JSX.Element = <Checkbox size="small" color="primary" classes={{ root: classes.input }} onClick={() => onClickHandler('today')} />
    const checkTomorrow: JSX.Element = <Checkbox size="small" color="primary" classes={{ root: classes.input }} onClick={() => onClickHandler('tomorrow')} />
    const checkWeek: JSX.Element = <Checkbox size="small" color="primary" classes={{ root: classes.input }} onClick={() => onClickHandler('week')} />
    const checkMonth: JSX.Element = <Checkbox size="small" color="primary" classes={{ root: classes.input }} onClick={() => onClickHandler('month')} />
    const checkQuarter: JSX.Element = <Checkbox size="small" color="primary" classes={{ root: classes.input }} onClick={() => onClickHandler('quarter')} />
    const checkNone: JSX.Element = <Checkbox size="small" color="primary" classes={{ root: classes.input }} onClick={() => onClickHandler('none')} />

    return (
        <>
           <FormGroup >
                <FormControlLabel control={checkPast} checked={dates.past} label={<span style={{ fontSize: '10px' }}>Past</span>} />
            </FormGroup >

            <FormGroup >
                <FormControlLabel control={checkPastQuarter} checked={dates.pastQuarter} label={<span style={{ fontSize: '10px' }}>Past Quarter</span>} />
            </FormGroup >

            <FormGroup >
                <FormControlLabel control={checkToday} checked={dates.today} label={<span style={{ fontSize: '10px' }}>Today</span>} />
            </FormGroup >
            <FormGroup >
                <FormControlLabel control={checkTomorrow} checked={dates.tomorrow} label={<span style={{ fontSize: '10px' }}>Tomorrow</span>} />
            </FormGroup >
            <FormGroup >
                <FormControlLabel control={checkWeek} checked={dates.week} label={<span style={{ fontSize: '10px' }}>Week</span>} />
            </FormGroup >
            <FormGroup >
                <FormControlLabel control={checkMonth} checked={dates.month} label={<span style={{ fontSize: '10px' }}>Month</span>} />
            </FormGroup >
            <FormGroup >
                <FormControlLabel control={checkQuarter} checked={dates.quarter} label={<span style={{ fontSize: '10px' }}>Quarter</span>} />
            </FormGroup >

            <FormGroup >
                <FormControlLabel control={checkNone} checked={dates.none} label={<span style={{ fontSize: '10px' }}>None</span>} />
            </FormGroup >
        </>
    )
  }

