import React, { useState, useEffect } from "react";
import { Route, Routes, Router } from "react-router-dom";
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const path = "http://localhost:3001";
  return (
    <Routes>
      <Route path="/" exact={true} element={<HomePage />} />
    </Routes>
  );
}

export default App;
