import React from 'react';

const SoftSkillCard = (props) => {
    return(
        <div className="skill_card_wrapper">
            <div className={`card ` + props.identifier}>
                <div className="card_head">
                    <h2 className="card_title">{props.card_heading}</h2>
                    <hr className="card_divider"></hr>
                </div>
                <div className="card_contain">
                    {
                    props.list.map((section,index)=>{    
                        return (
                            <div className="card_contain_wraper" key={index}>
                            {section.heading && <div className="section_heading">{section.heading}</div>}
                            <ul className="card_softskill_lists">
                            {
                                section.lists.map((item,i) => {
                                    return(
                                        <li className='softskill_item'>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                            </ul>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    );
}

export default SoftSkillCard;