import React from 'react';
import { projectIntercodeData } from '../../data/Project_data';

const ProjectIntercode = () =>{


    return(
        <div className='text_recog_wrapper'>
            <div className='project_title'>{projectIntercodeData.title}</div>
            <div className='overview_wrapper subsec_wrapper'>
                <div className='overview_title textrecog_title'>{projectIntercodeData.overview_title}</div>
                <div className='overview_content textrecog_content'>{projectIntercodeData.overview_content}</div>
            </div>
            <hr className='horizontal_break'/>
            <div className='tech_wrapper subsec_wrapper'>
                <div className='tech_title textrecog_title'>{projectIntercodeData.technical_title}</div>
                <div className='tech_content textrecog_content'>{projectIntercodeData.technical_content}</div>
            </div>
            <hr className='horizontal_break'/>
            <div className='feature_wrapper subsec_wrapper'>
                <div className='feature_title textrecog_title'>{projectIntercodeData.features_title}</div>
                <div className='feature_content textrecog_content'>
                <ul className='feature_list'>
                {
                    projectIntercodeData.features_content.map((feature,index)=> {
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

export default ProjectIntercode;