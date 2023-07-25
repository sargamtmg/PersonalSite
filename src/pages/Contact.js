import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane , faCircleCheck} from "@fortawesome/free-solid-svg-icons"
import { gsap } from "gsap";
import openEnvelop from '../img/contact/open_envelop_final.png';
import topEnvelop from '../img/contact/envelop_top_Final.png';

const Contacts = () => {

    const form = useRef(null);
    const successRef = useRef(null);

    const sendEmail = async (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_l1y7h1j', 'template_levulc7', form.current, 'dlG0vLmiqkwJtfzi5')
        .then((result) => {
            console.log(result.text);
            displaySuccess();
        }, (error) => {
            console.log(error.text);
        });

        console.log(form.current);
        closeEnvAnimate();
    };

    const displaySuccess = ()=>{
        if(successRef.current){
            successRef.current.classList.remove('hide')
        }
    }

    const hideSuccess = ()=>{
        if(successRef.current){
            successRef.current.classList.add('hide')
        }
    }

    const resetTheForm = () =>{
        form.current.reset();
    }

    function closeEnvAnimate() {
        console.log('closing animation');
        const tl = gsap.timeline();

        tl.to('.envelop', {
            duration: 0.4,
            top:'10%',
            ease: "power2.in",
        })
        .to('.feedback_form', {
            duration: 0.8,
            top:'0',
            ease: "power2.out",
        })
        .to('.env_top_side', {
            duration: 0.5,
            zIndex:5,
            perspective: 500,
            rotationX: 180,
            transformOrigin: 'center bottom',
            ease: 'power2.out', // Changed from 'transition' to 'ease'
            onComplete: ()=>{
                resetTheForm();
            }
        })
        .to('.envelop', {
            duration: 1,
            perspective: 500,
            translateY:'200%',
            ease: 'power2.out', // Changed from 'transition' to 'ease'
            onComplete: ()=>{
                hideSuccess();
                tl.reverse();
            }
        });
    }



    return(
        <>
        <div className='envelop_wrapper'>
            <div className="success_msg hide" ref={successRef}>Message Sent <FontAwesomeIcon icon={faCircleCheck}/></div>
            <div className="envelop">
                <img src={topEnvelop} alt='envelop top' className='env_top_side' />
                <div className="env_body">
                    <form ref={form} className='feedback_form'>
                        <input type="text" name='user_name' className="user_name" placeholder="Full name" autoComplete="off" required></input>
                        <input type="text" name='user_email' className="user_email" placeholder="E-mail" autoComplete="off" required></input>
                        <div className="subject">
                            <label className="subject_label">Subject: </label>
                            <input type="text" name='user_tittle' className="user_subject" autoComplete="off"></input>
                        </div>
                        <textarea name='user_message' className="user_message" placeholder="Message Here ..." required></textarea>
                        <button onClick={sendEmail} className="send_button"> Send <FontAwesomeIcon icon={faPaperPlane}/> </button>
                    </form>
                    <div className="envelop_bg"></div>
                    <img src={openEnvelop} alt='open envelop' className='open_envelop'></img>
                </div>
                
            </div>
        </div>
        </>
    );
}

export default Contacts;