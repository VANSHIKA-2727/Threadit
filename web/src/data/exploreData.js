/** Category chip `id`s used to filter communities (use with "All"). */
export const EXPLORE_CHIPS = [
  { id: "all", label: "All" },
  { id: "most-visited", label: "Most Visited" },
  { id: "internet-culture", label: "Internet Culture" },
  { id: "games", label: "Games" },
  { id: "home-garden", label: "Home & Garden" },
  { id: "technology", label: "Technology" },
];

/**
 * @typedef {{ name: string; members: number; description: string; avatar: string; chipTags: string[] }} ExploreCommunity
 * @typedef {{ id: string; title: string; items: ExploreCommunity[] }} ExploreSection
 */

/** @type {ExploreSection[]} */
export const EXPLORE_SECTIONS = [
  {
    id: "recommended",
    title: "Recommended for you",
    items: [
      {
        name: "r/webdev",
        members: 1840000,
        description: "A community for learning and discussing web development, from HTML to full-stack.",
        avatar: "🌐",
        chipTags: ["most-visited", "technology", "internet-culture"],
      },
      {
        name: "r/MadeMeSmile",
        members: 9200000,
        description: "Things that made you smile today — wholesome moments from around the internet.",
        avatar: "😊",
        chipTags: ["internet-culture", "most-visited"],
      },
      {
        name: "r/IndieGaming",
        members: 412000,
        description: "News, discussion, and support for independent games and their creators.",
        avatar: "🕹️",
        chipTags: ["games", "technology"],
      },
      {
        name: "r/CozyPlaces",
        members: 890000,
        description: "Photos and stories of the coziest corners of the world.",
        avatar: "🏠",
        chipTags: ["home-garden", "internet-culture"],
      },
      {
        name: "r/ProgrammerHumor",
        members: 2100000,
        description: "Memes and jokes only developers truly understand.",
        avatar: "💻",
        chipTags: ["technology", "internet-culture", "most-visited"],
      },
      {
        name: "r/IndianGaming",
        members: 156000,
        description: "Gaming culture, esports, and releases relevant to players in India.",
        avatar: "🎮",
        chipTags: ["games"],
      },
    ],
  },
  {
    id: "home-garden",
    title: "Home & Garden",
    items: [
      {
        name: "r/DIY",
        members: 2340000,
        description: "Projects, repairs, and inspiration for doing it yourself.",
        avatar: "🔨",
        chipTags: ["home-garden", "most-visited"],
      },
      {
        name: "r/InteriorDesign",
        members: 1780000,
        description: "Rooms, palettes, and ideas for spaces that feel like home.",
        avatar: "🛋️",
        chipTags: ["home-garden"],
      },
      {
        name: "r/IndoorGarden",
        members: 620000,
        description: "Houseplants, terrariums, and green thumbs in small spaces.",
        avatar: "🪴",
        chipTags: ["home-garden"],
      },
      {
        name: "r/Organization",
        members: 445000,
        description: "Tips and before-and-afters for a calmer, tidier life.",
        avatar: "📦",
        chipTags: ["home-garden", "internet-culture"],
      },
    ],
  },
  {
    id: "internet-culture",
    title: "Internet Culture",
    items: [
      {
        name: "r/memes",
        members: 12000000,
        description: "The front page of the meme internet.",
        avatar: "📰",
        chipTags: ["internet-culture", "most-visited"],
      },
      {
        name: "r/wholesomememes",
        members: 5600000,
        description: "Memes that feel like a warm hug.",
        avatar: "🤗",
        chipTags: ["internet-culture"],
      },
      {
        name: "r/OutOfTheLoop",
        members: 2100000,
        description: "Catch up on jokes, drama, and references you missed.",
        avatar: "🔄",
        chipTags: ["internet-culture"],
      },
      {
        name: "r/HobbyDrama",
        members: 189000,
        description: "Where niche online communities meet popcorn.",
        avatar: "🍿",
        chipTags: ["internet-culture"],
      },
    ],
  },
  {
    id: "popular-india",
    title: "Most popular in India",
    items: [
      {
        name: "r/India",
        members: 890000,
        description: "News, discussion, and perspectives about India and its diaspora.",
        avatar: "🇮🇳",
        chipTags: ["most-visited", "internet-culture"],
      },
      {
        name: "r/bangalore",
        members: 234000,
        description: "The garden city — traffic, tech, and filter coffee.",
        avatar: "🏙️",
        chipTags: ["internet-culture"],
      },
      {
        name: "r/Cricket",
        members: 4500000,
        description: "Tests, ODIs, T20 — everything cricket, everywhere.",
        avatar: "🏏",
        chipTags: ["most-visited", "games"],
      },
      {
        name: "r/BollywoodRealism",
        members: 120000,
        description: "Films, music, and industry chatter with a grounded lens.",
        avatar: "🎬",
        chipTags: ["internet-culture"],
      },
    ],
  },
  {
    id: "trending-india",
    title: "Trending now in India",
    items: [
      {
        name: "r/IndianFood",
        members: 340000,
        description: "Recipes, restaurant finds, and regional specialties.",
        avatar: "🍛",
        chipTags: ["home-garden", "internet-culture"],
      },
      {
        name: "r/developersIndia",
        members: 98000,
        description: "Careers, tools, and meetups for developers across India.",
        avatar: "👩‍💻",
        chipTags: ["technology", "most-visited"],
      },
      {
        name: "r/IndiaInvestments",
        members: 210000,
        description: "Markets, mutual funds, and long-term wealth building.",
        avatar: "📈",
        chipTags: ["technology"],
      },
      {
        name: "r/IndianArt",
        members: 67000,
        description: "Traditional and digital art from Indian creators.",
        avatar: "🎨",
        chipTags: ["internet-culture"],
      },
    ],
  },
  {
    id: "curated",
    title: "Curated picks",
    items: [
      {
        name: "r/AskHistorians",
        members: 2100000,
        description: "In-depth answers to questions about the past — sources welcome.",
        avatar: "📜",
        chipTags: ["internet-culture", "most-visited"],
      },
      {
        name: "r/SpaceXLounge",
        members: 890000,
        description: "Rockets, missions, and the future of spaceflight.",
        avatar: "🚀",
        chipTags: ["technology"],
      },
      {
        name: "r/boardgames",
        members: 780000,
        description: "Tabletop recommendations, rules clarifications, and new releases.",
        avatar: "🎲",
        chipTags: ["games"],
      },
      {
        name: "r/EarthPorn",
        members: 5600000,
        description: "Stunning landscapes — no humans, just nature.",
        avatar: "🏔️",
        chipTags: ["internet-culture", "home-garden"],
      },
    ],
  },
];

export function filterCommunitiesByChip(items, chipId) {
  if (chipId === "all") return items;
  return items.filter((item) => item.chipTags.includes(chipId));
}
