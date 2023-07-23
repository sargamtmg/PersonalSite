import React from 'react';
import ProjectIntercode from './ProjectIntercode';
import ProjectTextRecog from './ProjectTextRecog';
import ProjectCityEvent from './ProjectCityEvent';

const ProjectSelector = (props) =>{
    let project_name = props.project_name;
    if(project_name==='intercode'){
        return <ProjectIntercode/>
    }
    if(project_name==='text_recog'){
        return <ProjectTextRecog/>
    }
    if(project_name==='city_event'){
        return <ProjectCityEvent/>
    }
    return <ProjectIntercode />
}

export default ProjectSelector;