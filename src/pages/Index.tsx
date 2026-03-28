import { motion } from "framer-motion";
import ForumHeader from "@/components/ForumHeader";
import CategoryCard from "@/components/CategoryCard";
import ThreadRow from "@/components/ThreadRow";
import { categories, threads } from "@/data/forumData";
import { TrendingUp } from "lucide-react";

const Index = () => {
  const trendingThreads = [...threads].sort((a, b) => b.viewCount - a.viewCount).slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />

      {/* Hero */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome to the Forum
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              A place to share ideas, ask questions, and connect with the community.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Categories */}
            <section>
              <h2 className="text-lg font-bold mb-4">Categories</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {categories.map((cat, i) => (
                  <CategoryCard key={cat.id} category={cat} index={i} />
                ))}
              </div>
            </section>

            {/* Recent Threads */}
            <section>
              <h2 className="text-lg font-bold mb-4">Recent Threads</h2>
              <div className="space-y-2">
                {threads.map((thread, i) => (
                  <ThreadRow key={thread.id} thread={thread} index={i} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Trending */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="flex items-center gap-2 font-bold text-sm mb-4">
                <TrendingUp className="h-4 w-4 text-accent" />
                Trending
              </h3>
              <div className="space-y-3">
                {trendingThreads.map((thread, i) => (
                  <a
                    key={thread.id}
                    href={`/thread/${thread.id}`}
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-xs font-bold text-muted-foreground/50 mt-0.5 w-4">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {thread.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {thread.replyCount} replies · {thread.viewCount} views
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-bold text-sm mb-4">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Members", value: "2,847" },
                  { label: "Threads", value: "557" },
                  { label: "Posts", value: "7,024" },
                  { label: "Online", value: "142" },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-xl font-extrabold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
