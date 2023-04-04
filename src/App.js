import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
//import { AnalogyTestPage } from "./pages/analogy";
import WordInputPage from "./pages/vector";
import ThreeWordInputPage from "./pages/analogy";
import ButtonAppBar from "./navbar";
import WordNumberPage from "./pages/neighbourhood";
import WordListInputPage from "./pages/visualization";
function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Routes>
        {/* <Route path="/analogy" element={<AnalogyTestPage />} /> */}
        <Route path="/vector" element={<WordInputPage />}/>
        <Route path="/analogy" element={<ThreeWordInputPage />}/>
        <Route path="/neighbourhood" element={<WordNumberPage />}/>
        <Route path="/visualization" element={<WordListInputPage />}/>
      </Routes>
    </div>
  );
}

export default App;
