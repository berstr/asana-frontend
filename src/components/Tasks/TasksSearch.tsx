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
  project_gids: string[];
}

export function TasksDetailSearch({project_gids, onFilterChange}:TasksDetailSearchProps): JSX.Element {
  const [text,setFilter] = React.useState('');

  //const onClickSearch = () => { onFilterChange(filter); }
  const onClickSearchReset = () => { setFilter(''); onFilterChange(undefined) }

  const filterChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFilter(event.target.value)
  }

  const filterEnterHandler = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      //console.log(`Tasks.TasksDetailSearch() - text: ${text} - trigger Asana search - project gids: ${project_gids.join(',')}`)
      if (text != '') {
        axios
        .get(`http://localhost:37070/projects/search?project_gids=${project_gids.join(',')}&text=${text}`,{ headers: {  'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}})
        .then((response) => {
            //console.log(`Tasks.TasksDetailSearch() - text: ${text} - Asana response: ${response.data.tasks}`)
            //console.log(response.data)

            onFilterChange(response.data.tasks)
        });
      }
      else {
        onFilterChange(undefined)
      }
    }
  }

  return (
      <div>
        <label style={{ fontSize: '11px' }}>Asana Search: </label>
        <input type="text" value={text} onKeyPress={filterEnterHandler} onChange={filterChangeHandler} />        
        <button style={{ fontSize: '11px' }} onClick={onClickSearchReset}>Reset</button>
      </div>
  );
}


