import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { VIEWS_ORDER } from "./views";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      {/* Layout-Route */}
      <Route element={<Layout />}>
        {/* Default → erste View */}
        <Route path="/" element={<Navigate to={VIEWS_ORDER[0].path} replace />} />

        {/* Views */}
        {VIEWS_ORDER.map((v) => (
          <Route key={v.key} path={v.path} element={<v.Component />} />
        ))}

        {/* Fallback */}
        <Route path="*" element={<Navigate to={VIEWS_ORDER[0].path} replace />} />
      </Route>
    </Routes>
  );
}
