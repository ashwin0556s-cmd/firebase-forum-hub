import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Thread } from "@/data/forumData";
import { MessageSquare, Eye, Pin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ThreadRowProps {
  thread: Thread;
  index: number;
}

const ThreadRow = ({ thread, index }: ThreadRowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
    >
      <Link
        to={`/thread/${thread.id}`}
        className="group flex items-center gap-4 rounded-lg border bg-card px-5 py-4 transition-all hover:shadow-sm hover:border-primary/20"
      >
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-secondary text-sm font-semibold">
            {thread.authorAvatar}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {thread.pinned && <Pin className="h-3.5 w-3.5 text-accent shrink-0" />}
            <h4 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
              {thread.title}
            </h4>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-muted-foreground">{thread.author}</span>
            {thread.tags?.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-5 text-xs text-muted-foreground shrink-0">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            {thread.replyCount}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {thread.viewCount}
          </span>
          <span className="w-20 text-right">{thread.lastReplyAt}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ThreadRow;
