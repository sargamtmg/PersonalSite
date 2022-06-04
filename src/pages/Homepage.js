import React, { useRef } from 'react';
import sletterTop from '../img/sletterTop.png';
import sletterMiddle from '../img/sletterMiddle.png';
import sletterBottom from '../img/sletterBottom.png';

const Homepage = () =>{
    let myref = useRef(null);
    let myref2 = useRef(null);
    let myref3 = useRef(null);

    return(
        <>
        <div className='view1'>
                <div className='red layer' id='redid' ref ={myref}>
                    <div className='wrapper'>
                        <div className='hidebox'>
                            <div className='welcome'>Welcome To My World</div>
                        </div>
                    </div>
                </div>
                <div className='yellow layer' id='yellowid' ref={myref2}>
                    I am YELLOW
                    <div>Essay topics in English can be difficult to come up with. While writing essays, many college and high school students face writer’s block and have a hard time to think about topics and ideas for an essay. In this article, we will list out many good essay topics from different categories like argumentative essays, essays on technology, environment essays for students from 5th, 6th, 7th, 8th grades. Following list of essay topics are for all – from kids to college students. We have the largest collection of essays. An essay is nothing but a piece of content which is written from the perception of writer or author. Essays are similar to a story, pamphlet, thesis, etc. The best thing about Essay is you can use any type of language – formal or informal. It can biography, the autobiography of anyone. Following is a great list of 100 essay topics. We will be adding 400 more soon!

But Before that you may wanna read some awesome Essay Writing Tips here.

500+ essay topics for students and children

Get the Huge list of 100+ Speech Topics here

                </div>
                    <div className='btn'> click me.</div>
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
        </>
    );
}

export default Homepage;