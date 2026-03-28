import { motion } from "framer-motion";
import { Post } from "@/data/forumData";
import { ThumbsUp, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PostCardProps {
  post: Post;
  index: number;
}

const PostCard = ({ post, index }: PostCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className={`flex gap-4 rounded-xl border bg-card p-5 ${post.isOriginalPost ? "border-primary/20" : ""}`}
    >
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback className="bg-secondary font-semibold text-sm">
          {post.authorAvatar}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{post.author}</span>
          {post.isOriginalPost && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              OP
            </span>
          )}
          <span className="text-xs text-muted-foreground">{post.createdAt}</span>
        </div>
        <div className="mt-3 text-sm leading-relaxed whitespace-pre-line text-foreground/90">
          {post.content}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-primary">
            <ThumbsUp className="h-3.5 w-3.5" />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-primary">
            <Reply className="h-3.5 w-3.5" />
            Reply
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
