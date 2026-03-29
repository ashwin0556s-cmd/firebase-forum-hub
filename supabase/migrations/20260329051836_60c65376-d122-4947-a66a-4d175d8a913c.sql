-- Fix: Prevent non-admin users from pinning threads

-- Update INSERT policy to block pinned=true
DROP POLICY IF EXISTS "Authenticated users can create threads" ON public.threads;
CREATE POLICY "Authenticated users can create threads"
ON public.threads FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id AND pinned = false);

-- Update UPDATE policy to block setting pinned=true
DROP POLICY IF EXISTS "Users can update their own threads" ON public.threads;
CREATE POLICY "Users can update their own threads"
ON public.threads FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND pinned = false);