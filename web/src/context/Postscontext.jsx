import { createContext, useContext, useState } from "react";

/** Lower `feedOrder` = higher on Hot (curated default order). */
const now = Date.now();
const day = 86400000;

const DUMMY_POSTS = [
  {
    id: 1,
    feedOrder: 0,
    createdAt: now - 4 * 3600000,
    type: "image",
    title: "Finally shipped my side project after 6 months — it's a CLI tool for devs",
    content:
      "I've been working on this for half a year. It's a CLI tool that auto-generates type-safe API clients from OpenAPI specs. Would love your feedback!",
    author: "devhero_99",
    avatar: "DH",
    community: "r/programming",
    votes: 1482,
    comments: 247,
    time: "4 hours ago",
    tag: "Project",
    image: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?w=800&q=80",
    videoUrl: null,
    linkUrl: null,
    userVote: 0,
  },
  {
    id: 2,
    feedOrder: 1,
    createdAt: now - 7 * 3600000,
    type: "text",
    title: "The philosophy of minimalism applied to software architecture — less is always more",
    content:
      "Every abstraction has a cost. Every dependency is debt. The most maintainable codebase is the one that barely exists. Here's what I've learned after 10 years.",
    author: "philosophycode",
    avatar: "PC",
    community: "r/softwareengineering",
    votes: 893,
    comments: 134,
    time: "7 hours ago",
    tag: "Discussion",
    image: null,
    videoUrl: null,
    linkUrl: null,
    userVote: 0,
  },
  {
    id: 3,
    feedOrder: 2,
    createdAt: now - 1 * day,
    type: "image",
    title: "I built a self-hosted Notion alternative in 3 weeks — open source",
    content:
      "Tired of Notion's pricing, so I built my own. It's got blocks, databases, kanban boards, and markdown support. All self-hostable with Docker.",
    author: "opensource_max",
    avatar: "OM",
    community: "r/selfhosted",
    votes: 3201,
    comments: 512,
    time: "1 day ago",
    tag: "Open Source",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    videoUrl: null,
    linkUrl: null,
    userVote: 1,
  },
  {
    id: 4,
    feedOrder: 3,
    createdAt: now - 2 * day,
    type: "text",
    title: "Hot take: TypeScript's type system is Turing complete and that's a mistake",
    content:
      "When your type-level programming starts requiring a PhD to understand, something has gone wrong. We've traded simplicity for academic correctness.",
    author: "typed_thoughts",
    avatar: "TT",
    community: "r/typescript",
    votes: 2017,
    comments: 389,
    time: "2 days ago",
    tag: "Opinion",
    image: null,
    videoUrl: null,
    linkUrl: null,
    userVote: 0,
  },
  {
    id: 5,
    feedOrder: 4,
    createdAt: now - 3 * day,
    type: "video",
    title: "My homelab rack tour — 2 years of iteration in 90 seconds",
    content:
      "What started as a Raspberry Pi is now a full rack. Quick walkthrough of Proxmox, NAS, and 10GbE.",
    author: "homelabber_v2",
    avatar: "HV",
    community: "r/homelab",
    votes: 5432,
    comments: 721,
    time: "3 days ago",
    tag: "Showcase",
    image: null,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    linkUrl: null,
    userVote: 0,
  },
  {
    id: 6,
    feedOrder: 5,
    createdAt: now - 5 * 3600000,
    type: "text",
    title: "What I learned migrating a 500k LOC codebase to React 19",
    content:
      "Incremental adoption, strict mode surprises, and one weird cache bug. Happy to answer questions in the comments.",
    author: "react_rita",
    avatar: "RR",
    community: "r/reactjs",
    votes: 612,
    comments: 88,
    time: "5 hours ago",
    tag: "Experience",
    image: null,
    videoUrl: null,
    linkUrl: null,
    userVote: 0,
  },
  {
    id: 7,
    feedOrder: 6,
    createdAt: now - 12 * 3600000,
    type: "image",
    title: "Sunrise over the fjords — shot on a phone, no edits",
    content: "Sometimes the light does all the work.",
    author: "nordic_lens",
    avatar: "NL",
    community: "r/photography",
    votes: 4204,
    comments: 203,
    time: "12 hours ago",
    tag: "Photo",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    videoUrl: null,
    linkUrl: null,
    userVote: 0,
  },
  {
    id: 8,
    feedOrder: 7,
    createdAt: now - 4 * day,
    type: "video",
    title: "Big Buck Bunny — sample clip for testing players",
    content: "Classic open test video (Blender Foundation).",
    author: "media_tester",
    avatar: "MT",
    community: "r/videos",
    votes: 156,
    comments: 42,
    time: "4 days ago",
    tag: "Video",
    image: null,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    linkUrl: null,
    userVote: 0,
  },
];

const PostsContext = createContext(null);

function normalizePost(p) {
  return {
    ...p,
    type: p.type || "text",
    feedOrder: p.feedOrder ?? p.id,
    createdAt: p.createdAt ?? now,
    image: p.image ?? null,
    videoUrl: p.videoUrl ?? null,
    linkUrl: p.linkUrl ?? null,
  };
}

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(DUMMY_POSTS.map(normalizePost));

  const vote = (id, direction) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const prev_vote = p.userVote;
        const delta = direction === prev_vote ? -direction : direction - prev_vote;
        return { ...p, votes: p.votes + delta, userVote: direction === prev_vote ? 0 : direction };
      })
    );
  };

  const addPost = (post) => {
    setPosts((prev) => {
      const minOrder = prev.reduce((m, p) => Math.min(m, p.feedOrder ?? 0), 0);
      const next = normalizePost({
        ...post,
        id: Date.now(),
        votes: 1,
        comments: 0,
        time: "just now",
        userVote: 1,
        createdAt: Date.now(),
        feedOrder: minOrder - 1,
        avatar: (post.author?.[0] || "?").toUpperCase(),
      });
      return [next, ...prev];
    });
  };

  return (
    <PostsContext.Provider value={{ posts, vote, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
