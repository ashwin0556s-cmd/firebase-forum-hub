import { MessageSquare, Search, Bell, Plus, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ForumHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>Forum</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              className="pl-9 bg-secondary border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/new">
                <Button size="sm" className="gap-1.5 font-semibold">
                  <Plus className="h-4 w-4" />
                  New Thread
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={signOut} title="Sign out">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm" variant="outline" className="gap-1.5 font-semibold">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default ForumHeader;
