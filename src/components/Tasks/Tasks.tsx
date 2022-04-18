import React from 'react';
import { styled } from "@mui/material/styles";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { treeItemClasses  } from "@mui/lab/TreeItem";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { FormGroup} from '@mui/material';

import ProjectType , { SectionType, TaskType, SubtaskType  } from '../../types/ProjectTypes'
import TagType, { TagFilterOptions} from '../../types/TagType'
import DetailedSearchType from '../../types/DetailedSearchType'


import TasksSearch, { TasksDetailSearch } from './TasksSearch';
import TasksCompleted from './TasksCompleted';
import TasksPriority from './TasksPriority';
import TasksTags from './TasksTags';
import TasksTagsAll from './TasksTagsAll';
import TasksDates, {TasksDatesI} from './TasksDates';
import { Abc } from '@mui/icons-material';

interface SubtaskDetailsProps {
    subtask: SubtaskType;
    clickSubTask: any;
}

// function SubtaskDetail({name, gid, prio, url, clickSubTask}: SubtaskDetailsProps): JSX.Element {
function SubtaskDetail({subtask, clickSubTask}: SubtaskDetailsProps): JSX.Element {
    let label=`${subtask.name}`
    let task_style:React.CSSProperties = {}
    let prio = ''

    const date_color = (date_string:string):string => {
        let result: string = ''
        if (date_string == '' || date_string == undefined || date_string == null) {
            return result
        }
        let now: Date = new Date()
        const date: Date = new Date(date_string)
        now.setHours(12,0,0,0)
        date.setHours(12,0,0,0)
        if (date.getTime() < now.getTime()) {
            result = 'red'
        }
        else if (date.getTime() == now.getTime()) {
            result = 'darkorange'
        }
        else {
            result = 'forestgreen'
        }
        return result;
    }

    const prio_styles = (prio:string):React.CSSProperties => {
        let result = {} as React.CSSProperties

        if (prio == 'p1') {
            result = { color : '#570000', fontWeight: 'bold', fontSize: '12px'} //'#800000'
        }
        else if (prio == 'p2') {
            result = { color : '#bd0000' , fontWeight: 'bold', fontSize: '10px'}
        }
        else if (prio == 'p3') {
            result = { color : '#ff6666', fontSize: '10px' }
        }
        else if (prio == 'p4') {
            result = { color : '#ffa3a3', fontSize: '10px' }
        }

        return result;
    }

    if (subtask.completed == true) {
        task_style = {paddingLeft: 20 , color: ' #6a6361', backgroundColor:  ' #d0cece' }
    }
    else {
        task_style = {paddingLeft: 20 , color: ' black' }
    }
    subtask.tags.map(tag => {
        if ((tag == 'p1') || (tag == 'p2') || (tag == 'p3') || (tag == 'p4'))  {
            prio = `${tag}`
        }
    })

    const style_date_color = {  paddingLeft: '10', fontSize: '11px', color: date_color(subtask.due_on) } as React.CSSProperties;
    const style_prio = {paddingLeft: 0, paddingRight: '5', ...prio_styles(prio)} as React.CSSProperties;

    return (
        <div>
            <table style={{borderSpacing: 0}} >
                <thead></thead>
                <tbody>
                <tr style={task_style}>
                <td style={style_prio} >
                    <span>
                        {
                            prio == '' 
                            ? <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                            : prio
                        }
                    </span>
                </td>
                <td style={{ paddingLeft: 7, color: 'black', fontSize: '12px'}} onClick={() => clickSubTask(subtask.gid, subtask.url)}>
                    <div > {subtask.name}</div>
                </td>
                { subtask.due_on != null
                  &&
                    <td style={style_date_color} >
                        [ {subtask.due_on} ]
                    </td>
                }
                </tr>
                </tbody>
            </table>
        </div>
    )
}

interface SubtaskProps {
    subtask: SubtaskType;
    clickSubTask: any;
}

