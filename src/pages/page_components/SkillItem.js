import React from "react";

const Skill_item = (props)=>{
    return (
        <div className="item_card" key={props.item_key}>
            <div className="item_contain">
                <div className="item_logo_and_name">
                    <div className="item_logo" 
                    style={{ backgroundImage: `url(${props.img_url})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    }}></div>
                    <div className="item_name">{props.name}</div>
                </div>
            </div>
        </div>
    );
}

export default Skill_item;