import React from 'react';
import SkillItem from './SkillItem';

const SkillCard = (props) => {
    return(
        <div class="skill_card_wrapper">
            <div className={`card ` + props.identifier}>
                <div class="card_head">
                    <h2 class="card_title">{props.card_heading}</h2>
                    <hr class="card_divider"></hr>
                </div>
                <div class="card_contain">
                    {
                    props.list.map((section,index)=>{    
                        return (
                            <div class="card_contain_wraper" key={index}>
                            {section.heading && <div class="section_heading">{section.heading}</div>}
                            <div class="card_contain_lists">
                            {
                                section.lists.map((item,i) => {
                                    return(
                                        <div class="skill_item_wraper" key={i}>
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