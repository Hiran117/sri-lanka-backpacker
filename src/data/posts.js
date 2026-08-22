export const posts = [
  {
    slug: "kandy-to-ella-train-guide",
    title: "Kandy to Ella Train: Complete Guide (Cost, Booking, Tips)",
    excerpt: "Everything you need to know about Sri Lanka's most famous train ride — booking, seat classes, cost, and what to expect.",
    date: "2026-08-01",
    content: `The Kandy to Ella train is one of the most scenic rail journeys in the world, cutting through tea plantations and misty hill country over roughly 6-7 hours.

**Booking**: Reserved seats sell out fast, especially in 2nd class observation cars. Book online via the official Sri Lanka Railways site or through 12go.asia at least a few days ahead in peak season (Dec-Mar, Jul-Aug).

**Classes & cost**: 3rd class is unreserved and cheap (LKR 250-400) but crowded — you may stand for parts of the journey. 2nd class reserved (LKR 600-1000) is the sweet spot for most backpackers. 1st class observation car costs more and books out weeks ahead.

**Tips**: Sit on the right side of the train (facing direction of travel from Kandy) for the best views. Bring snacks — the onboard vendors are inconsistent. Nine Arch Bridge is visible from the train just before Ella.`,
  },
  {
    slug: "sri-lanka-backpacker-budget",
    title: "Sri Lanka Backpacker Budget: What You'll Actually Spend Per Day",
    excerpt: "A realistic daily budget breakdown for backpacking Sri Lanka — accommodation, food, transport, and activities.",
    date: "2026-08-05",
    content: `Sri Lanka is one of the more affordable backpacking destinations in Asia. Here's a realistic daily budget:

**Accommodation**: LKR 1,500-4,000/night for a hostel dorm bed depending on location (beach towns tend to run higher in peak season).

**Food**: Local rice & curry meals cost LKR 200-500. Western/cafe food in backpacker hubs like Ella or Mirissa runs LKR 800-1,500.

**Transport**: Buses and trains are extremely cheap — most legs of the classic circuit cost under LKR 1,000.

**Total daily estimate**: LKR 4,000-7,000 (roughly $13-23 USD) per day for a budget-conscious backpacker covering accommodation, food, local transport, and basic activities.`,
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}