const StyledSubtask = styled(TreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.label}`]: { 
      fontSize: 12,
      color: 'darkgreen',
      border: "black 1px",
      marginTop: 0,
      marginBottom: 0
    }
  }));


function Subtask({subtask,clickSubTask}: SubtaskProps): JSX.Element {
    
    //if (subtask.name !='Overview') {
        return (
            <StyledSubtask  nodeId={subtask.gid } key={subtask.gid} label={
                <SubtaskDetail subtask={subtask} clickSubTask={clickSubTask}  /> 
            }/>
        )
    /*}
    else {
        return <></>
    }*/
}

interface TaskProps {
    task: TaskType;
    clickSubTask: any;
}

const StyledTask = styled(TreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.label}`]: {
      fontSize: 13,
      color: 'blue',
      border: "black 1px",
      marginTop: 2,
      marginBottom: 0
    }
  }));

function Task({task, clickSubTask}: TaskProps): JSX.Element {

    const getOverviewSubtask = (event:React.MouseEvent, gid:string): void => {
        console.log(`Tasks:Task - getOverviewSubtask() - task.name: ${task.name} - gid: ${gid}`)
        if (event.shiftKey) {
            clickSubTask(task.gid, task.url)
        }
    }

    return  (
        <div>
            <StyledTask  onClick={(e) => { getOverviewSubtask(e, task.gid)}} nodeId={task.gid } key={task.gid} label={task.name} >
                { 
                    task.subtasks.map((subtask) => {
                        return <Subtask subtask={subtask} key={subtask.gid}  clickSubTask={clickSubTask} />
                    })
                }
            </StyledTask>
        </div>
        ) 
    
}

interface SectionProps {
    section: SectionType;
    clickSubTask: any;
}



const StyledSection = styled(TreeItem)(({ theme }) => ({
    [`& .${treeItemClasses.label}`]: {
      fontSize: 14,
      color: 'darkgreen',
      border: "black 1px",
      marginTop: 2,
      marginBottom: 0
    }
  }));


function Section({section, clickSubTask}: SectionProps): JSX.Element {
    
    return  (
        <StyledSection nodeId={section.gid } key={section.gid} label={<div>{section.name}</div>}>
            { 
                section.tasks.map((task) => {
                    return <Task task={task} key={task.gid} clickSubTask={clickSubTask}  />
                })
            }
        </StyledSection>
    )        
}



// ##################################################



interface CollapsedExpanded {
    gids: string[];
    expanded: boolean;
}

interface TreeExpansion {
    name: string;
    gids: string;
}


const StyledTreeView = styled(TreeView)(({ theme }) => ({
    [`& .${treeItemClasses.label}`]: {
      fontSize: 14,
      color: 'firebrick',
      marginTop: 2,
      marginBottom: 0
    }
  }));


interface ExpandColapseButtonProps {
    text: string;
    handleExpandCollapseClick: any;
}

function ExpandColapseButton({text, handleExpandCollapseClick}:ExpandColapseButtonProps): JSX.Element {
    //const [expanded, setExpanded] = React.useState<string>('Collapse All')

    const handleClick = () => {
        handleExpandCollapseClick(text)
    }

    return (
        <button style={{ fontSize: '12px' }} onClick={handleClick}>
            {text}
        </button>
    )
 
 } 

 interface TreeExpansionI {
    [key:string] : {
        project: ProjectType;
        gids: string[]
    }
 }



interface TasksProps {
    projects: ProjectType[];
    projectsSelected: string[];
    tags: TagType[];
    tagFilter: TagFilterOptions;
    searchFilter: string;
    setSearchFilter: any;
    searchDetailedFilter: DetailedSearchType;
    onSearchDetailed: any;
    dates:TasksDatesI;
    setDatesFilter:any;
    completedTasks:boolean;
    setCompletedTasks:any;
    priorities: string[];
    setPriority: any;
    clickSubTask: any;
}

