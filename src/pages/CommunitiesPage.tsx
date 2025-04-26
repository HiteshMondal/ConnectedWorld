import { CommunityList } from "../components/CommunityList";

export const CommunitiesPage = () => {
  return (
    <div className="pt-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Explore Communities
        </h2>
        <p className="text-gray-400 mb-12 text-lg">
          Discover different groups and join the conversations happening across the world.
        </p>
      </div>
      <CommunityList />
    </div>
  );
};
