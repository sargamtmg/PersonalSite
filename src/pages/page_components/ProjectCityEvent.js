import React from 'react';
import { projectCityEventData } from '../../data/Project_data';

const ProjectCityEvent = () =>{
    return(
        <div className='text_recog_wrapper'>
            <div className='project_title'>{projectCityEventData.title}</div>
            <div className='overview_wrapper subsec_wrapper'>
                <div className='overview_title textrecog_title'>{projectCityEventData.overview_title}</div>
                <div className='overview_content textrecog_content'>{projectCityEventData.overview_content}</div>
            </div>
            <hr className='horizontal_break'/>
            <div className='tech_wrapper subsec_wrapper'>
                <div className='tech_title textrecog_title'>{projectCityEventData.technical_title}</div>
                <div className='tech_content textrecog_content'>{projectCityEventData.technical_content}</div>
            </div>
            <hr className='horizontal_break'/>
            <div className='feature_wrapper subsec_wrapper'>
                <div className='feature_title textrecog_title'>{projectCityEventData.features_title}</div>
                <div className='feature_content textrecog_content'>
                    <ul className='feature_list'>
                    {
                        projectCityEventData.features_content.map((feature,index)=> {
                            return(
                                <li key={index}>{feature}</li>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProjectCityEvent;