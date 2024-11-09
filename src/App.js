import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Main />
      </main>
      <Footer />
    </div>
  );
}

export default App;
