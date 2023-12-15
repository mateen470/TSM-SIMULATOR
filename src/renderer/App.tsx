import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from '../pages/MainMenu';
import Simulation from '../pages/Simulation';
import CreateMap from '../components/simulation-components/CreateMap';
import SelectStudentAndInstructor from '../pages/SelectStudentAndInstructor';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/create_map" element={<CreateMap />} />
        <Route
          path="/select_student_instructor"
          element={<SelectStudentAndInstructor />}
        />
      </Routes>
    </Router>
  );
}
