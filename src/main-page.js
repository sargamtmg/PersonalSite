import React, { useRef } from 'react';
import Nav from './navigation';
import sletter from './img/sletter.png';
import sletterTop from './img/sletterTop.png';
import sletterMiddle from './img/sletterMiddle.png';
import sletterBottom from './img/sletterBottom.png';

const MainPage = () => {
    let myref = useRef(null);
    let myref2 = useRef(null);
    let myref3 = useRef(null);


    window.addEventListener('scroll', ()=>{
        if(!myref.current || !myref2.current || !myref3.current) return;
        let value = window.scrollY;
        const rede = document.querySelector('#redid');
        let red = rede.getBoundingClientRect();
        const transe = document.querySelector('#transid');
        let trans = transe.getBoundingClientRect();
        const yellowe = document.querySelector('#yellowid');
        let yellow = yellowe.getBoundingClientRect();
        const purple = document.querySelector('.purple');
        const navChild = document.querySelector('.navChild')
        // const blue = document.getElementById('blue');
        console.log(red.bottom);
        if(red.bottom > 0 )
        {
            yellowe.classList.add('fixedToTop');
            transe.classList.remove('hide');
            let op = (yellow.bottom - (yellow.bottom - red.bottom))/(yellow.bottom*2);
            transe.style.opacity= op;
            navChild.classList.remove('stickyToTop');
            if(red.bottom <= 75){
                navChild.classList.add('stickyToTop');
                yellowe.classList.remove('fixedToTop');
                transe.classList.add('hide');
            }
        }
        else if(red.bottom <= 0){
            //navChild.classList.add('stickyToTop');
            //yellowe.classList.add('stickyToTop');
        }
        //page hit bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            let leftname = document.querySelectorAll('.leftname');
            for (let i = 0; i < leftname.length; i++) {
                leftname[i].classList.remove('hide');
            }
        }
    });

    return(
        <div className='main'>
            <div className='navChild'>
                <Nav/>
            </div>
            <div className='view1'>
                <div className='red layer' id='redid' ref ={myref}>
                    I am RED.
                </div>
                <div className='yellow layer' id='yellowid' ref={myref2}>
                    I am YELLOW
                    <div>Essay topics in English can be difficult to come up with. While writing essays, many college and high school students face writer’s block and have a hard time to think about topics and ideas for an essay. In this article, we will list out many good essay topics from different categories like argumentative essays, essays on technology, environment essays for students from 5th, 6th, 7th, 8th grades. Following list of essay topics are for all – from kids to college students. We have the largest collection of essays. An essay is nothing but a piece of content which is written from the perception of writer or author. Essays are similar to a story, pamphlet, thesis, etc. The best thing about Essay is you can use any type of language – formal or informal. It can biography, the autobiography of anyone. Following is a great list of 100 essay topics. We will be adding 400 more soon!

But Before that you may wanna read some awesome Essay Writing Tips here.

500+ essay topics for students and children

Get the Huge list of 100+ Speech Topics here

Argumentative Essay Topics
Should plastic be banned?
Pollution due to Urbanization
Education should be free
Should Students get limited access to the Internet?
Selling Tobacco should be banned
Smoking in public places should be banned
Facebook should be banned
Students should not be allowed to play PUBG
Essay Topics on Technology
Technology
Computer
Wonder Of Science
Mobile Phone
Internet
Newspaper
Science
Essay Topics on Festivals on Events
Diwali
Independence Day (15 August)
Holi
Teachers Day
Summer Vacation
Christmas
Children’s Day
Swachh Bharat Abhiyan
Durga Puja
Janmashtami
Republic Day
Essay Topics on Education
Education
Importance of Education
Education should be free
Contribution of Technology in Education

</div>
                    <div class='btn'> click me.</div>
                </div>
                <div className='trans layer' id='transid' ref ={myref3}>
                    I am-------------------- transparent.
                </div>
            </div>
            <div className='view2'>
                <div className='purple layer'>
                    I am purple.
                </div>
                <div className='blue footer'>
                    I am Blue
                    <div className='myName'>
                        <div className='sargam'>
                            <div className='Sletter'>
                                <img src={sletterTop} alt="S letter top" className='STop' width="100px" />
                                <img src={sletterMiddle} alt="S letter middle" className='SMiddle' width="100px"/>
                                <img src={sletterBottom} alt="BS letter Bottom" className='SBottom' width="100px"/>
                            </div>
                            <div className='leftname hide'>argam</div>
                        </div>
                        <div className='leftname amang hide'>amang</div>
                    </div>
                    <div className='Tletter'></div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;