import { motion } from "framer-motion";
import ForumHeader from "@/components/ForumHeader";
import CategoryCard from "@/components/CategoryCard";
import ThreadRow from "@/components/ThreadRow";
import { useCategories, useThreads, useCategoryStats } from "@/hooks/useForumData";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: categories, isLoading: catLoading } = useCategories();
  const { data: threads, isLoading: threadLoading } = useThreads();
  const { data: stats } = useCategoryStats();

  const isLoading = catLoading || threadLoading;

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
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Categories */}
              <section>
                <h2 className="text-lg font-bold mb-4">Categories</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {categories?.map((cat, i) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      threadCount={stats?.threadCounts[cat.id] ?? 0}
                      postCount={stats?.postCounts[cat.id] ?? 0}
                      index={i}
                    />
                  ))}
                </div>
              </section>

              {/* Recent Threads */}
              <section>
                <h2 className="text-lg font-bold mb-4">Recent Threads</h2>
                {threads && threads.length > 0 ? (
                  <div className="space-y-2">
                    {threads.map((thread: any, i: number) => (
                      <ThreadRow key={thread.id} thread={thread} index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-12">
                    No threads yet. Be the first to start a discussion!
                  </p>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="rounded-xl border bg-card p-5">
                <h3 className="font-bold text-sm mb-4">Community Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xl font-extrabold">{categories?.length ?? 0}</p>
                    <p className="text-xs text-muted-foreground">Categories</p>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold">{threads?.length ?? 0}</p>
                    <p className="text-xs text-muted-foreground">Threads</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
