import React from "react";

import { makeStyles } from "@material-ui/core/styles";


interface TagsSearchProps {
    text: string;
    onSearchHandler: any;
}

const useStyles = makeStyles({
    input: {
        height: "1px",
        boxSizing: "border-box" // <-- add this
    }
  });

export default  function TagsSearch({text, onSearchHandler}:TagsSearchProps): JSX.Element {

    const [searchText,setSearchText] = React.useState('');

  const onClickSearchReset = () => { setSearchText(''); onSearchHandler('') }

  const filterChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchText(event.target.value)
  }

    const filterEnterHandler = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (searchText == '') {
                onSearchHandler('')
            }
            else {
                onSearchHandler(searchText)
            }
        }
    }

    const classes = useStyles();

    return (
        <div>
          <label style={{ fontSize: '11px' }}>Search: </label>
          <input type="text" value={searchText} onKeyPress={filterEnterHandler} onChange={filterChangeHandler} />        
          <button style={{ fontSize: '11px' }} onClick={onClickSearchReset}>Reset</button>
        </div>
    );
}

