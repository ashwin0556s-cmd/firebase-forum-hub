import { Link } from "react-router-dom";
import ForumHeader from "@/components/ForumHeader";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/forumData";
import { motion } from "framer-motion";
import { toast } from "sonner";

const NewThread = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thread created! (Demo — no backend connected yet)");
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
              <Select>
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block">Title</label>
              <Input placeholder="What's on your mind?" className="bg-card" />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block">Content</label>
              <Textarea placeholder="Share your thoughts..." className="min-h-[200px] bg-card" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link to="/">
                <Button variant="ghost" type="button">Cancel</Button>
              </Link>
              <Button type="submit" className="font-semibold">Create Thread</Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default NewThread;
