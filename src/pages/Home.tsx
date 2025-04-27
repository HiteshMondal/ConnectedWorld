import { PostList } from "../components/PostList";

export const Home = () => {
  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-5xl sm:text-6xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent tracking-tight leading-tight animate-fadeIn">
          What's New?
        </h2>
        
        <div className="rounded-lg bg-white/5 backdrop-blur-md p-6 shadow-xl">
          <PostList />
        </div>
      </div>
    </div>
  );
};
