import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import openEnvelop from '../img/open_envelop_final.png';
import topEnvelop from '../img/envelop_top_Final2.png';

const Contacts = () => {

    const form = useRef(null);

    const sendEmail = async (e) => {
        e.preventDefault();
    
        // emailjs.sendForm('service_l1y7h1j', 'template_levulc7', form.current, 'dlG0vLmiqkwJtfzi5')
        // .then((result) => {
        //     console.log(result.text);
        // }, (error) => {
        //     console.log(error.text);
        // });

        console.log(form.current);
        form.current.reset();
        formInEnvelop();
        closeEnvAnimate();
        adjustEnvPos();
    };

    //animation for putting form in envelop
    function formInEnvelop() {
        let form_letter = document.querySelector('.feedback_form');
        form_letter.style.transform = 'translateY('+45+'vh) rotateZ(0deg)';
    }

    //animation for closing envelop
    function closeEnvAnimate() {
        let id = null;
        const elem = document.querySelector('.env-top-total');
        let angle = 0;
        clearInterval(id);
        id = setInterval(frame, 20);
        function frame() {
            if (angle === 180) {
                clearInterval(id);
            } else {
                angle = angle+5; 
                elem.style.transform = 'perspective(500px) rotateX(-'+angle+'deg)';
                if(angle > 90)
                {
                    elem.style.zIndex = 20;
                }
            }
        }
    }

    function adjustEnvPos (){
        let env = document.querySelector('.envelop');
        env.style.transform = 'translateY(-30vh)';
    }

    return(
        <>
        <h1>Contact page</h1>
        <div className='envelop'>
                <div className="env-top-total">
                    <img src={topEnvelop} alt='open envelop' className='env-top'></img>
                    <div className="env-top-invisible"></div>
                </div>
                <form ref={form} className='feedback_form'>
                    Your Name : &nbsp;<t></t><input type="text" name='user_name'></input><br></br>
                    Email : &nbsp;&nbsp;<input type="text" name='user_email'></input><br></br>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tittle : </label>
                    <input type="text" name='user_tittle'></input><br></br>
                    <label>message:</label>
                    <textarea name='user_message'></textarea>
                    <button onClick={sendEmail}> Send </button>
                </form>
                <div className="env-back"></div>
                <img src={openEnvelop} alt='open envelop' className='open-envelop'></img>
        </div>
        </>
    );
}

export default Contacts;