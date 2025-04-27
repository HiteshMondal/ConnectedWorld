import { useState } from "react";
import { Comment } from "./CommentSection";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  comment: Comment & {
    children?: Comment[];
  };
  postId: number;
}

const createReply = async (
  replyContent: string,
  postId: number,
  parentCommentId: number,
  userId?: string,
  author?: string
) => {
  if (!userId || !author) {
    throw new Error("You must be logged in to reply.");
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: replyContent,
    parent_comment_id: parentCommentId,
    user_id: userId,
    author: author,
  });

  if (error) throw new Error(error.message);
};

export const CommentItem = ({ comment, postId }: Props) => {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (replyContent: string) =>
      createReply(
        replyContent,
        postId,
        comment.id,
        user?.id,
        user?.user_metadata?.user_name
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setReplyContent("");
      setShowReplyForm(false);
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent) return;
    mutate(replyContent);
  };

  return (
    <div className="pl-6 border-l-2 border-purple-500/20 mb-6">
      <div className="bg-white/5 p-4 rounded-md shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-purple-400">
              {comment.author}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
          {comment.children && comment.children.length > 0 && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-400 hover:text-white transition"
              title={collapsed ? "Show Replies" : "Hide Replies"}
            >
              {collapsed ? "➕" : "➖"}
            </button>
          )}
        </div>

        <p className="text-gray-300 text-sm mb-3">{comment.content}</p>

        <div className="flex space-x-4">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-xs text-purple-300 hover:underline"
          >
            {showReplyForm ? "Cancel" : "Reply"}
          </button>
        </div>

        {showReplyForm && user && (
          <form onSubmit={handleReplySubmit} className="mt-3">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full bg-black/20 border border-purple-400/30 rounded-md p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your reply..."
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1.5 rounded-full hover:scale-105 transition-transform text-sm font-semibold"
            >
              {isPending ? "Posting..." : "Post Reply"}
            </button>
            {isError && (
              <p className="text-red-400 text-xs mt-2">
                Error posting reply. Try again.
              </p>
            )}
          </form>
        )}
      </div>

      {/* Nested Replies */}
      {comment.children && comment.children.length > 0 && !collapsed && (
        <div className="mt-4 space-y-4">
          {comment.children.map((child, idx) => (
            <CommentItem key={idx} comment={child} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
};