export default function Tasks({ projects, 
                                projectsSelected,   // 
                                tags,               // :TagType
                                tagFilter,          // : TagFilterOptions 
                                searchFilter, 
                                setSearchFilter,
                                searchDetailedFilter,
                                onSearchDetailed,                                                            
                                dates, setDatesFilter,
                                completedTasks, setCompletedTasks, 
                                priorities, setPriority, 
                                clickSubTask}: TasksProps): JSX.Element {

   
    const [buttonExpandCollpase, setButtonExpandCollpase] = React.useState<string>('Collapse All')
    const [treeExpansion,setTreeExpansion] = React.useState<TreeExpansionI>({})
    //const [filterTaskGids, setFilterTaskGids] = React.useState<string[]|undefined>(undefined)

    
    //const treeNodeSelect = (event: React.SyntheticEvent, nodeIds: Array<string> | string) : void => {
    //    console.log(`Task:treeNodeSelect() - nodeIds: ${nodeIds}`)
    //    console.log(event)        
    //}

    // sorts the state variable treeExpansion by project.name
    const sortTreeExpansion = (tree:TreeExpansionI):TreeExpansionI => {
        const result: TreeExpansionI = {}
        Object.keys(tree).map((k) => {return [tree[k].project.name, k]}).sort((a, b) => { 
            if (a[0] < b[0])
                return -1;
            if (a[0] > b[0])
                return 1;
            return 0;
        }).map((m) => { return result[m[1]] = tree[m[1]] })
        return result
    }
    

    const expandTasksWithFilter = (projects_selected:string[]):TreeExpansionI => {
        const state: TreeExpansionI =  {}
        filterProjects(projects, projects_selected, searchFilter, completedTasks, priorities, tags, tagFilter, dates,searchDetailedFilter.gids).map(project => {
            // console.log(`Task:expandTasksWithFilter(project: ${project})`)
            // console.log(project)
            state[project.gid] = {project: project, gids: [project.gid]}
            project.sections.map(section => {
                state[project.gid].gids.push(section.gid)
                section.tasks.map(task => {
                    state[project.gid].gids.push(task.gid)
                    task.subtasks.map(subtask => {
                        state[project.gid].gids.push(subtask.gid)
                    })
                })
            })
        })
        return state
    } 

    const collpaseAllTasks = ():TreeExpansionI => {
        const result: TreeExpansionI =  {}
        for (let project_gid in treeExpansion) {
            let gids:string[] = [project_gid]
            result[project_gid] =  {project: treeExpansion[project_gid].project, gids: gids}
        }
        return result
    }

    const handleExpandCollapseClick = (e:string):void => {
        //console.log(`Task:handleExpandCollapseClick(e: ${e})`)
        if (e=='Collapse All') {
            setButtonExpandCollpase('Expand All')
            const state:TreeExpansionI = collpaseAllTasks()
            setTreeExpansion(state)
        }
        else {
            setButtonExpandCollpase('Collapse All')
            let state:TreeExpansionI = expandTasksWithFilter(projectsSelected)
            state = sortTreeExpansion(state)
            setTreeExpansion(state)
        }
    }

    const handleDatesClick = (option:string) => {
        setDatesFilter(option)
    }


    const handleCompletedTasks = () => {
        setCompletedTasks()
    }
    
    const handlePriority = (selected_priority:string) => {
        setPriority(selected_priority);
    }   
    
    const handleDetailedSearch = (filterText:string): void => {
        // console.log(`Tasks.handleFilterTaskGids() - filterText: ${filterText}`)
        //setFilterTaskGids(gids)
        onSearchDetailed(filterText)
    }

    const handleTreeViewNodeToggle = (event:any, nodeIds:string[]) => {
        //console.log(`Task1:handleTreeViewNodeToggle() - nodeIds: ${nodeIds} (len ${nodeIds.length})`)
        let target = event.target as HTMLInputElement;
        //console.log(`Task1:handleTreeViewNodeToggle() - event.target: ${target}`)
        let state: TreeExpansionI =  {}
        // for each project
        for (let project_gid in treeExpansion) {
            for (var i=0; i < nodeIds.length;i++) {
                if (treeExpansion[project_gid].gids.includes(nodeIds[i])) {
                    state = {...treeExpansion }
                    state[project_gid] = {project: treeExpansion[project_gid].project, gids: nodeIds }
                    setTreeExpansion(state)
                    break
                }
            }
        }
        //console.log(`Task1:handleTreeViewNodeToggle() - new state:`)
        //console.log(state)
    }


    const onFilterChange = (newFilter:string):void => {
        setSearchFilter(newFilter)
    }

    // initial render
    React.useEffect(() => {
        let state: TreeExpansionI =  expandTasksWithFilter(projectsSelected)
        // console.log(`Task:useEffect - initial state:`)
        // console.log(state)
        state = sortTreeExpansion(state)
        setTreeExpansion(state)
        //handleTaskTags(treeGetTagGids(state))
    },[]);

    // when project selection changes
    React.useEffect(() => {
        const state: TreeExpansionI =  {}
        for (var i=0; i < projectsSelected.length;i++) {
            if (treeExpansion.hasOwnProperty(projectsSelected[i]) == true) {
               state[projectsSelected[i]] = treeExpansion[projectsSelected[i]]
            }
        }
        const new_projectsSelected:string[] = [];
        for (var i=0; i < projectsSelected.length;i++) {
            if (state.hasOwnProperty(projectsSelected[i]) == false) {
                new_projectsSelected.push()
                for (var j=0; j < projects.length;j++) {
                    if (projects[j].gid == projectsSelected[i]) {
                        new_projectsSelected.push(projectsSelected[i])
                    }
                }
            }
        }
        const temp:TreeExpansionI =  expandTasksWithFilter(projectsSelected)
        
        let new_state: TreeExpansionI = {...state, ...temp }
        //console.log(`Task:useEffect(${projectsSelected}) - new state:`)
        //console.log(new_state)
        new_state = sortTreeExpansion(new_state)
        setTreeExpansion(new_state)
        //handleTaskTags(treeGetTagGids(new_state))
    },[projectsSelected]);

    
    // when certain props change
    React.useEffect(() => {
        let state: TreeExpansionI =  expandTasksWithFilter(projectsSelected)
        //console.log(`Task:useEffect - initial state:`)
        //console.log(state)
        state = sortTreeExpansion(state)
        setTreeExpansion(state)
        //handleTaskTags(treeGetTagGids(state))
        //setTagsFilter(tags)
    },[searchFilter,searchDetailedFilter, priorities, completedTasks, tags, tagFilter, dates]);



    return (
      <div>
        <Stack direction='column' spacing={1} divider={<Divider orientation="horizontal" flexItem />} >

            <Stack direction="column" spacing={1} divider={<Divider orientation="vertical" flexItem />} >
                <Stack direction='row' spacing={3} divider={<Divider orientation="vertical" flexItem />} >
                    <TasksSearch filterProps={searchFilter}  onFilterChange={onFilterChange}/>
                    <ExpandColapseButton text={buttonExpandCollpase}  handleExpandCollapseClick={handleExpandCollapseClick} />
                </Stack>
                <Stack direction='row' spacing={3} divider={<Divider orientation="vertical" flexItem />} >
                    <TasksDetailSearch searchText={searchDetailedFilter.text} onFilterChange={handleDetailedSearch} />
                    <TasksCompleted onClickHandler={handleCompletedTasks} checked={completedTasks} />
                </Stack>
            </Stack>
            <Stack direction="row" style={{ margin: '0px' }}  spacing={1} divider={<Divider style={{ margin: '0px' }}  orientation="vertical" flexItem />}  >
                {
                    ['p1','p2','p3','p4'].map(p => {
                        return <TasksPriority key={p} checked={priorities.includes(p)} onClickHandler={handlePriority} label={p} />
                    })
                }
            </Stack>
            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} >
                    <TasksDates onClickHandler={handleDatesClick} dates={dates} />
            </Stack>
           
            <div></div>

        </Stack>
    
        <div className="tree">
        {
            Object.keys(treeExpansion).map((key, index) => {
                { //console.log(`Task:render.return() - gids: ${treeExpansion[key].gids}`) ; 
                //console.log(`Task:render.return() - projectsSelected: ${projectsSelected}`)
                }
                return (
                    <StyledTreeView
                    aria-label="controlled"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    
                    expanded={treeExpansion[key].gids}
                    onNodeToggle={handleTreeViewNodeToggle}   
                    
                    >
                    <TreeItem  nodeId={treeExpansion[key].project.gid } key={treeExpansion[key].project.gid} label={<div>{treeExpansion[key].project.name}</div>}>
                        { 
                            treeExpansion[key].project.sections.map((section) => {
                                return <Section section={section} key={section.gid} clickSubTask={clickSubTask} />
                            })
                        }
                    </TreeItem>
                    </StyledTreeView>
                )
            })
        }
        </div>
    </div>
  );
}



