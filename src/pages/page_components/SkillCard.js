import React from 'react';
import SkillItem from './SkillItem';

const SkillCard = (props) => {
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
                            <div className="card_contain_lists">
                            {
                                section.lists.map((item,i) => {
                                    return(
                                        <div className="skill_item_wraper" key={i}>
                                        <SkillItem img_url={item.img_url} name={item.name} item_key={i}/>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    );
}

export default SkillCard;