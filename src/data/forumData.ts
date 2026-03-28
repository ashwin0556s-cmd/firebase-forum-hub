export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  threadCount: number;
  postCount: number;
  color: string;
}

export interface Thread {
  id: string;
  categoryId: string;
  title: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  replyCount: number;
  viewCount: number;
  lastReplyAt: string;
  lastReplyBy: string;
  pinned?: boolean;
  tags?: string[];
}

export interface Post {
  id: string;
  threadId: string;
  author: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  isOriginalPost?: boolean;
}

export const categories: Category[] = [
  { id: "general", name: "General Discussion", description: "Talk about anything and everything", icon: "💬", threadCount: 142, postCount: 1893, color: "bg-primary" },
  { id: "tech", name: "Technology", description: "Latest in tech, programming, and gadgets", icon: "💻", threadCount: 89, postCount: 1204, color: "bg-accent" },
  { id: "design", name: "Design & Creative", description: "UI/UX, graphic design, and creative work", icon: "🎨", threadCount: 67, postCount: 842, color: "bg-success" },
  { id: "help", name: "Help & Support", description: "Get help from the community", icon: "🤝", threadCount: 203, postCount: 2451, color: "bg-destructive" },
  { id: "showcase", name: "Showcase", description: "Show off your projects and creations", icon: "🚀", threadCount: 56, postCount: 634, color: "bg-primary" },
];

export const threads: Thread[] = [
  { id: "1", categoryId: "general", title: "Welcome to the community! Introduce yourself here", author: "Admin", authorAvatar: "A", createdAt: "2024-03-20", replyCount: 47, viewCount: 1240, lastReplyAt: "2 hours ago", lastReplyBy: "Sarah", pinned: true, tags: ["welcome", "introductions"] },
  { id: "2", categoryId: "tech", title: "What's your favorite code editor in 2024?", author: "DevMike", authorAvatar: "D", createdAt: "2024-03-22", replyCount: 32, viewCount: 890, lastReplyAt: "4 hours ago", lastReplyBy: "CodeNinja", tags: ["editors", "tools"] },
  { id: "3", categoryId: "design", title: "Minimalism is dead — here's what's next", author: "PixelPerfect", authorAvatar: "P", createdAt: "2024-03-21", replyCount: 28, viewCount: 1102, lastReplyAt: "1 hour ago", lastReplyBy: "ArtLover", tags: ["trends", "opinion"] },
  { id: "4", categoryId: "help", title: "How do I deploy a React app to production?", author: "NewbieDev", authorAvatar: "N", createdAt: "2024-03-23", replyCount: 12, viewCount: 456, lastReplyAt: "30 min ago", lastReplyBy: "Helper42", tags: ["react", "deployment"] },
  { id: "5", categoryId: "tech", title: "AI will replace 80% of coding jobs — change my mind", author: "FutureThinker", authorAvatar: "F", createdAt: "2024-03-23", replyCount: 95, viewCount: 3201, lastReplyAt: "15 min ago", lastReplyBy: "Skeptic", tags: ["AI", "hot-take"] },
  { id: "6", categoryId: "showcase", title: "I built a real-time multiplayer game in a weekend", author: "GameDev", authorAvatar: "G", createdAt: "2024-03-22", replyCount: 41, viewCount: 2100, lastReplyAt: "3 hours ago", lastReplyBy: "Impressed", tags: ["games", "project"] },
  { id: "7", categoryId: "general", title: "What podcasts are you listening to?", author: "AudioFan", authorAvatar: "A", createdAt: "2024-03-21", replyCount: 19, viewCount: 567, lastReplyAt: "6 hours ago", lastReplyBy: "PodLover", tags: ["podcasts", "recommendations"] },
  { id: "8", categoryId: "design", title: "Free icon pack — 500+ icons for your projects", author: "IconMaster", authorAvatar: "I", createdAt: "2024-03-23", replyCount: 8, viewCount: 890, lastReplyAt: "2 hours ago", lastReplyBy: "ThankYou", tags: ["resources", "free"] },
];

export const posts: Post[] = [
  { id: "p1", threadId: "1", author: "Admin", authorAvatar: "A", content: "Welcome to our community forum! 🎉\n\nWe're thrilled to have you here. This is a space for sharing ideas, asking questions, and connecting with like-minded people.\n\nPlease take a moment to introduce yourself — tell us your name, what you do, and what brought you here. We'd love to get to know you!\n\nRemember to be respectful, helpful, and have fun.", createdAt: "2024-03-20", likes: 24, isOriginalPost: true },
  { id: "p2", threadId: "1", author: "Sarah", authorAvatar: "S", content: "Hey everyone! I'm Sarah, a frontend developer from Berlin. Found this community through a friend's recommendation. Excited to be here! 👋", createdAt: "2024-03-20", likes: 12 },
  { id: "p3", threadId: "1", author: "CodeNinja", authorAvatar: "C", content: "Hi all! Full-stack dev here, been coding for about 5 years. Always looking to learn new things and share knowledge. Looking forward to great discussions!", createdAt: "2024-03-21", likes: 8 },
  { id: "p4", threadId: "1", author: "DesignGuru", authorAvatar: "D", content: "Hello! UI/UX designer based in Tokyo. Love the clean look of this forum. Can't wait to contribute to the design discussions! 🎨", createdAt: "2024-03-22", likes: 15 },
];
