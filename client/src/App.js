import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Router components
import Signup from './components/Signup';  // Import the Signup component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />  {/* Make Signup the default route */}
      </Routes>
    </Router>
  );
};

export default App;
