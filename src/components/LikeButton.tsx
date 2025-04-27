import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";

interface Props {
  postId: number;
}

interface Vote {
  id: number;
  post_id: number;
  user_id: string;
  vote: number;
}

const vote = async (voteValue: number, postId: number, userId: string) => {
  const { data: existingVote } = await supabase
    .from("votes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existingVote) {
    if (existingVote.vote === voteValue) {
      const { error } = await supabase
        .from("votes")
        .delete()
        .eq("id", existingVote.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from("votes")
        .update({ vote: voteValue })
        .eq("id", existingVote.id);
      if (error) throw new Error(error.message);
    }
  } else {
    const { error } = await supabase
      .from("votes")
      .insert({ post_id: postId, user_id: userId, vote: voteValue });
    if (error) throw new Error(error.message);
  }
};

const fetchVotes = async (postId: number): Promise<Vote[]> => {
  const { data, error } = await supabase
    .from("votes")
    .select("*")
    .eq("post_id", postId);

  if (error) throw new Error(error.message);
  return data as Vote[];
};

export const LikeButton = ({ postId }: Props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: votes, isLoading, error } = useQuery<Vote[], Error>({
    queryKey: ["votes", postId],
    queryFn: () => fetchVotes(postId),
    refetchInterval: 5000,
  });

  const { mutate } = useMutation({
    mutationFn: (voteValue: number) => {
      if (!user) throw new Error("You must be logged in to Vote!");
      return vote(voteValue, postId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["votes", postId] });
    },
  });

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-2">
        Loading votes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-2">
        Error: {error.message}
      </div>
    );
  }

  const likes = votes?.filter((v) => v.vote === 1).length || 0;
  const dislikes = votes?.filter((v) => v.vote === -1).length || 0;
  const userVote = votes?.find((v) => v.user_id === user?.id)?.vote;

  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      <button
        onClick={() => mutate(1)}
        className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 transition-all duration-300 font-semibold
          ${userVote === 1 
            ? "bg-green-500 text-white border-green-500 scale-105" 
            : "bg-transparent text-green-400 border-green-400 hover:bg-green-400 hover:text-white"}
        `}
      >
        👍 {likes}
      </button>

      <button
        onClick={() => mutate(-1)}
        className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 transition-all duration-300 font-semibold
          ${userVote === -1 
            ? "bg-red-500 text-white border-red-500 scale-105" 
            : "bg-transparent text-red-400 border-red-400 hover:bg-red-400 hover:text-white"}
        `}
      >
        👎 {dislikes}
      </button>
    </div>
  );
};
