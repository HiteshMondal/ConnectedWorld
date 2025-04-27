import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
  avatar_url?: string;
  like_count?: number;
  comment_count?: number;
}

// Fetch posts from Supabase using a custom function
const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase.rpc("get_posts_with_counts");

  if (error) {
    throw new Error(error.message);
  }
  return data as Post[];
};

export const PostList = () => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10 text-lg text-gray-400">
        Loading posts...
      </div>
    );
  }
  

  if (error) {
    return (
      <div className="flex justify-center items-center py-10 text-lg text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-lg text-gray-500">
        No posts available.
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
