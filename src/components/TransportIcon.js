// Transport mode icons — inline SVG line icons matching the codebase style.
// Returns null for unknown modes so callers can render a fallback.

const PATHS = {
  train: "M5 11a7 7 0 0 1 14 0v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6zM5 11h14M9 11v9M15 11v9M8 7h8M7 19l-2 2M17 19l2 2",
  bus: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zM4 12h16M8 4v16M16 4v16M6.5 20v1M17.5 20v1",
  tuktuk: "M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v4a1 1 0 0 1-1 1h-1a2 2 0 0 1-2-2H7a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-4zM3 13h18M7 16h.01M17 16h.01",
  car: "M5 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 17h12M5 12l1.5-5h11L19 12M4 12h16v5H4z",
};

export default function TransportIcon({ mode, className = "w-5 h-5" }) {
  // Match a keyword in the mode string to an icon type
  const lower = (mode || "").toLowerCase();
  let type = "car";
  if (lower.includes("train")) type = "train";
  else if (lower.includes("bus")) type = "bus";
  else if (lower.includes("tuk") || lower.includes("tuktuk") || lower.includes("rickshaw")) type = "tuktuk";
  else if (lower.includes("car") || lower.includes("van") || lower.includes("taxi") || lower.includes("pickme")) type = "car";

  const path = PATHS[type];

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
