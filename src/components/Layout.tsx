import { Outlet } from "react-router-dom";
import { VIEWS_ORDER } from "../views";

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, -apple-system, Arial" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 280,
          padding: 16,
          borderRight: "1px solid rgba(255,255,255,0.12)",
          background: "#0f172a",
          color: "white",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>Companion-System</div>
          <div style={{ opacity: 0.8, marginTop: 4 }}>ADHS-freundlich</div>
        </div>

        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {VIEWS_ORDER.map((v) => (
              <li key={v.key} style={{ marginBottom: 10 }}>
                <a
                  href={`#${v.path}`}
                  style={{
                    display: "block",
                    padding: "10px 12px",
                    borderRadius: 10,
                    textDecoration: "none",
                    color: "white",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  {v.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: 16, fontSize: 12, opacity: 0.75 }}>
          Routing: <code>#/…</code> · Quelle: <code>VIEWS_ORDER</code>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, background: "white" }}>
        <div style={{ padding: 16 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
