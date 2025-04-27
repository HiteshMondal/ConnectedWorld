import { Link } from "react-router";
import { Post } from "./PostList";

interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {
  return (
    <div className="relative group">
      {/* Background Glow on Hover */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 blur-md opacity-0 group-hover:opacity-30 transition-all duration-500 pointer-events-none" />

      <Link to={`/post/${post.id}`} className="block relative z-10">
        <div className="w-80 h-[340px] bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-2xl text-white flex flex-col overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-purple-500">
          
          {/* Top Section: Avatar + Title */}
          <div className="flex items-center gap-3 p-4">
            {post.avatar_url ? (
              <img
                src={post.avatar_url}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-700" />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-bold truncate">{post.title}</h3>
            </div>
          </div>

          {/* Post Image */}
          <div className="flex-1 overflow-hidden px-4">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-[140px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Bottom Stats */}
          <div className="flex justify-around items-center p-4 mt-auto text-sm font-semibold text-gray-300">
            <div className="flex items-center gap-1">
              ❤️ <span>{post.like_count ?? 0}</span>
            </div>
            <div className="flex items-center gap-1">
              💬 <span>{post.comment_count ?? 0}</span>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
};
