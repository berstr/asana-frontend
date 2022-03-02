import React, { MouseEvent } from 'react';
import { makeStyles } from "@material-ui/core/styles";



interface ResetFilterProps {
    onClickHandler: any;
}


export default  function ResetFilter({onClickHandler}:ResetFilterProps): JSX.Element {

    return (
        <button style={{ fontSize: '11px' }} onClick={onClickHandler}>Reset Filter</button>
    )
  }
