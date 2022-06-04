import React, { useRef } from "react";
import emailjs from '@emailjs/browser'

const Contacts = () => {

    const form = useRef(null);

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_l1y7h1j', 'template_levulc7', form.current, 'dlG0vLmiqkwJtfzi5')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    return(
        <>
        <h1>Contact page</h1>
        <form ref={form}>
            <label>Your Name : </label>
            <input type="text" name='user_name'></input>
            <label>Email : </label>
            <input type="text" name='user_email'></input>
            <label>Tittle : </label>
            <input type="text" name='user_tittle'></input>
            <label>message:</label>
            <textarea name='user_message'></textarea>
            <button onClick={sendEmail}> Send </button>
        </form>
        </>
    );
}

export default Contacts;