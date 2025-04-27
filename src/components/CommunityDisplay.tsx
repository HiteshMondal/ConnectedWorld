import { useQuery } from "@tanstack/react-query";
import { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

interface Props {
  communityId: number;
}

interface PostWithCommunity extends Post {
  communities: {
    name: string;
  };
}

export const fetchCommunityPost = async (
  communityId: number
): Promise<PostWithCommunity[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, communities(name)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as PostWithCommunity[];
};

export const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useQuery<PostWithCommunity[], Error>({
    queryKey: ["communityPost", communityId],
    queryFn: () => fetchCommunityPost(communityId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="text-purple-400 animate-pulse text-lg">
          Loading community posts...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="text-red-500 text-lg font-medium">
          Error: {error.message}
        </span>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {data && data.length > 0 ? (
        <>
          <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-8 bg-gradient-to-r from-fuchsia-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            {data[0].communities.name} Community
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-4xl font-bold mb-4 text-gray-300">
            {data?.[0]?.communities.name} Community
          </h2>
          <p className="text-gray-500 text-lg">No posts yet. Be the first to contribute!</p>
        </div>
      )}
    </section>
  );
};
