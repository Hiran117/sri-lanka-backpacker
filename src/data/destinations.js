export const destinations = [
  {
    slug: "colombo",
    name: "Colombo",
    order: 1,
    intro: "Sri Lanka's chaotic, humid capital — most backpackers pass through here first, either from the airport or the port.",
    howYouGotHere: {
      from: "Bandaranaike International Airport (CMB)",
      options: [
        { mode: "Bus (Airport Express)", cost: "LKR 250–450", duration: "1–1.5 hrs" },
        { mode: "Train (from Katunayake, connect at Colombo Fort)", cost: "LKR 100–200", duration: "1.5–2 hrs" },
        { mode: "Taxi/PickMe app", cost: "LKR 3,500–5,000", duration: "45–60 min" },
      ],
    },
    exploreHere: [
      { name: "Galle Face Green", note: "Sunset walk, street food stalls" },
      { name: "Pettah Market", note: "Chaotic local market, cheap everything" },
      { name: "Gangaramaya Temple", note: "Central, easy to combine with Beira Lake" },
      { name: "National Museum", note: "Skip if short on time — optional" },
    ],
    stay: { area: "Fort or Galle Face area", priceRange: "LKR 2,000–5,000/night hostel dorm" },
    eat: { note: "Try short eats at any local bakery; Ministry of Crab if splurging" },
    next: { slug: "kandy", name: "Kandy" },
  },
  {
    slug: "kandy",
    name: "Kandy",
    order: 2,
    intro: "Cultural heart of Sri Lanka, hill-country gateway, and the start of the famous train ride to Ella.",
    howYouGotHere: {
      from: "Colombo",
      options: [
        { mode: "Train (Colombo Fort → Kandy)", cost: "LKR 200–1,000 (class dependent)", duration: "~2.5–3 hrs" },
        { mode: "Intercity bus", cost: "LKR 300–450", duration: "3–4 hrs" },
      ],
    },
    exploreHere: [
      { name: "Temple of the Tooth", note: "Main sight — go early to avoid crowds" },
      { name: "Kandy Lake", note: "Easy walk around, free" },
      { name: "Royal Botanical Gardens (Peradeniya)", note: "Short tuk-tuk ride out, half-day trip" },
      { name: "Bahirawakanda Temple viewpoint", note: "Sunset over the city" },
    ],
    stay: { area: "Near the lake", priceRange: "LKR 1,800–4,000/night hostel dorm" },
    eat: { note: "Local rice & curry spots around Dalada Veediya street, budget-friendly" },
    next: { slug: "ella", name: "Ella" },
  },
  {
    slug: "ella",
    name: "Ella",
    order: 3,
    intro: "The postcard hill-country town — famous for the Nine Arch Bridge and the train ride to get here.",
    howYouGotHere: {
      from: "Kandy",
      options: [
        { mode: "Train (Kandy → Ella)", cost: "LKR 250–1,500 (class dependent)", duration: "~6–7 hrs — book reserved seats early" },
        { mode: "Bus + change at Badulla", cost: "LKR 400–600", duration: "~5–6 hrs" },
      ],
    },
    exploreHere: [
      { name: "Nine Arch Bridge", note: "Best early morning before crowds/trains" },
      { name: "Little Adam's Peak", note: "Easy 1–2 hr hike, sunrise or sunset" },
      { name: "Ella Rock", note: "Harder hike, 3–4 hrs round trip" },
      { name: "Ravana Falls", note: "Short tuk-tuk ride, quick stop" },
    ],
    stay: { area: "Ella town center", priceRange: "LKR 1,500–3,500/night hostel dorm" },
    eat: { note: "Cafe culture here — Western/backpacker-friendly options plentiful" },
    next: { slug: "mirissa", name: "Mirissa" },
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    order: 4,
    intro: "Laid-back beach town on the south coast — whale watching, surf, and hammocks.",
    howYouGotHere: {
      from: "Ella",
      options: [
        { mode: "Bus to Matara, connect to Mirissa", cost: "LKR 500–700", duration: "~5–6 hrs" },
        { mode: "Private car/van (shared)", cost: "LKR 3,000–5,000 shared", duration: "~4 hrs" },
      ],
    },
    exploreHere: [
      { name: "Whale watching tour", note: "Early morning boat trips, book a day ahead" },
      { name: "Coconut Tree Hill", note: "Iconic photo spot, free" },
      { name: "Mirissa Beach", note: "Main beach, surf lessons available" },
    ],
    stay: { area: "Beach road", priceRange: "LKR 1,800–4,000/night hostel dorm" },
    eat: { note: "Beachside seafood BBQ stalls in the evening" },
    next: { slug: "galle", name: "Galle" },
  },
  {
    slug: "galle",
    name: "Galle",
    order: 5,
    intro: "Historic Dutch fort town — the last stop before heading back to Colombo.",
    howYouGotHere: {
      from: "Mirissa",
      options: [
        { mode: "Train (coastal line)", cost: "LKR 100–300", duration: "~1 hr" },
        { mode: "Bus", cost: "LKR 100–200", duration: "~1–1.5 hrs" },
      ],
    },
    exploreHere: [
      { name: "Galle Fort", note: "Wander the ramparts, sunset spot" },
      { name: "Galle Lighthouse", note: "Inside the fort, quick stop" },
      { name: "Jungle Beach", note: "Short tuk-tuk ride, quieter beach" },
    ],
    stay: { area: "Inside or near the Fort", priceRange: "LKR 2,000–4,500/night hostel dorm" },
    eat: { note: "Cafe scene inside the fort, mid-range but good" },
    next: { slug: "colombo", name: "Colombo (return trip)" },
  },
];

export function getDestination(slug) {
  return destinations.find((d) => d.slug === slug);
}