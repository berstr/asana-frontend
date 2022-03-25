import React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';


import ProjectType , { SectionType, TaskType, SubtaskType  } from '../../types/ProjectTypes'




export interface TaskNoteI {
    url: string;
    html: string;
    gid: string;
    tags: string[];
    project: ProjectType;
    section: SectionType;
    task: TaskType;
    subtask: SubtaskType;
}

interface TaskNoteProps {
    note: TaskNoteI;
    handleTaskNoteClick: any;
}

export default function TaskNote({note, handleTaskNoteClick}: TaskNoteProps): JSX.Element {

    return (
        <Stack direction="column" spacing={1} divider={<Divider orientation="horizontal" flexItem />} >

            { 
                console.log(`TaskNote:render() - note: `)
            }
            {
                                console.log(note)

            }
            <OpenTaskorSubTask note={note} />

            <div style={{ fontSize: '11px' }}>{note.project.name} / {note.section.name} / {note.task.name}</div>

            <Stack direction="row" spacing={1}  >
                <Tags tags={note.tags} />
            </Stack>

            <Stack direction="row" spacing={2}  >
                    {
                        (note.subtask != undefined)                        
                        ?
                        <Stack direction="row" spacing={2}  >
                            <div style={{ fontSize: '12px' }}>Due on:</div>
                            <Paper elevation={3}>
                                <div style={{ fontSize: '12px' }}>{note.subtask.due_on != undefined ? note.subtask.due_on : '' }</div>
                            </Paper>
                        </Stack>
                        :
                        <></>
                    }                                            
            </Stack>

            <Stack direction="row" spacing={2}  >
                <button onClick={() => {handleTaskNoteClick(note.gid, note.url)}}>
                        { note.subtask != undefined ? 'Refresh Sub-Task' : 'Refresh Task' }
                </button>
                <></>
            </Stack>

            {
                note.subtask == undefined
                &&
                <>
                    <u style={{ fontSize: '12px' }}>Subtasks:</u>
                    <Subtasks note={note} />
                </>
            }                        

            <Card >
                <CardContent>
                    <div style={{whiteSpace: 'pre-wrap', fontSize: 12}} dangerouslySetInnerHTML={{ __html: note.html}} />
                </CardContent>
            </Card>
        </Stack>                                    
    )

}



interface OpenTaskorSubTaskProps {
    note: TaskNoteI;
}

function OpenTaskorSubTask({note}:OpenTaskorSubTaskProps): JSX.Element {

    const style = { fontSize: '12px', fontWeight: 'bold' }
    const buttonText = 'Open Asana'

    return (
        <>
        {
            note.subtask != undefined
            ?
                <div style={style} ><a href={note.url} target='_blank'><button>{buttonText}</button></a> &nbsp; &nbsp; {note.subtask.name}</div>
            :
                <div style={style} ><a href={note.url} target='_blank'><button>{buttonText}</button></a> &nbsp; &nbsp; {note.task.name}</div>
        }
        </>
    )

}

interface SubtaskProps {
    note: TaskNoteI;
}

function Subtasks({note}:SubtaskProps)  {

    return (
        <>
            {
                note.task.subtasks.map(subtask => {
                    const url = `https://app.asana.com/0/${note.project.gid}/${subtask.gid}/f`
                    return  ( 
                        subtask.completed==false
                        &&
                        <div  key={subtask.gid}>
                            <a style={{fontSize: '12px'}} href={url} target='_blank'>{subtask.name}</a>
                        </div> 
                    )
                })
            }
            {
                note.task.subtasks.map(subtask => {
                    const url = `https://app.asana.com/0/${note.project.gid}/${subtask.gid}/f`
                    return  ( 
                        subtask.completed==true
                        &&
                        <div  key={subtask.gid}>
                            <a style={{fontSize: '12px', fontStyle: 'italic', color: 'gray'}} href={url} target='_blank'>Closed: &nbsp;{subtask.name}</a>
                        </div> 
                    )
                })
            }
        </>
    )
}

interface TagsProps {
    tags: string[];
}

function Tags({tags}:TagsProps) {
    return (
        <>
          <span style={{ fontSize: '12px' }} >Tags | </span>
          {
              tags.map(tag => {
                  return <button  style={{ fontSize: '11px', marginRight: '5px' }} >{tag}</button>
              })
          }
        </>
    )
}
