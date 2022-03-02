
export function filterProject(project: ProjectType, filter: string, prio: string=''): ProjectType {
    let result: ProjectType = {...project} // { name: project.name, gid: project.gid, url: project.url, sections: []}
    result.sections = []
    let filtered_sections: SectionType[] = []
    project.sections.map((section) => {
        let filtered_tasks:TaskType[] = []
        section.tasks.map((task) => {
            let filtered_subtasks:SubtaskType[] = []
            task.subtasks.map((subtask) => {
                if (subtask.name.indexOf(filter) != -1) {
                    filtered_subtasks = filtered_subtasks.concat(subtask)
                }
            })
            if (filtered_subtasks.length>0) {
                let temp: TaskType = {...task}
                temp.subtasks = filtered_subtasks
                filtered_tasks = filtered_tasks.concat(temp)
            }
        })
        if (filtered_tasks.length >0) {
            let temp: SectionType = {...section}
            temp.tasks = filtered_tasks
            filtered_sections = filtered_sections.concat(temp)            
        }
    })
    if (filtered_sections.length > 0) {
        result.sections = filtered_sections
    }
    return result
}

interface ProjectInterface {
    gid: string;
    name: string;
    url: string;
    sections: {
        gid: string;
        name: string;
        tasks: {
            completed: boolean;
            gid: string;
            name: string;
            tags: string [];
            url: string;
            subtasks: {
                completed: boolean;
                gid: string;
                name: string;
                tags: string [];
                url: string;
                due_on: string;
            } [];
        } [];
    } [];
}

type ProjectType = ProjectInterface
export type SectionType = ProjectInterface["sections"][0]
export type TaskType = ProjectInterface["sections"][0]["tasks"][0]
export type SubtaskType = ProjectInterface["sections"][0]["tasks"][0]["subtasks"][0]

export default  ProjectType