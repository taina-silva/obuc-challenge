import React from "react";
import FormScreen from './Screens/Form/formScreen';
import HomeScreen from './Screens/Home/homeScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/form" element={<FormScreen />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
