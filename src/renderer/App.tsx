import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from '../pages/MainMenu';
import Simulation from '../pages/Simulation';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </Router>
  );
}
