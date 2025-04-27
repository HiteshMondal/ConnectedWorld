import { useParams } from "react-router";
import { PostDetail } from "../components/PostDetail";

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Post not found.
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto">
      <h1 className="text-center text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Post Details
      </h1>
      <PostDetail postId={Number(id)} />
    </div>
  );
};
