import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ScrollToTop from './pages/page_components/ScrollToTop';
import Nav from './navigation';
import AboutMe from './pages/About_me';
import Contacts from './pages/Contact';
import Homepage from './pages/Homepage';
import Skill from './pages/Skills';
import Projects from './pages/Projects';
import Game from './pages/Game';

const MainPage = () => {
    const gameInclude = false; //May be I will add it later

    return(
        <Router>
        <div className='main'>
            <div className='navChild stickyToTop'>
                <Nav gameInclude={gameInclude}/>
            </div>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/aboutMe" element={<AboutMe />} />
                <Route path="/skill" element={<Skill />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/Game" element={<Game />} />
                <Route path="/contact" element={<Contacts />} />
                <Route element={<Homepage/>} />
            </Routes>
        </div>
        </Router>
    );
}

export default MainPage;