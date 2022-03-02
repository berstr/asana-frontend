import React from "react";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from "@material-ui/core/styles";

import { TagFilterOptions } from '../../types/TagType'


interface TagsFilterProps {
    option: TagFilterOptions;
    onClickHandler: any;
}

const useStyles = makeStyles({
    input: {
        height: "1px",
        boxSizing: "border-box" // <-- add this
    }
  });

export default  function TagsFilter({option, onClickHandler}:TagsFilterProps): JSX.Element {

    const [selected,setSelected] = React.useState<TagFilterOptions>(option)

    //const classes = useStyles();

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
      //console.log(`TagsFilter:handleChange() - onClickhandler(${(event.target as HTMLInputElement).value})`)
      const selection : TagFilterOptions = (event.target as HTMLInputElement).value as TagFilterOptions
      //console.log(`TagsFilter:handleChange() - selection: ${selection}`)
      setSelected(selection)
      onClickHandler(selection);
    };

    React.useEffect(() => { setSelected(option)},[option])

    return (
        <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={selected}
          onChange={handleChange}
        >
          <FormControlLabel value={TagFilterOptions.Any} control={<Radio size="small" />} label={<span style={{ fontSize: '10px' }}>{TagFilterOptions.Any} </span>} />
          <FormControlLabel value={TagFilterOptions.All} control={<Radio  size="small" />} label={<span style={{ fontSize: '10px' }}>{TagFilterOptions.All} </span>} />
        </RadioGroup>
      </FormControl>
      );
   
}

