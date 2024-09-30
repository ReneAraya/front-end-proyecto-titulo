import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
