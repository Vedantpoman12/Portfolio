import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import TargetCursor from './components/TargetCursor';
import IntroScreen from './components/IntroScreen';

// Scroll to top on every page change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  // Show intro only once per browser session
  const [introVisible, setIntroVisible] = useState(
    () => !sessionStorage.getItem('intro_seen')
  );

  const handleIntroDone = () => {
    sessionStorage.setItem('intro_seen', '1');
    setIntroVisible(false);
  };

  return (
    <Router>
      <ScrollToTop />
      {introVisible && <IntroScreen onComplete={handleIntroDone} />}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        cursorColor="#ffffff"
        cursorColorOnTarget="#aa88ff"
      />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
