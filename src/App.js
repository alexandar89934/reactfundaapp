import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Student from './pages/Student';
import Addstudent from './pages/Addstudent';
import Editstudent from './pages/Editstudent';

function App() {
  return (

    <Routes>
      
        <Route path="/" element={ <Student/> }/>
        <Route path="/add-student" element={ <Addstudent/> }/>
        <Route path="/edit-student/:id" element={ <Editstudent /> } />

    </Routes>

  );
}

export default App;
