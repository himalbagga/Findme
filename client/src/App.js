import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Router components
import Signup from './components/Signup';
import HomePage from './components/Homepage1';  

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />}/>
        <Route exact path="/signup" element={<Signup />} />  {/* Make Signup the default route */}
      </Routes>
    </Router>
  );
};

export default App;
