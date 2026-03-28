import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForumHeader from "@/components/ForumHeader";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCategories } from "@/hooks/useForumData";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";

const NewThread = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: categories } = useCategories();
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <ForumHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">
            Please <Link to="/auth" className="text-primary font-semibold hover:underline">sign in</Link> to create a thread.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId || !title.trim() || !content.trim()) return;
    setSubmitting(true);

    try {
      // Create thread
      const { data: thread, error: threadErr } = await supabase
        .from("threads")
        .insert({ category_id: categoryId, user_id: user.id, title: title.trim() })
        .select()
        .single();
      if (threadErr) throw threadErr;

      // Create original post
      const { error: postErr } = await supabase
        .from("posts")
        .insert({
          thread_id: thread.id,
          user_id: user.id,
          content: content.trim(),
          is_original_post: true,
        });
      if (postErr) throw postErr;

      toast.success("Thread created!");
      navigate(`/thread/${thread.id}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to forum
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-extrabold tracking-tight mb-8">Create New Thread</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold mb-1.5 block">Category</label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block">Title</label>
              <Input
                placeholder="What's on your mind?"
                className="bg-card"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block">Content</label>
              <Textarea
                placeholder="Share your thoughts..."
                className="min-h-[200px] bg-card"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link to="/">
                <Button variant="ghost" type="button">Cancel</Button>
              </Link>
              <Button type="submit" className="font-semibold" disabled={submitting}>
                {submitting ? "Creating..." : "Create Thread"}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default NewThread;
