import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Register } from './pages/Register';
import HealthPlan from './pages/HealthPlan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health-plan" element={<HealthPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
