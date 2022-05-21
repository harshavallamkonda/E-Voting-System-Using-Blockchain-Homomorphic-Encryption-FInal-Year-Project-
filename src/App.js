import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Contact from './components/Footer';
import VoterLogin from './components/pages/VoterLogin';
import AdminLogin from './components/pages/AdminLogin';
import AdminOptions from './components/pages/AdminOptions';
import Voting from './components/pages/Voting';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/contact" exact element={<Contact />}/>
        <Route path="/voter-sign-in" exact element={<VoterLogin />}/>
        <Route path='/voting' exact element={<Voting />} />
        <Route path="/admin" exact element={<AdminLogin />}/>
        <Route path="/admin/options" exact element={<AdminOptions />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
