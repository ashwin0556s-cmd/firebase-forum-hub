import { motion } from "framer-motion";
import { ThumbsUp, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    is_original_post: boolean;
    created_at: string;
    profiles: { display_name: string };
    post_likes: { count: number }[];
  };
  index: number;
}

const PostCard = ({ post, index }: PostCardProps) => {
  const initial = post.profiles.display_name.charAt(0).toUpperCase();
  const likeCount = post.post_likes?.[0]?.count ?? 0;
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className={`flex gap-4 rounded-xl border bg-card p-5 ${post.is_original_post ? "border-primary/20" : ""}`}
    >
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback className="bg-secondary font-semibold text-sm">
          {initial}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{post.profiles.display_name}</span>
          {post.is_original_post && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              OP
            </span>
          )}
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
        <div className="mt-3 text-sm leading-relaxed whitespace-pre-line text-foreground/90">
          {post.content}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-primary">
            <ThumbsUp className="h-3.5 w-3.5" />
            {likeCount}
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
