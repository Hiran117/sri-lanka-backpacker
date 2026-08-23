export default function Footer() {
  return (
    <footer className="bg-ink text-parchment/80 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm flex flex-col md:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} LankaTrail — built for backpackers, not tour agencies.</p>
        <p>Routes · Costs · Hostels · No fluff.</p>
      </div>
    </footer>
  );
}