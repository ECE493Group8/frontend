import { Routes, Route } from "react-router-dom";
import './App.css';
import WordInputPage from "./pages/vector";
import ThreeWordInputPage from "./pages/analogy";
import ButtonAppBar from "./navbar";
import WordNumberPage from "./pages/neighbourhood";
import WordListInputPage from "./pages/visualization";
import HomePage from "./pages/home";
function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/neighbourhood" element={<WordNumberPage />}/>
        <Route path="/analogy" element={<ThreeWordInputPage />}/>
        <Route path="/visualization" element={<WordListInputPage />}/>
        <Route path="/vector" element={<WordInputPage />}/>
      </Routes>
    </div>
  );
}

export default App;
