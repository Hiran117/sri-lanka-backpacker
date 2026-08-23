// Run this once with: node src/lib/fetchDestinationImage.js
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const queries = {
  colombo: "Colombo Sri Lanka skyline",
  kandy: "Temple of the Tooth Kandy",
  ella: "Nine Arch Bridge Ella Sri Lanka",
  "nuwara-eliya": "Nuwara Eliya tea plantation",
  mirissa: "Mirissa beach Sri Lanka",
  galle: "Galle Fort Sri Lanka",
  sigiriya: "Sigiriya Rock Fortress Sri Lanka",
  dambulla: "Dambulla Cave Temple Sri Lanka",
  polonnaruwa: "Polonnaruwa ancient ruins Sri Lanka",
  anuradhapura: "Anuradhapura Sri Lanka stupa",
  "arugam-bay": "Arugam Bay surf Sri Lanka",
  trincomalee: "Trincomalee beach Sri Lanka",
  jaffna: "Jaffna Sri Lanka",
  udawalawe: "Udawalawe elephant safari",
  negombo: "Negombo beach Sri Lanka",
};

async function run() {
  for (const [slug, query] of Object.entries(queries)) {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    const data = await res.json();
    const url = data.photos?.[0]?.src?.large2x;
    console.log(`${slug}: "${url}"`);
  }
}

run();