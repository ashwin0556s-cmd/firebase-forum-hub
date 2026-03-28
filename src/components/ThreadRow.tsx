import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Pin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface ThreadRowProps {
  thread: {
    id: string;
    title: string;
    pinned: boolean;
    created_at: string;
    profiles: { display_name: string };
    categories?: { slug: string; name: string; icon: string };
    posts: { count: number }[];
  };
  index: number;
}

const ThreadRow = ({ thread, index }: ThreadRowProps) => {
  const postCount = thread.posts?.[0]?.count ?? 0;
  const authorInitial = thread.profiles.display_name.charAt(0).toUpperCase();
  const timeAgo = formatDistanceToNow(new Date(thread.created_at), { addSuffix: true });

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
            {authorInitial}
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
            <span className="text-xs text-muted-foreground">{thread.profiles.display_name}</span>
            {thread.categories && (
              <span className="text-xs text-muted-foreground">
                in {thread.categories.icon} {thread.categories.name}
              </span>
            )}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-5 text-xs text-muted-foreground shrink-0">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            {postCount}
          </span>
          <span className="w-24 text-right">{timeAgo}</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ThreadRow;
