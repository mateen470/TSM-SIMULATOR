import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from '../pages/MainMenu';
import Simulation from '../pages/Simulation';
import CreateMap from '../components/simulation-components/CreateMap';
import SelectStudentAndInstructor from '../pages/SelectStudentAndInstructor';
import Tutorials from '../pages/Tutorials';
import Help from '../pages/Help';
import BasicAdvanceTab from '../pages/BasicAdvanceTab';

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
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/help" element={<Help />} />
        {/* <Route path="/help" element={<BasicAdvanceTab />} /> */}
      </Routes>
    </Router>
  );
}
