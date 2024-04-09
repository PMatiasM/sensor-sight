import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Connection from "../pages/Connection";
import History from "../pages/History";
import Experiments from "../pages/Experiments";

export default function ConnectionRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiments" element={<Experiments />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Navigate to="/experiments" replace />} />
      </Routes>
    </Router>
  );
}
