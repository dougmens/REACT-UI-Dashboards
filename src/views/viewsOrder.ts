import type React from "react";
import Master from "./Master";
import Cases from "./Cases";
import Evidence from "./Evidence";
import Archive from "./Archive";
import Settings from "./Settings";

export type ViewKey = "master" | "cases" | "evidence" | "archive" | "settings";

export interface ViewDef {
  key: ViewKey;
  label: string;
  path: string;
  Component: React.ComponentType;
}

export const VIEWS_ORDER: ViewDef[] = [
  { key: "master",   label: "Master",            path: "/master",   Component: Master },
  { key: "cases",    label: "Rechtsfälle",       path: "/cases",    Component: Cases },
  { key: "evidence", label: "Schäden & Beweise", path: "/evidence", Component: Evidence },
  { key: "archive",  label: "Archiv",            path: "/archive",  Component: Archive },
  { key: "settings", label: "Einstellungen",     path: "/settings", Component: Settings },
];
