import { Routes, Route, Navigate } from "react-router-dom";

import Master from "./views/Master";
import Cases from "./views/Cases";
import Evidence from "./views/Evidence";
import Archive from "./views/Archive";
import Settings from "./views/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Master />} />
      <Route path="/master" element={<Master />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/evidence" element={<Evidence />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/master" replace />} />
    </Routes>
  );
}
