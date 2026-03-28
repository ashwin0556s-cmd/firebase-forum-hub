import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ForumHeader from "@/components/ForumHeader";
import PostCard from "@/components/PostCard";
import { useThread, usePosts } from "@/hooks/useForumData";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ThreadPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: thread, isLoading: threadLoading } = useThread(id!);
  const { data: posts, isLoading: postsLoading } = usePosts(id!);
  const [reply, setReply] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !reply.trim()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("posts").insert({
        thread_id: id!,
        user_id: user.id,
        content: reply.trim(),
      });
      if (error) throw error;
      setReply("");
      queryClient.invalidateQueries({ queryKey: ["posts", id] });
      toast.success("Reply posted!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (threadLoading || postsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ForumHeader />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

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
            {thread.categories && (
              <span className="text-xs font-semibold text-primary mb-2 block">
                {thread.categories.icon} {thread.categories.name}
              </span>
            )}
            <h1 className="text-2xl font-extrabold tracking-tight">{thread.title}</h1>
            <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
              <span>by {thread.profiles.display_name}</span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {posts?.length ?? 0} posts
              </span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          {posts?.map((post: any, i: number) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Reply box */}
        {user ? (
          <form onSubmit={handleReply} className="mt-8 rounded-xl border bg-card p-5">
            <h3 className="font-bold text-sm mb-3">Reply to this thread</h3>
            <Textarea
              placeholder="Write your reply..."
              className="min-h-[120px] bg-secondary border-0"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              required
            />
            <div className="flex justify-end mt-3">
              <Button type="submit" className="font-semibold" disabled={submitting}>
                {submitting ? "Posting..." : "Post Reply"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-8 rounded-xl border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground">
              <Link to="/auth" className="text-primary font-semibold hover:underline">Sign in</Link> to reply to this thread.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ThreadPage;
