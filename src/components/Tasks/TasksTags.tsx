import React from "react";


interface TasksTagsProps {
    onTagsClick: (tag:string) => void;
    tags: string[];
}

export default function TasksTags({tags, onTagsClick}:TasksTagsProps): JSX.Element {

   

  return (
      <div>
          <span style={{ fontSize: '11px' }}>Tags |&nbsp;</span>
          {
              tags.map(tag => {
                  return <button  style={{ fontSize: '11px', marginRight: '10px' }} onClick={() => onTagsClick(tag)} >&nbsp;{tag}</button>
              })
          }
      </div>
  );
}

