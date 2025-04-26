import { CreatePost } from "../components/CreatePost";

export const CreatePostPage = () => {
    return (
        <div>
            <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Create Post</h2>
            <CreatePost />
        </div>
    );
};