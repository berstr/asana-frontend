import React from "react";
import axios from "axios";

interface TasksSearchProps {
  onFilterChange: (newFilter:string) => void;
  filterProps: string;
}

export default function TasksSearch({filterProps, onFilterChange}:TasksSearchProps): JSX.Element {
  const [filter,setFilter] = React.useState(filterProps);

  //const onClickSearch = () => { onFilterChange(filter); }
  const onClickSearchReset = () => { setFilter(''); onFilterChange('') }

  const filterChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFilter(event.target.value)
  }

  const filterEnterHandler = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onFilterChange(filter)
    }
  }

  React.useEffect(() => {setFilter(filterProps)},[filterProps])

  return (
      <div>
        <label style={{ fontSize: '11px' }}>Title Search: </label>
        <input type="text" value={filter} onKeyPress={filterEnterHandler} onChange={filterChangeHandler} />        
        <button style={{ fontSize: '11px' }} onClick={onClickSearchReset}>Reset</button>
      </div>
  );
}





interface TasksDetailSearchProps {
  onFilterChange: any;
  searchText: string;
}

export function TasksDetailSearch({searchText, onFilterChange}:TasksDetailSearchProps): JSX.Element {
  const [text,setFilter] = React.useState(searchText);

  //const onClickSearch = () => { onFilterChange(filter); }
  const onClickSearchReset = () => { setFilter(''); onFilterChange(undefined,'') }

  const filterChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFilter(event.target.value)
  }

  const filterEnterHandler = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
            onFilterChange( text)
    }
  }

  React.useEffect(() => {
    // console.log(`Tasks.TasksDetailSearch() - useEffect() - text: ${searchText}`)
    setFilter(searchText)
  },[searchText])

  return (
      <div>
        <label style={{ fontSize: '11px' }}>Asana Search: </label>
        <input type="text" value={text} onKeyPress={filterEnterHandler} onChange={filterChangeHandler} />        
        <button style={{ fontSize: '11px' }} onClick={onClickSearchReset}>Reset</button>
      </div>
  );
}