function filterProjects(projects: ProjectType[], projectsSelected: string[], filter: string, completedTask: boolean,priorities: string[], tags:TagType[], tagFilter:TagFilterOptions, dates:TasksDatesI, task_gids: string[]|undefined): ProjectType[] {
    let result: ProjectType[] = [];
    // console.log(`filterProject() - START 1 - task_gids (${task_gids})`)
    // console.log(task_gids)
    projects.map(project => {
        if (projectsSelected.includes(project.gid)) {
            let temp: ProjectType = {...project} // { name: project.name, gid: project.gid, url: project.url, sections: []}
            temp.sections = []
            let filtered_sections: SectionType[] = []
            project.sections.map((section) => {
                let filtered_tasks:TaskType[] = []
                section.tasks.map((task) => {
                    let filtered_subtasks:SubtaskType[] = []
                    // console.log(`==============================================================`)
                    // console.log(`filterProject() - START 2 - Project / Section / Task ( ${project.name} /  ${section.name} / ${task.name} [${task.gid}] )`)
                    task.subtasks.map((subtask) => {
                        // console.log(`........................................................`)
                        // console.log(`filterProject() - START 3 - Subtask (${subtask.name} / ${subtask.gid})`)

                        let showSubtask = false

                        // Filter: Search Text
                        if (filter == '') {
                            showSubtask = true
                        }
                        else if (subtask.name.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
                            showSubtask = true
                        }
                        else {
                            showSubtask = false
                        }
                        //console.log(`filterProject() - Subtask - Search - RESULT: (${showSubtask})`)

                        if (showSubtask) {
                            if (task_gids != undefined) {
                                if (task_gids.length == 0) {
                                    showSubtask = true
                                }
                                else {
                                    if (task_gids.includes(subtask.gid) == false) {
                                        showSubtask = false
                                    }
                                    else {
                                        showSubtask = true
                                    }
                                }
                            }
                            else {
                                showSubtask = true
                            }
                            //console.log(`filterProject() - Subtask - Detailed Search - RESULT: (${showSubtask})`)
                        }

                        // Filter: Priorities
                        if (showSubtask) { // did we pass the text filter ?
                            //console.log(`filterProject() - filter dates - prio - priorities: ${priorities} - tags: ${subtask.tags}`)
                            if (priorities.length == 0) {  //  prio filter is not defined
                                showSubtask = true
                            }
                            else {
                                // extract prio tags p1,p2,p3,p4 from subtask
                                let subtask_priorities:string[] = subtask.tags.filter(tag => { return (tag == 'p1' || tag == 'p2' || tag == 'p3' || tag == 'p4') } )   
                                if (subtask_priorities.length > 0) {
                                    // check if subtask prio tags are contained in the prio filter
                                    if (priorities.filter(elem => { return subtask_priorities.includes(elem)}).length == 0) {
                                        showSubtask = false
                                    }
                                    else {
                                        showSubtask = true
                                    }
                                }
                                else {
                                    showSubtask = false  // subtask does not have any prio tags set
                                }
                            }
                            //console.log(`filterProject() - Subtask - Prio - RESULT: (${showSubtask})`)
                        }



                        // Filter: Tags
                        if (showSubtask) { // did we pass the priorities filter ?
                            //console.log(`filterProject() - filter dates - tags - tags_filter: ${tags_filter} - tags: ${subtask.tags}`)
                            if (tags.length == 0) {
                                showSubtask = true
                            }
                            else {
                               //console.log(`filterProject() - filter tags - tags_filter: ${tags_filter} - subtask.tags: ${subtask.tags} - task.name: ${task.name} - # subtasks: ${subtask.name} - section.name: ${section.name} `)
                               // array of subtask tags that are contained in the tags filter 
                               const tag_filter_names:string[] = tags.map(tag => { return tag.name })
                               const matching_tag_names:string[] = subtask.tags.filter(tag => {
                                    return tag_filter_names.includes(tag)
                                })
                                 // if tag filter option is Any, then at least 1 subtask tags must be in the tag filter
                                if (tagFilter == TagFilterOptions.Any) {
                                    if (matching_tag_names.length == 0) {
                                        showSubtask = false
                                    }
                                }    // if tag filter option is All, then all subtask tags must be in the tag filter
                                else if (tagFilter == TagFilterOptions.All) {
                                    if (matching_tag_names.length < tags.length) {
                                        showSubtask = false
                                    }
                                }
                            }
                            //console.log(`filterProject() - Subtask - Tags - RESULT: (${showSubtask})`)
                        }

                        if (showSubtask) {
                            //console.log(`filterProject() - Subtask - Dates - Due On: ${subtask.due_on} - dates filter: ${dates}`)
                            showSubtask = filterDate(subtask, dates)    
                            //console.log(`filterProject() - Subtask - Dates - RESULT: (${showSubtask})`)
                        }
                    

                        // Filter: Completed Tasks
                        if (showSubtask) { // did we pass the Dates filter
                            //console.log(`filterProject() - filter dates - completed - completedTask: ${completedTask} - subtask.completed: ${subtask.completed}`)
                            if (completedTask == true) { // completed tasks is checked
                                    // any filtered subtask, completed or not is displayed
                                    showSubtask = true
                            }
                            else {
                                if (subtask.completed == false) { // show only comnpleted subtasks 
                                    showSubtask = true
                                }
                                else {
                                    showSubtask = false
                                }
                            }
                            //console.log(`filterProject() - Subtask - Completed - RESULT: (${showSubtask})`)
                        }

                        // Did we pass all filters ?
                        if (showSubtask) {
                            filtered_subtasks = filtered_subtasks.concat(subtask)
                        }
                        
                    })

                    //console.log(`------------------------------------------------------`)
                    //console.log(`filterProject() - START 4 Task (${task.name})`)

                    if (filtered_subtasks.length>0) {
                        let temp: TaskType = {...task}
                        temp.subtasks = filtered_subtasks
                        filtered_tasks = filtered_tasks.concat(temp)
                        //console.log(`filterProject() - Task - added task with subtasks: (${filtered_subtasks.length})`)
                    }
                    else {

                        let showTask = true                     
                            
                        if (filter != '') {
                            if (task.name.toLowerCase().indexOf(filter.toLowerCase()) == -1) {
                                showTask = false
                            }
                            //console.log(`filterProject() - Task - Search - RESULT: (${showTask})`)
                        }

                        
                        if (showTask) {
                            if (task_gids != undefined) {
                                if (task_gids.length == 0) {
                                    showTask = false
                                }
                                else {
                                    if (task_gids.includes(task.gid) == false) {
                                        showTask = false
                                    }
                                }
                            }
                            //console.log(`filterProject() - Task - Detailed Search - RESULT: (${showTask})`)
                        }
                        

                        if (showTask) {
                            if (tags.length > 0) {
                                const tag_filter_names:string[] = tags.map(tag => { return tag.name })
                                const matching_tag_names:string[] = task.tags.filter(tag => {
                                    return tag_filter_names.includes(tag)
                                })
                                 // if tag filter option is Any, then at least 1 subtask tags must be in the tag filter
                                 if (tagFilter == TagFilterOptions.Any) {
                                    if (matching_tag_names.length == 0) {
                                        showTask = false
                                    }
                                }    // if tag filter option is All, then all subtask tags must be in the tag filter
                                else if (tagFilter == TagFilterOptions.All) {
                                    if (matching_tag_names.length < tags.length) {
                                        showTask = false
                                    }
                                }
                            }
                            //console.log(`filterProject() - Task - Tags - RESULT: (${showTask})`)
                        }


                        if (showTask) {
                            // if any prio is selected , then filter out any Task without subtasks with these prios
                            if (priorities.length > 0) {
                                showTask = false
                            }
                            //console.log(`filterProject() - Task - Prios - RESULT: (${showTask})`)
                        }

                        if (showTask) {
                            // if any date filter is selected , then filter out any Task without subtasks that fit these date filter(s)
                            if (dates.none || dates.past || dates.pastQuarter || dates.today || dates.tomorrow || dates.week || dates.month || dates.quarter) {
                                showTask = false
                            }
                            //console.log(`filterProject() - Task - Date - RESULT: (${showTask})`)
                        }

                        if (showTask) {
                            let temp: TaskType = {...task}
                            temp.subtasks = []
                            filtered_tasks = filtered_tasks.concat(temp)
                        }
                    }
                    //console.log(`filterProject() - section.name: ${section.name} - task.name: ${task.name} - # filtered: ${filtered_tasks.length} - # subtasks: ${filtered_tasks.length > 0 ? filtered_tasks[filtered_tasks.length-1].subtasks.length : 0}`)
                })
                if (filtered_tasks.length >0) {
                    let temp: SectionType = {...section}
                    temp.tasks = filtered_tasks
                    filtered_sections = filtered_sections.concat(temp)            
                }
            })
            if (filtered_sections.length > 0) {
                temp.sections = filtered_sections
            }
            result.push(temp)
        }
    })
    return result
}



