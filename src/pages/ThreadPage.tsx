import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ForumHeader from "@/components/ForumHeader";
import PostCard from "@/components/PostCard";
import { threads, posts, categories } from "@/data/forumData";
import { ArrowLeft, Eye, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ThreadPage = () => {
  const { id } = useParams();
  const thread = threads.find(t => t.id === id);
  const threadPosts = posts.filter(p => p.threadId === id);
  const category = thread ? categories.find(c => c.id === thread.categoryId) : null;

  if (!thread) {
    return (
      <div className="min-h-screen bg-background">
        <ForumHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Thread not found</p>
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
        >
          <div className="mb-6">
            {category && (
              <span className="text-xs font-semibold text-primary mb-2 block">
                {category.icon} {category.name}
              </span>
            )}
            <h1 className="text-2xl font-extrabold tracking-tight">{thread.title}</h1>
            <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {thread.replyCount} replies
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {thread.viewCount} views
              </span>
              {thread.tags?.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          {threadPosts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Reply box */}
        <div className="mt-8 rounded-xl border bg-card p-5">
          <h3 className="font-bold text-sm mb-3">Reply to this thread</h3>
          <Textarea placeholder="Write your reply..." className="min-h-[120px] bg-secondary border-0" />
          <div className="flex justify-end mt-3">
            <Button className="font-semibold">Post Reply</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThreadPage;
