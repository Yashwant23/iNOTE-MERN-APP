import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App(props) {

  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          <Routes>
            <Route exact strict path="/" element={<Home />} />
            <Route exact strict path="/about" element={<About />} />
            <Route exact strict path="/login" element={<Login />} />
            <Route exact strict path="/signup" element={<Signup />} />
          </Routes>
        </Router>
        x
      </NoteState>

    </>
  );
}

export default App;