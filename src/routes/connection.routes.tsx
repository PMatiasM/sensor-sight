import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Connection from "../pages/Connection";
import History from "../pages/History";

export default function ConnectionRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Navigate to="/connection" replace />} />
      </Routes>
    </Router>
  );
}
