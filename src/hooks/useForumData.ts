import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Helper to fetch profile display names for a list of user_ids
const fetchProfiles = async (userIds: string[]) => {
  if (userIds.length === 0) return {};
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, display_name")
    .in("user_id", userIds);
  if (error) throw error;
  const map: Record<string, string> = {};
  data?.forEach(p => { map[p.user_id] = p.display_name; });
  return map;
};

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
          posts(count)
        `)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (categorySlug) {
        query = query.eq("categories.slug", categorySlug);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Fetch profiles for thread authors
      const userIds = [...new Set(data?.map(t => t.user_id) ?? [])];
      const profileMap = await fetchProfiles(userIds);

      return data?.map(t => ({
        ...t,
        profiles: { display_name: profileMap[t.user_id] || "Unknown" },
      }));
    },
  });
};

export const useThread = (threadId: string) => {
  return useQuery({
    queryKey: ["thread", threadId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads")
        .select(`*, categories(slug, name, icon)`)
        .eq("id", threadId)
        .single();
      if (error) throw error;

      const profileMap = await fetchProfiles([data.user_id]);
      return {
        ...data,
        profiles: { display_name: profileMap[data.user_id] || "Unknown" },
      };
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
        .select(`*, post_likes(count)`)
        .eq("thread_id", threadId)
        .order("created_at");
      if (error) throw error;

      const userIds = [...new Set(data?.map(p => p.user_id) ?? [])];
      const profileMap = await fetchProfiles(userIds);

      return data?.map(p => ({
        ...p,
        profiles: { display_name: profileMap[p.user_id] || "Unknown" },
      }));
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

      const threadCounts: Record<string, number> = {};
      threads?.forEach((t) => {
        threadCounts[t.category_id] = (threadCounts[t.category_id] || 0) + 1;
      });

      // For post counts, count posts per thread then aggregate by category
      const { data: allThreads, error: atErr } = await supabase
        .from("threads")
        .select("id, category_id");
      if (atErr) throw atErr;

      const { data: posts, error: pErr } = await supabase
        .from("posts")
        .select("thread_id");
      if (pErr) throw pErr;

      const threadCatMap: Record<string, string> = {};
      allThreads?.forEach(t => { threadCatMap[t.id] = t.category_id; });

      const postCounts: Record<string, number> = {};
      posts?.forEach(p => {
        const catId = threadCatMap[p.thread_id];
        if (catId) postCounts[catId] = (postCounts[catId] || 0) + 1;
      });

      return { threadCounts, postCounts };
    },
  });
};
