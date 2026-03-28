import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
};

export const useThreads = (categorySlug?: string) => {
  return useQuery({
    queryKey: ["threads", categorySlug],
    queryFn: async () => {
      let query = supabase
        .from("threads")
        .select(`
          *,
          categories!inner(slug, name, icon),
          profiles!inner(display_name),
          posts(count)
        `)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (categorySlug) {
        query = query.eq("categories.slug", categorySlug);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};

export const useThread = (threadId: string) => {
  return useQuery({
    queryKey: ["thread", threadId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads")
        .select(`
          *,
          categories(slug, name, icon),
          profiles!inner(display_name)
        `)
        .eq("id", threadId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!threadId,
  });
};

export const usePosts = (threadId: string) => {
  return useQuery({
    queryKey: ["posts", threadId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          profiles!inner(display_name),
          post_likes(count)
        `)
        .eq("thread_id", threadId)
        .order("created_at");
      if (error) throw error;
      return data;
    },
    enabled: !!threadId,
  });
};

export const useCategoryStats = () => {
  return useQuery({
    queryKey: ["category-stats"],
    queryFn: async () => {
      const { data: threads, error: tErr } = await supabase
        .from("threads")
        .select("category_id");
      if (tErr) throw tErr;

      const { data: posts, error: pErr } = await supabase
        .from("posts")
        .select("thread_id, threads!inner(category_id)");
      if (pErr) throw pErr;

      const threadCounts: Record<string, number> = {};
      const postCounts: Record<string, number> = {};

      threads?.forEach((t) => {
        threadCounts[t.category_id] = (threadCounts[t.category_id] || 0) + 1;
      });

      posts?.forEach((p: any) => {
        const catId = p.threads?.category_id;
        if (catId) postCounts[catId] = (postCounts[catId] || 0) + 1;
      });

      return { threadCounts, postCounts };
    },
  });
};
