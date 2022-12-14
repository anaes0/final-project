import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*
  To run this App you need to install:
  - npm install react-router-dom@6
  - npm install axios

  * Firebase package *
  - npm install firebase

  * Toastify library *
  - npm install --save react-toastify

  * Gallery arrow icons *
  - npm add @material-ui/core @material-ui/icons

  * React icons *
  - npm install react-icons --save

  * Google Maps Api *
  - npm i -S @react-google-maps/api
  
  * For running App tests *
  - npm install @testing-library/react
  
*/

import Home from "./views/Home";
import Contact from "./views/Contact";
import Portfolio from "./views/Portfolio";
import Blog from "./views/Blog";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog/*" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
