import { CreatePost } from "../components/CreatePost";

export const CreatePostPage = () => {
  return (
    <div className="pt-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Create a New Post
        </h2>
        <p className="text-gray-400 mb-12 text-lg">
          Share your thoughts, ideas, or stories with the community.
        </p>
      </div>
      <CreatePost />
    </div>
  );
};
