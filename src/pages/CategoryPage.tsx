import { useParams, Link } from "react-router-dom";
import ForumHeader from "@/components/ForumHeader";
import ThreadRow from "@/components/ThreadRow";
import { useCategories, useThreads } from "@/hooks/useForumData";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const { slug } = useParams();
  const { data: categories } = useCategories();
  const { data: threads, isLoading } = useThreads(slug);
  const category = categories?.find(c => c.slug === slug);

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to forum
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-extrabold tracking-tight">
            {category ? `${category.icon} ${category.name}` : "Category"}
          </h1>
          {category && <p className="text-muted-foreground mt-1">{category.description}</p>}
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : threads && threads.length > 0 ? (
          <div className="space-y-2">
            {threads.map((thread: any, i: number) => (
              <ThreadRow key={thread.id} thread={thread} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">No threads yet in this category.</p>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
