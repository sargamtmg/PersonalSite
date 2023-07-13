import React from "react";

const Skill_item = (props)=>{
    return (
        <div class="item_card" key={props.item_key}>
            <div class="item_contain">
                <div class="item_logo_and_name">
                    <div class="item_logo" 
                    style={{ backgroundImage: `url(${props.img_url})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    }}></div>
                    <div class="item_name">{props.name}</div>
                </div>
            </div>
        </div>
    );
}

export default Skill_item;