function filterDate(subtask:SubtaskType, filter:TasksDatesI ):boolean {
    let result: boolean = false;
    //const now : Date = new Date();
    const today : Date = new Date();
    const subtask_date: Date = new Date(subtask.due_on)  // if null, 1.1.1970
    // not interested in excact time, just need year-month-day
    //now.setHours(12,0,0); 
    subtask_date.setHours(12,0,0,0);
    today.setHours(12,0,0,0)

    let date_type: string = ''

    //console.log(`filterDate() -  SUBTASK: ${subtask.name} , due: ${subtask.due_on}`)
    //console.log(filter)

    //console.log(`filterDate() - subtask_date.getTime(): ${subtask_date.getTime()}`)
    //console.log(`filterDate() - today.getTime(): ${today.getTime()}`)
    //console.log(`filterDate() - today.getTime()+(1*24*60*60*1000)): ${today.getTime()+(1*24*60*60*1000)}`)
    // console.log(`filterDate() - week - now.getTime()+(7*24*60*60*1000)): ${now.getTime()+(7*24*60*60*1000)}`)
    // console.log(`filterDate() - week - > : ${subtask_date.getTime() > today.getTime()}`)
    // console.log(`filterDate() - week - < : ${subtask_date.getTime() < (now.getTime()+(7*24*60*60*1000))}`)

    if (!filter.none && !filter.past && !filter.pastQuarter && !filter.today && !filter.tomorrow && !filter.week && !filter.month && !filter.quarter) {
        result = true
    }
    else 
    if (subtask.due_on == null) {
        if (filter.none) {
            result = true
        }
    }
    else {
        if ((subtask_date.getTime() == today.getTime()) && filter.today) {
            result = true
        }
        else if ((subtask_date.getTime() > today.getTime()) && (subtask_date.getTime() <= (today.getTime()+(1*24*60*60*1000))) && filter.tomorrow) {
            result = true
        }
        else if ((subtask_date.getTime() > today.getTime()) && (subtask_date.getTime() <= (today.getTime()+(7*24*60*60*1000))) && filter.week) {
            result = true
        }
        else if ((subtask_date.getTime() > today.getTime()) && (subtask_date.getTime() <= today.getTime()+(30*24*60*60*1000)) && filter.month) {
            result = true
        }
        else if ((subtask_date.getTime() > today.getTime()) && (subtask_date.getTime() <= today.getTime()+(90*24*60*60*1000)) && filter.quarter) {
            result = true
        }
        else if ((subtask_date.getTime() < today.getTime()) && (subtask_date.getTime() > today.getTime()-(90*24*60*60*1000)) && filter.pastQuarter ) {
            result = true
        }
        else if ((subtask_date.getTime() < today.getTime()) && filter.past) {
            result = true
        }
    }
    
    //console.log(`filterDate() -  date_type: ${date_type}`)

    return result
}


/*


 <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} >
                <TasksTagsAll onTagsAllClick={handleTagsAllClick} checked={allTagsFilter} />
                <TasksTags tags={tags} onTagsClick={onTagsClick} />
            </Stack>


*/