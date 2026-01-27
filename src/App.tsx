import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { VIEWS_ORDER } from "./views";

export default function App() {
  return (
    <Routes>
      {/* Default → erste View */}
      <Route path="/" element={<Navigate to={VIEWS_ORDER[0].path} replace />} />

      {/* Routen aus VIEWS_ORDER */}
      {VIEWS_ORDER.map((v) => (
        <Route key={v.key} path={v.path} element={<v.Component />} />
      ))}

      {/* Fallback */}
      <Route path="*" element={<Navigate to={VIEWS_ORDER[0].path} replace />} />
    </Routes>
  );
}
