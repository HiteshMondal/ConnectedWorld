import { useQuery } from "@tanstack/react-query";
import { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";

interface Props {
  postId: number;
}

const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-400">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-2xl p-8 shadow-lg space-y-8">
      <h2 className="text-center text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        {data?.title}
      </h2>

      {data?.image_url && (
        <div className="overflow-hidden rounded-xl">
          <img
            src={data.image_url}
            alt={data?.title}
            className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <p className="text-gray-300 text-lg leading-relaxed">
        {data?.content}
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <span>📅 {new Date(data!.created_at).toLocaleDateString()}</span>
        <LikeButton postId={postId} />
      </div>

      <div className="pt-6">
        <CommentSection postId={postId} />
      </div>
    </div>
  );
};
