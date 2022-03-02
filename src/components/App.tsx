import React from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import '../../styles/main.css'

import { styled } from '@mui/material/styles';

import ResetFilter from './ResetFilter'
import Tasks from './Tasks/Tasks'
import TasksDates , {TasksDatesI} from './Tasks/TasksDates'
import TaskNote, {TaskNoteI} from './TaskNote/TaskNote'
import Refresh from './Refresh'
import ProjectsSelectAll from './Sidebar/ProjectsSelectAll'
import SidebarProject from './Sidebar/SidebarProject'
import SidebarTags from './Sidebar/SidebarTags'
import SidebarTagsFilter from './Sidebar/SidebarTagsFilter'
import SidebarTagsSelected from './Sidebar/SidebarTagsSelected'
import SidebarTagsSearch from './Sidebar/SidebarTagsSearch'
import ProjectType , { filterProject, SectionType, SubtaskType, TaskType } from '../types/ProjectTypes'
import TagType, { TagFilterOptions } from '../types/TagType'




const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function App() {

    const [projects, setProjects] = React.useState<ProjectType[]>([]);
    const [projectsSelected, setProjectsSelected] = React.useState<string[]>(['1200799299933135']);  // Test: 1201796062260359, Volkswagen: 1200799299933135
    const [task_note, setTaskNote] = React.useState<TaskNoteI|undefined>(undefined);
    const [completedTasks,setCompletedTasks] = React.useState<boolean>(false)
    const [searchFilter,setSearchFilter] = React.useState<string>('')
    const [priorities,setPriorities] = React.useState<string[]>([])
    const [tasksDates,setTasksDates] = React.useState<TasksDatesI>({none:false,past:false,pastQuarter:false,today:false,week:false,month:false, tomorrow:false, quarter:false})
    const [tags,setTags] = React.useState<TagType[]>([]) 
    const [tagFilter, setTagFilter] = React.useState<TagFilterOptions>(TagFilterOptions.Any)
    const [tagsSearch, setTagsSearch] = React.useState<string>('')
    //const [tagsAllTasksFilter,setTagsAllTasksFilter] = React.useState<boolean>(false)
    
    const handleCompletedTasks = () => {
        console.log(`App:handleCompletedTasks() - completedTasks: ${completedTasks} -> new state: ${!completedTasks}`)
        const state = !completedTasks;
        setCompletedTasks(state)
    }

    const handlePriority = (selected_priority:string) => {
        if (priorities.includes(selected_priority)) {
            var temp:string[] = priorities.filter(priority => priority != selected_priority)
            setPriorities(temp)
            //console.log(`handlePrio - reduced prios: ${temp}`)
        }
        else {
            const temp:string[] = [...priorities, selected_priority]
            setPriorities(temp)
            //console.log(`handlePrio - enhanced prios: ${temp}`)
        }
    }

    const handleFilterReset = () => {
        setCompletedTasks(false)
        setSearchFilter('')
        setPriorities([])
        setTasksDates({none:false,past:false,pastQuarter:false,today:false,week:false,month:false, tomorrow:false, quarter:false})
        setTagFilter(TagFilterOptions.Any)
        const project_tag_names: string[] = helperGetSelectedProjectTags(projects,projectsSelected)
        const tags_state: TagType[] = project_tag_names.map(tag_name => { return {name: tag_name, selected: false}})
        setTags(tags_state)
        setTagsSearch('')
    }

    const setDatesFilter = (range:string) => {
        const state:TasksDatesI = {...tasksDates}
        if (range == 'past') {
            state['past'] = !state['past']
        }
        if (range == 'pastQuarter') {
            state['pastQuarter'] = !state['pastQuarter']
        }
        if (range == 'today') {
            state['today'] = !state['today']
        }
        if (range == 'tomorrow') {
            state['tomorrow'] = !state['tomorrow']
        }
        if (range == 'week') {
            state['week'] = !state['week']
        }
        if (range == 'month') {
            state['month'] = !state['month']
        }
        if (range == 'quarter') {
            state['quarter'] = !state['quarter']
        }
        if (range == 'none') {
            state['none'] = !state['none']
        }
        setTasksDates(state)

    }

    const helperGetSelectedProjectTags = ( projects: ProjectType[],  selected_project_gids :string[] ) :string[] => {
        const result: string[] = []
        projects.map(project => {
            if (selected_project_gids.includes(project.gid)) {
                project.sections.map(section => {
                    section.tasks.map(task => {
                        task.tags.map(tag => {
                            if (result.includes(tag) == false) { result.push(tag)}
                        })
                        task.subtasks.map(subtask => {
                            subtask.tags.map(tag => {
                                if (result.includes(tag) == false) { result.push(tag)}
                            })
        
                        })
                    })
                })                    
            }
        })
        return result
    } 

    const handleOnTagsSearch = (text: string): void => {
        setTagsSearch(text)
    }

    const handleTagFilterSelect = (option:TagFilterOptions): void => {
        setTagFilter(option)
    }

    const handleTagDeselectAll = (tags:TagType[]) => {
        let new_state: TagType[] = [...tags]
        new_state.map(tag => {
            if (tag.selected) {
                tag.selected = false
            }
        })
        setTags(new_state)
    }

    const handleTagSelect = (tag_selected:TagType):void => {
        console.log(`App:handleTagSelect() - old tagFilter state:`)
        console.log(tagFilter)

        const new_tags_state: TagType[] = tags.map(tag => {return {...tag} })
        new_tags_state.forEach(tag => {
            if (tag.name == tag_selected.name) {
                tag.selected = !tag.selected
            }
        })

       console.log(`App:handleTagSelect() - new tags state:`)
       console.log(new_tags_state)
       setTags(new_tags_state)

    }

    const handleProjectNameSelect = (gid:string) => {
        //console.log(`App:handleProjectNameSelect() - name: ${name}`)
        const temp = [gid]
        const tag_names:string[] = helperGetSelectedProjectTags(projects,temp)
        const tags_state: TagType[] = []
        tag_names.forEach(tag_name => {
            const temp: TagType[] = tags.filter(tag => { if (tag.name == tag_name) { return tag}})
            if (temp.length > 0) {
                tags_state.push({...temp[0]})
            }
            else {
                tags_state.push({ name: tag_name, selected: false})
            }
        })
        setProjectsSelected(temp)
        setTags(tags_state)
    }

    const handleProjectBoxSelect = (gid:string) => {
        //console.log(`App:handleProjectBoxSelect() - name: ${name} - state.projectsSelected: ${projectsSelected}`)
        var temp:string[] = []
        if (projectsSelected.includes(gid)) {
            temp = projectsSelected.filter(project => project != gid)
        }
        else {
            temp = [...projectsSelected, gid]
        }
        const tag_names:string[] = helperGetSelectedProjectTags(projects,temp)
        const tags_state: TagType[] = []
        tag_names.forEach(tag_name => {
            const temp: TagType[] = tags.filter(tag => { if (tag.name == tag_name) { return tag}})
            if (temp.length > 0) {
                tags_state.push({...temp[0]})
            }
            else {
                tags_state.push({ name: tag_name, selected: false})
            }
        })

        setProjectsSelected(temp)
        setTags(tags_state)
    }


    const handleSelectDeselectAll = (action:string) => {
        let temp: string[] = []
        let tags_state: TagType[] = []
        if (action == 'selectAll') {
            temp = projects.map(project => { return project.gid })    
            const tag_names:string[] = helperGetSelectedProjectTags(projects,temp)
            tag_names.forEach(tag_name => {
                const temp: TagType[] = tags.filter(tag => { if (tag.name == tag_name) { return tag }})
                if (temp.length > 0) {
                    tags_state.push(temp[0])
                }
                else {
                    tags_state.push({ name: tag_name, selected: false})
                }
            })
        }
        else {
            temp = []
            tags_state = []
        }
        setProjectsSelected(temp)
        setTags(tags_state)
    }


    const handleRefresh = () => {
        //console.log(`App:handleRefresh()- refresh projects ...`)
        setProjects([])
        setTaskNote(undefined)
        setTags([])
        axios
            .get(`http://localhost:37070/projects?with_sections=true&with_tasks=true&with_subtasks=true`,{ headers: {  'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}})
            .then((response) => {
                //console.log(`App.handleRefresh() - response from Asana: ${response.data.projects}`)
                const project_tag_names: string[] = helperGetSelectedProjectTags(response.data.projects,projectsSelected)
                const tags_state: TagType[] = project_tag_names.map(tag_name => { return {name: tag_name, selected: false}})
                setProjects(response.data.projects)
                setTags(tags_state)
                task_note != undefined && handleTaskNoteClick(task_note.gid, task_note.url)
            });
    }

    const handleTaskNoteClick = (task_gid: string, url: string): void => {
        setTaskNote(undefined)

        let notes_project: ProjectType|undefined = undefined
        let notes_section: SectionType|undefined = undefined
        let notes_task: TaskType|undefined = undefined
        let notes_subtask: SubtaskType|undefined = undefined
        let notes_tags: string[] = []

        projects.map(project => {
            project.sections.map(section => {
                section.tasks.map(task => {
                    if (task.gid == task_gid) {
                        notes_project=project
                        notes_section=section
                        notes_task = task
                        notes_tags = task.tags
                    }
                    else {
                        task.subtasks.map(subtask => {
                            if (subtask.gid == task_gid) {
                                notes_project=project
                                notes_section=section
                                notes_task = task
                                notes_tags = subtask.tags
                                notes_subtask = subtask
                            }
                        })    
                    }
                })
            })
        })
        //console.log(`App:handleTaskNoteClick() - task_gid: ${task_gid}`)
        if (notes_subtask!=undefined && notes_project != undefined) {
            url = `https://app.asana.com/0/${notes_project['gid']}/${notes_subtask['gid']!}`
        }
        axios.get(`http://localhost:37070/task/notes?task_gid=${task_gid}`,{ headers: {  'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}})
            .then((response) => {
                //console.log(response.data)
                //console.log(`App:handleTaskNoteClick() - response from Asana`)
                const response_with_ajusted_links = response.data.notes.replace(/href=\"/g, ' target="_blank" href=\"')
                url = url + '/f'  // this will open just the task or subtask in the middle, not the whole Asana context like project and sections, with the task to the right
                setTaskNote({project: notes_project!, section: notes_section!, task: notes_task!, subtask: notes_subtask!, tags: notes_tags,  url: url, html: response_with_ajusted_links, gid: task_gid})
            });
    }


    React.useEffect(() => {
        console.log(`App:useEffect() - Execute - fetch projects ...`)
        axios
            .get(`http://localhost:37070/projects?with_sections=true&with_tasks=true&with_subtasks=true`,{ headers: {  'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',}})
            .then((response) => {
                console.log(`App.useEffect() - response from Asana:`); console.log(response.data.projects);
                const project_tag_names: string[] = helperGetSelectedProjectTags(response.data.projects,projectsSelected)
                const tags_state: TagType[] = project_tag_names.map(tag_name => { return {name: tag_name, selected: false}})
                setProjects(response.data.projects)
                setTags(tags_state)
            });
    }, []);

    //if (projects == []) { return <div>Gettings Asana projects ...</div>}
   const handleSearchFilter = (filter:string): void => {
       setSearchFilter(filter)
   }


    return (
    
        <div>   
            {
             //console.log(`=====>  App RENDER`)             
             //console.log(`App::State - projectsSelected: ${projectsSelected} / len: ${projectsSelected.length}`) 
             //console.log(`App:render - tags:`) 
             //console.log(tags) 
             //console.log(tags.filter(t => { if (t.selected) { return t } } )) 
            }

            <Grid container  spacing={6}  >
        
                <Grid  item xs={2}>
                    <Stack direction="column" spacing={1} divider={<Divider orientation="horizontal" flexItem />} >
                        <Stack direction="row" spacing={3}  >
                            <Refresh  onClickHandler={handleRefresh}/>
                            <ResetFilter onClickHandler={handleFilterReset} />
                        </Stack>
                        <Stack direction="column" spacing={1}  >
                            <div style={{ fontSize: '17px', fontWeight: 'bold' }}>Projects</div>
                            <ProjectsSelectAll onClickHandler={handleSelectDeselectAll} />
                            <SidebarProject  projectsSelected={projectsSelected} projects={projects} 
                                            handleNameSelect={handleProjectNameSelect}  
                                            handleBoxSelect={handleProjectBoxSelect} />
                        </Stack>
                        <Stack direction="column" spacing={1} >
                            <div style={{ fontSize: '17px', fontWeight: 'bold' }}>Tags</div>
                            <SidebarTagsSelected tags={tags} handleTagSelect={handleTagSelect} handleTagDeselectAll={handleTagDeselectAll} />
                            <SidebarTagsFilter option={tagFilter} onClickHandler={handleTagFilterSelect} />
                            <Stack direction="column" spacing={1} divider={<Divider orientation="horizontal" flexItem />} >
                                <SidebarTags tags={tags} searchFilter={tagsSearch} handleTagSelect={handleTagSelect} />
                                <SidebarTagsSearch text={tagsSearch} onSearchHandler={handleOnTagsSearch} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={5}>   
                {
                    projects.length > 0
                    ?
                    <Tasks projects={projects} projectsSelected={projectsSelected} 
                                                //handleTaskTagRemoval={handleTaskTagRemoval} 
                                                //handleTaskTags={handleTaskTags} 
                                                tags={tags.filter(t => { if (t.selected) { return t } } )} // pass only selected tags to <Tasks>
                                                tagFilter={tagFilter}
                                                //allTagsFilter={tagsAllTasksFilter}
                                                //setAllTagsFilter={handlesAllTagsFilter}
                                                dates={tasksDates}
                                                setDatesFilter={setDatesFilter}
                                                searchFilter={searchFilter} setSearchFilter={handleSearchFilter}
                                                completedTasks={completedTasks} setCompletedTasks={handleCompletedTasks} 
                                                priorities={priorities} setPriority={handlePriority}
                                                clickSubTask={handleTaskNoteClick} />
                    :
                    <div style={{ fontSize: '16px' }} >Fetching Projects from ASANA - Please Wait ...</div>
                }
                </Grid>
                
                <Grid item xs={5}>
                    { 
                        task_note == undefined
                        ? 
                        <div></div> 
                        :
                        <TaskNote note={task_note!} handleTaskNoteClick={handleTaskNoteClick} />
                    }
                </Grid>
            </Grid>
        </div>
    
    )
    
  }


export default App;


