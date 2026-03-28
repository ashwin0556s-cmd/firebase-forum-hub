import { useParams, Link } from "react-router-dom";
import ForumHeader from "@/components/ForumHeader";
import ThreadRow from "@/components/ThreadRow";
import { categories, threads } from "@/data/forumData";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  const categoryThreads = threads.filter(t => t.categoryId === id);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <ForumHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Category not found</p>
        </div>
      </div>
    );
  }

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
            {category.icon} {category.name}
          </h1>
          <p className="text-muted-foreground mt-1">{category.description}</p>
        </motion.div>

        <div className="space-y-2">
          {categoryThreads.length > 0 ? (
            categoryThreads.map((thread, i) => (
              <ThreadRow key={thread.id} thread={thread} index={i} />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-12">No threads yet in this category.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
