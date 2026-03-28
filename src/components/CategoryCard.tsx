import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Users } from "lucide-react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string | null;
    icon: string;
    slug: string;
  };
  threadCount: number;
  postCount: number;
  index: number;
}

const CategoryCard = ({ category, threadCount, postCount, index }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/category/${category.slug}`}
        className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:border-primary/20"
      >
        <span className="text-2xl">{category.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
            {category.description}
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              {threadCount} threads
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {postCount} posts
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
