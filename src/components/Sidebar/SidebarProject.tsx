import React, { MouseEvent } from 'react';
import { Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import ProjectType from '../../types/ProjectTypes'
import { makeStyles } from "@material-ui/core/styles";

interface SidebarProjectProps {
    projects: ProjectType[];
    projectsSelected: string[];
    handleBoxSelect: any;
    handleNameSelect: any;
}

const useStyles = makeStyles({
    input: {
      height: "20px",
      boxSizing: "border-box" // <-- add this
    }
  });

export default function SidebarProject({projects, projectsSelected, handleBoxSelect, handleNameSelect}: SidebarProjectProps): JSX.Element {

    const backgroundGrey = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = 'gainsboro'
    }
    const backgroundReset = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = '0'
    }

    const classes = useStyles();

    return (
        <div>
            <table style={{borderSpacing: 0, padding: 0}} >
            <thead></thead>
            <tbody style={{padding: 0, borderSpacing: 0}} >
                {
                    projects.map(project => {
                        const check: JSX.Element = <Checkbox color="primary" classes={{ root: classes.input }} checked={projectsSelected.includes(project.gid)} onClick={() => handleBoxSelect(project.gid)} />
                        const label: JSX.Element = <span  onClick={() => handleNameSelect(project.gid)} style={{fontSize: '13px' }}>{project.name} </span>
                        return (
                            <tr style={{padding: 0, borderSpacing: 0}} key={project.gid}>
                                <td style={{padding: 0, borderSpacing: 0, fontSize: 12}}>
                                    <FormGroup >
                                        <FormControlLabel  control={check} sx={{fontSize: 13}} label={''} />
                                    </FormGroup>
                                </td>
                                <td >
                                    <div onMouseEnter={backgroundGrey}  onMouseLeave={backgroundReset} >{label}</div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
    )

}
