import React from 'react';
import Text_recog_demo from '../../img/project/text_recog_demo.png'
import { projectTextRecogData } from '../../data/Project_data';

const ProjectTextRecog = () =>{

    return(
        <div className='text_recog_wrapper'>
            <div className='project_title'>{projectTextRecogData.title}</div>
            <div className='overview_wrapper subsec_wrapper'>
                <div className='overview_title textrecog_title'>{projectTextRecogData.overview_title}</div>
                <div className='overview_content textrecog_content'>{projectTextRecogData.overview}</div>
            </div>
            <hr className='horizontal_break'/>
            <div className='tech_wrapper subsec_wrapper'>
                <div className='tech_title textrecog_title'>{projectTextRecogData.technical_title}</div>
                <div className='tech_content textrecog_content'>{projectTextRecogData.technical}</div>
            </div>
            <hr className='horizontal_break'/>
            <div className='feature_wrapper subsec_wrapper'>
                <div className='feature_title textrecog_title'>{projectTextRecogData.features_title}</div>
                <div className='feature_content textrecog_content'>
                    <ul className='feature_list'>
                    {
                        projectTextRecogData.features.map((feature,index)=> {
                            return(
                                <li key={index}>{feature}</li>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
            <img src={Text_recog_demo} alt='result demo' className='result_demo' />
        </div>
    )
}

export default ProjectTextRecog;